/* Rinde Diario: funciona sin conexión.
   La página se pide primero a la red (así llegan las versiones nuevas) y, si no hay conexión, sale de la copia guardada.
   Íconos y fuentes salen de la copia guardada. Los datos de la persona NO pasan por acá: viven en el almacenamiento del navegador. */
const VERSION = 'rinde-diario-31.20';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

function fromNetwork(req, ms) {
  return new Promise((ok, fail) => {
    const t = setTimeout(() => fail(new Error('lento')), ms);
    fetch(req).then(r => { clearTimeout(t); ok(r); }, err => { clearTimeout(t); fail(err); });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Páginas: red primero (con 5 s de espera), copia guardada si no hay conexión
  if (req.mode === 'navigate') {
    e.respondWith(fromNetwork(req, 5000).then(r => {
      if (r && r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', cp)); }
      return r;
    }).catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }
  // Fuentes de Google: copia guardada y se renueva en segundo plano
  if (/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
    return;
  }
  // Archivos propios (íconos, manifiesto): copia guardada primero
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r && r.ok) { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
      return r;
    })));
  }
});

// Aviso de la aplicación (TRT) con la app cerrada. La app deja en la caché «rd-aviso» la próxima fecha, el intervalo y la hora.
// Chrome despierta al service worker unas pocas veces por día (sincronización periódica): el aviso puede llegar tarde.
function hoyLocal() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
async function revisarAviso() {
  const c = await caches.open('rd-aviso');
  const r = await c.match('./aviso.json'); if (!r) return;
  const a = await r.json(); if (!a || !a.next) return;
  const hoy = hoyLocal(), d = new Date(), hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  if (hoy < a.next || hm < (a.hora || '09:00')) return;
  const key = a.next + '|' + hoy, m = await c.match('./avisado.json');
  if (m) { const x = await m.json().catch(() => ({})); if (x && x.key === key) return; }
  await self.registration.showNotification('Te toca la aplicación', { body: (a.name || 'Testosterona') + (hoy > a.next ? ': atrasada.' : ': hoy.') + ' Tocá para anotarla.', tag: 'rd-trt', icon: 'icons/icon-192.png', badge: 'icons/favicon-32.png', data: { url: './#hoy' } });
  await c.put('./avisado.json', new Response(JSON.stringify({ key })));
}
self.addEventListener('periodicsync', e => { if (e.tag === 'rd-trt') e.waitUntil(revisarAviso().catch(() => {})); });
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.navigate && c.navigate(url).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(url);
  }));
});
