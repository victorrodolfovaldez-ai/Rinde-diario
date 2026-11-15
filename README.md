# Rinde Diario

(Antes «Rendición Diaria».)

App web para seguir la dieta, el entrenamiento y la salud día a día. Cada persona carga su perfil y la app calcula sus calorías, su proteína y sus fases.

## Qué hace

- **Mi día:** saludo con el progreso del día, actividad de hoy (entreno, alimentación, hidratación, descanso y hábitos), lo que te queda de calorías y proteína con carbohidratos y grasa, la indicación del momento, hasta cuatro accesos rápidos que elegís vos, tu resumen con los indicadores que elijas (peso y tendencia, adherencia, calorías de la semana, salud, entreno, sueño, racha), el entreno de hoy y los hábitos (pasos, agua, suplementos, sueño, peso y pulso).
- **Entreno:** cabecera con la rutina, los músculos, las series y la duración estimada; cada ejercicio con su pictograma y su grupo muscular; primero la rutina del día (kilos, repeticiones y RIR, calentamiento, modo foco), el temporizador de descanso, el resumen de la sesión y «¿Tirón o molestia?» con un dibujo del cuerpo. En apartados: progreso y estadísticas (series por músculo, fuerza estimada, carga, Wilks, DOTS e IPF GL, semana de descarga), cardio y bici, y la biblioteca con la teoría.
- **Nutrición:** arriba lo de todos los días (fase y objetivo, anotar alimentos escribiendo, dictando, con foto o por gramos, lo que anotaste, el plan alimentario y qué comer ahora). En apartados: recetas y comidas (recetario, 14 comidas rápidas, comidas de la zona, sanguchería y pizzería, tengo hambre, ¿vale la pena?), objetivos y fases, adherencia e historial (tu semana, racha, últimos 14 días) y compras y cocina.
- **Salud y progreso:** cabecera con peso, cintura, sueño, actividad y presión comparados con los 7 días anteriores. Tres partes: evolución corporal (peso, medidas y composición), controles de salud (medicación, testosterona, presión, laboratorio, observaciones y suplementación) y tendencias y análisis. Cada dato dice si es medición, declarado, calculado, estimación o referencia. La app no indica dosis ni diagnostica.
- **Más:** menú por categorías: perfil y objetivos, inicio y personalización, accesibilidad y privacidad, rutina, planes y controles, datos y copias de seguridad (copia completa o por partes con huella SHA-256, o cifrada con AES-GCM; copias automáticas; papelera de 30 días; registro de operaciones), ciencia y método, y ayuda.

Las ilustraciones y los pictogramas son SVG propios embebidos en el archivo: la app no carga imágenes de otros sitios.

Lo secundario está en apartados que empiezan cerrados. El buscador (Ctrl K o la lupa) encuentra cualquier herramienta aunque esté dentro de uno, y lo abre.

## Cómo usarla

Abrí `index.html` en el navegador o publicala con GitHub Pages. Los datos se guardan en el navegador de cada dispositivo (`localStorage`). Para pasarlos a otro dispositivo, usá **Más → Datos y copias de seguridad → Tus datos → Descargar copia** y después **Importar**. Los enlaces viejos `#analisis` y `#semana` llevan a Salud y progreso, y `#plan` a Nutrición.

## Privacidad

El archivo no contiene datos personales. No subas al repositorio las copias de seguridad (`.json`): un repositorio público lo puede leer cualquiera.

## Aviso

Las calorías y los cálculos son estimaciones con fines informativos. No reemplazan la consulta con un profesional de la salud.
