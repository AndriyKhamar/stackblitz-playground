import { A11yPillarKey, WCAGCase } from './wcag-case.model';

type WCAGCaseRaw = {
  id: string;
  criterion: string;
  name: string;
  description: string;
  inaccessibleExample: string;
  accessibleExample: string;
  explanation: string;
};

function pillarFromCriterion(criterion: string): A11yPillarKey {
  const prefix = (criterion || '').trim().split('.')[0];

  switch (prefix) {
    case '1':
      return 'perceptible';
    case '2':
      return 'operable';
    case '3':
      return 'comprensible';
    case '4':
      return 'robusto';
    default:
      return 'perceptible';
  }
}

const WCAG_CASES_RAW: WCAGCaseRaw[] = [
  {
    id: 'wcag-1-1-1',
    criterion: '1.1.1',
    name: 'Contenido no textual',
    description:
      'Todo contenido no textual (imágenes) debe tener un equivalente textual mediante atributo alt para que los lectores de pantalla lo interpreten.',
    inaccessibleExample: `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/320px-Placeholder_view_vector.svg.png">`,
    accessibleExample: `<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/320px-Placeholder_view_vector.svg.png"
  alt="Imagen de ejemplo para pruebas (Wikimedia Commons)"
  width="320"
  height="213"
  loading="lazy"
>`,
    explanation:
      'El atributo alt describe el contenido de la imagen para usuarios con discapacidad visual. Para pruebas, se usa una imagen gratuita alojada en Wikimedia Commons.',
  },
  {
    id: 'wcag-1-3-1',
    criterion: '1.3.1',
    name: 'Información y relaciones',
    description:
      'La información, la estructura y las relaciones deben estar presentes en el marcado o ser determinables mediante programación.',
    inaccessibleExample: `<style>
.demo-form { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
.field { margin: 12px 0; }
.fake-label { display: block; margin: 0 0 6px 0; font-weight: 800; color: #222; }
input { width: 100%; padding: 10px 12px; border: 1px solid #999; border-radius: 8px; }
</style>

<div class="demo-form">
  <div class="field">
    <div class="fake-label">Nombre</div>
    <input type="text" placeholder="Ej: Ana">
  </div>

  <div class="field">
    <div class="fake-label">Correo</div>
    <input type="email" placeholder="usuario@ejemplo.com">
  </div>
</div>`,
    accessibleExample: `<style>
.demo-form { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
.field { margin: 12px 0; }
label { display: block; margin: 0 0 6px 0; font-weight: 800; color: #222; }
input { width: 100%; padding: 10px 12px; border: 1px solid #999; border-radius: 8px; }
.hint { margin: 6px 0 0 0; color: #555; font-size: 0.9rem; }
</style>

<div class="demo-form">
  <div class="field">
    <!-- Caso válido: label asociado con for/id -->
    <label for="name">Nombre</label>
    <input type="text" id="name" autocomplete="name" placeholder="Ej: Ana">
  </div>

  <div class="field">
    <!-- Caso válido: label anidando el input -->
    <label>
      Correo
      <input type="email" autocomplete="email" placeholder="usuario@ejemplo.com">
    </label>
    <p class="hint">Ambas formas (for/id o label anidado) crean la relación programática.</p>
  </div>
</div>`,
    explanation:
      'El uso de <label> (con for/id o anidando el input) establece la relación programática entre etiqueta y campo. Esto es clave para lectores de pantalla y para que el foco/lectura “entienda” qué significa cada input.',
  },
  {
    id: 'wcag-1-3-2',
    criterion: '1.3.2',
    name: 'Secuencia significativa',
    description:
      'Cuando la secuencia en que se presenta el contenido afecta a su significado, se debe poder determinar mediante programación una secuencia de lectura correcta.',
    inaccessibleExample: `<style>
.layout { display: flex; gap: 12px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.box { padding: 12px; border-radius: 10px; border: 2px solid #ddd; }
.sidebar { flex: 1; order: 1; border-color: #0066cc; background: #e6f2ff; }
.main { flex: 2; order: 2; border-color: #00aa55; background: #eafff3; }
.note { margin: 10px 0 0 0; color: #555; }
</style>

<!-- DOM: primero MAIN y luego ASIDE, pero visualmente se invierte con CSS order -->
<div class="layout">
  <section class="box main">
    <strong>Contenido principal</strong>
    <p>Este bloque está primero en el HTML (lectura/AT).</p>
  </section>
  <aside class="box sidebar">
    <strong>Columna lateral</strong>
    <p>Se muestra a la izquierda por CSS (order).</p>
  </aside>
</div>
<p class="note"><em>Problema:</em> el orden visual no coincide con el orden del HTML.</p>`,
    accessibleExample: `<style>
.layout { display: flex; gap: 12px; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.box { padding: 12px; border-radius: 10px; border: 2px solid #ddd; }
.sidebar { flex: 1; border-color: #0066cc; background: #e6f2ff; }
.main { flex: 2; border-color: #00aa55; background: #eafff3; }
.note { margin: 10px 0 0 0; color: #555; }
</style>

<!-- DOM y visual: ASIDE primero y luego MAIN (mismo orden) -->
<div class="layout">
  <aside class="box sidebar">
    <strong>Columna lateral</strong>
    <p>Está primero en el HTML y también se ve primero.</p>
  </aside>
  <section class="box main">
    <strong>Contenido principal</strong>
    <p>Segundo en HTML y segundo visualmente.</p>
  </section>
</div>
<p class="note"><em>OK:</em> el orden de lectura coincide con el orden visual.</p>`,
    explanation:
      'El orden en el HTML/DOM (lectura y tabulación) debe ser el mismo que el orden visual. Evita “falsear” el orden con CSS (p. ej. order) si cambia el significado, porque lectores de pantalla y usuarios de teclado siguen el orden del DOM.',
  },
  {
    id: 'wcag-1-4-3',
    criterion: '1.4.3',
    name: 'Contraste mínimo (AAA)',
    description:
      'El contraste visual entre el texto y el fondo debe ser al menos 7:1 para cumplir AAA o 4.5:1 para AA.',
    inaccessibleExample: `<style>
.card { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; padding: 16px; border-radius: 10px; border: 1px solid #eee; background: #fff; max-width: 520px; }
.title { margin: 0 0 8px 0; font-weight: 800; color: #d9d9d9; }
.body { margin: 0; color: #cfcfcf; line-height: 1.5; }
</style>

<div class="card">
  <h3 class="title">Confirmación de compra</h3>
  <p class="body">Tu pedido ha sido procesado. Revisa el número de orden en tu email.</p>
</div>`,
    accessibleExample: `<style>
.card { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; padding: 16px; border-radius: 10px; border: 1px solid #eee; background: #fff; max-width: 520px; }
.title { margin: 0 0 8px 0; font-weight: 800; color: #1f1f1f; }
.body { margin: 0; color: #2f2f2f; line-height: 1.5; }
</style>

<div class="card">
  <h3 class="title">Confirmación de compra</h3>
  <p class="body">Tu pedido ha sido procesado. Revisa el número de orden en tu email.</p>
</div>`,
    explanation:
      'Un ratio de contraste 7:1 garantiza legibilidad para personas con baja visión o daltonismo.',
  },
  {
    id: 'wcag-1-4-4',
    criterion: '1.4.4',
    name: 'Redimensionamiento de texto',
    description:
      'El texto debe poder redimensionarse hasta 200% sin que se pierda contenido o funcionalidad.',
    inaccessibleExample: `<style>
.box { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; width: 220px; height: 58px; padding: 10px; border: 2px solid #cc0000; border-radius: 10px; overflow: hidden; background: #fff5f5; }
.small { font-size: 10px; line-height: 1.1; }
</style>

<div class="box small">
  Este texto está dentro de un contenedor con altura fija y overflow hidden.
  Al aumentar zoom/tamaño de fuente se recorta.
</div>`,
    accessibleExample: `<style>
.box { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 52ch; padding: 10px; border: 2px solid #00aa55; border-radius: 10px; background: #eafff3; }
.base { font-size: 1rem; line-height: 1.5; }
</style>

<div class="box base">
  Este contenido usa unidades relativas y no depende de alturas fijas.
  Prueba haciendo zoom al 200% (Ctrl + +) y el texto debería seguir siendo visible.
</div>`,
    explanation:
      'Usar unidades relativas (rem/em) y evitar alturas fijas/overflow oculto permite que el texto sea legible cuando se amplía. Para comprobarlo, prueba zoom del navegador al 200%.',
  },
  {
    id: 'wcag-2-1-1',
    criterion: '2.1.1',
    name: 'Teclado',
    description:
      'Todo elemento interactivo debe ser accesible mediante teclado (Tab, Enter, Espacio).',
    inaccessibleExample: `<div onclick="alert('Hecho')">
  Hacer click
</div>`,
    accessibleExample: `<button onclick="alert('Hecho')">
  Hacer click
</button>

<!-- O si es necesario usar div: -->
<div role="button" tabindex="0"
     onclick="alert('Hecho')"
     onkeydown="if(event.key==='Enter' || event.key===' ') alert('Hecho')">
  Hacer click
</div>`,
    explanation:
      'Usar elementos <button> nativos o agregar role="button" y gestionar eventos de teclado.',
  },
  {
    id: 'wcag-2-4-1',
    criterion: '2.4.1',
    name: 'Saltar contenido',
    description:
      'Debe existir un mecanismo para saltarse bloques de contenido repetitivo.',
    inaccessibleExample: `<header>
  <nav><!-- menú con 20 enlaces --></nav>
</header>
<main>
  <!-- contenido principal -->
</main>`,
    accessibleExample: `<header>
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  <nav><!-- menú --></nav>
</header>
<main id="main-content">
  <!-- contenido principal -->
</main>

<style>
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
}
</style>`,
    explanation:
      'Un enlace "Skip to main content" permite a usuarios de teclado omitir la navegación.',
  },
  {
    id: 'wcag-2-4-4',
    criterion: '2.4.4',
    name: 'Propósito del enlace',
    description:
      'El propósito de cada enlace debe ser determinable desde el texto del enlace o contexto.',
    inaccessibleExample: `<a href="/articulos/accesibilidad">Leer más</a>`,
    accessibleExample: `<a href="/articulos/accesibilidad">
  Leer más sobre accesibilidad web
</a>

<!-- O con aria-label: -->
<a href="/articulos/accesibilidad" aria-label="Leer más: Guía completa de accesibilidad web">
  Leer más
</a>`,
    explanation:
      'El texto del enlace debe ser descriptivo para que usuarios de lectores de pantalla entiendan su destino.',
  },
  {
    id: 'wcag-2-4-6',
    criterion: '2.4.6',
    name: 'Encabezados y etiquetas',
    description:
      'Los encabezados y etiquetas deben ser descriptivos y cumplir una jerarquía clara.',
    inaccessibleExample: `<h1>Título</h1>
<h3>Sección importante</h3>
<h2>Subsección</h2>`,
    accessibleExample: `<h1>Mi Sitio Web</h1>
<h2>Servicios principales</h2>
<h3>Servicio 1</h3>
<h3>Servicio 2</h3>
<h2>Contacto</h2>`,
    explanation:
      'Usar una jerarquía H1 → H2 → H3 permite a los lectores de pantalla navegar la estructura.',
  },
  {
    id: 'wcag-2-5-3',
    criterion: '2.5.3',
    name: 'Etiqueta en el nombre',
    description:
      'Para componentes con etiqueta visual, el nombre accesible debe incluir la etiqueta visible.',
    inaccessibleExample: `<label>Email</label>
<input aria-label="Dirección de correo electrónico">`,
    accessibleExample: `<label for="user-email">Email</label>
<input id="user-email" type="email">`,
    explanation:
      'La etiqueta visual y el nombre accesible deben coincidir para evitar confusión.',
  },
  {
    id: 'wcag-3-3-1',
    criterion: '3.3.1',
    name: 'Identificación de errores',
    description:
      'Los errores deben ser identificados automáticamente y sugerencias de corrección.',
    inaccessibleExample: `<input type="email" id="email">
<button>Enviar</button>
<!-- Sin validación ni mensajes de error -->`,
    accessibleExample: `<div>
  <label for="email">Correo:</label>
  <input type="email" id="email" aria-describedby="email-error" required>
  <span id="email-error" role="alert" style="display: none; color: red;">
    Ingrese un correo válido (ej: usuario@ejemplo.com)
  </span>
</div>`,
    explanation:
      'Usar role="alert" y aria-describedby para informar de errores de forma accesible.',
  },
  {
    id: 'wcag-3-3-2',
    criterion: '3.3.2',
    name: 'Etiquetas o instrucciones',
    description:
      'Se proporcionan etiquetas o instrucciones claras para entrada de datos.',
    inaccessibleExample: `<input type="text">
<button>Enviar</button>`,
    accessibleExample: `<div>
  <label for="search">Buscar en el sitio:</label>
  <input type="text" id="search" placeholder="Ej: accesibilidad">
  <button aria-label="Buscar">Enviar</button>
</div>`,
    explanation:
      'Las etiquetas y instrucciones claramente asociadas ayudan a usuarios a completar formularios.',
  },
  {
    id: 'wcag-4-1-2',
    criterion: '4.1.2',
    name: 'Nombre, rol y valor',
    description:
      'Todos los componentes deben comunicar su nombre, rol y estado de forma accesible.',
    inaccessibleExample: `<div class="toggle-button" onclick="this.classList.toggle('active')">
  Activar
</div>`,
    accessibleExample: `<button aria-pressed="false" id="toggle-button"
        onclick="updateToggle()">
  Activar
</button>

<script>
function updateToggle() {
  const btn = document.getElementById('toggle-button');
  const isPressed = btn.getAttribute('aria-pressed') === 'true';
  btn.setAttribute('aria-pressed', !isPressed);
}
</script>`,
    explanation:
      'Usar role="button" o elementos <button>, con aria-pressed para comunicar estado.',
  },

  // =========================
  // PERCEPTIBILIDAD (faltantes)
  // =========================
  {
    id: 'wcag-1-2-1',
    criterion: '1.2.1',
    name: 'Solo audio / solo vídeo (prerregrabado)',
    description:
      'Para contenido solo audio o solo vídeo prerregrabado, se debe proporcionar una alternativa equivalente (transcripción o descripción).',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.label { font-weight: 800; margin: 0 0 8px 0; }
</style>

<div class="wrap">
  <p class="label">Audio (sin transcripción)</p>
  <audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 620px; }
.label { font-weight: 800; margin: 0 0 8px 0; }
.transcript { border: 1px solid #ddd; background: #fff; padding: 10px 12px; border-radius: 10px; }
.transcript h4 { margin: 0 0 6px 0; font-size: 0.95rem; }
.transcript p { margin: 0; color: #333; line-height: 1.5; }
</style>

<div class="wrap">
  <p class="label">Audio + transcripción (prueba)</p>
  <audio controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>

  <div class="transcript">
    <h4>Transcripción</h4>
    <p>[00:00] Sonido fuerte / rugido (audio de prueba CC0).</p>
  </div>
</div>`,
    explanation:
      'Una transcripción permite a usuarios sordos o con dificultades auditivas acceder al contenido del audio.',
  },
  {
    id: 'wcag-1-2-2',
    criterion: '1.2.2',
    name: 'Subtítulos (prerregrabado)',
    description:
      'El contenido de vídeo prerregrabado con audio debe incluir subtítulos sincronizados.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.label { font-weight: 800; margin: 0 0 8px 0; }
video { width: 100%; max-width: 620px; border-radius: 10px; border: 1px solid #ddd; background: #000; }
</style>

<div class="wrap">
  <p class="label">Vídeo (sin captions)</p>
  <video controls>
    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  </video>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.label { font-weight: 800; margin: 0 0 8px 0; }
.hint { margin: 8px 0 0 0; color: #555; }
video { width: 100%; max-width: 620px; border-radius: 10px; border: 1px solid #ddd; background: #000; }
</style>

<div class="wrap">
  <p class="label">Vídeo + captions (prueba)</p>
  <video controls>
    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
    <track kind="captions" src="https://interactive-examples.mdn.mozilla.net/media/examples/friday.vtt" srclang="es" label="Español" default>
  </video>
  <p class="hint">Nota: los captions son de prueba y pueden no coincidir con el vídeo.</p>
</div>`,
    explanation:
      'El elemento <track kind="captions"> proporciona subtítulos para usuarios sordos, con hipoacusia o en entornos ruidosos.',
  },
  {
    id: 'wcag-1-2-3',
    criterion: '1.2.3',
    name: 'Audiodescripción o alternativa (prerregrabado)',
    description:
      'Cuando la información visual es necesaria para comprender el vídeo, se debe proporcionar audiodescripción o una alternativa equivalente.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.label { font-weight: 800; margin: 0 0 8px 0; }
.hint { margin: 8px 0 0 0; color: #555; }
video { width: 100%; max-width: 620px; border-radius: 10px; border: 1px solid #ddd; background: #000; }
</style>

<div class="wrap">
  <p class="label">Vídeo + captions (pero sin audiodescripción)</p>
  <video controls>
    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
    <track kind="captions" src="https://interactive-examples.mdn.mozilla.net/media/examples/friday.vtt" srclang="es" label="Español" default>
  </video>
  <p class="hint">Problema: si hay información visual esencial, captions no reemplazan audiodescripción.</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 620px; }
.label { font-weight: 800; margin: 0 0 8px 0; }
.hint { margin: 8px 0 0 0; color: #555; }
.alt { margin-top: 10px; padding: 10px 12px; border-radius: 10px; border: 1px solid #ddd; background: #fff; }
video { width: 100%; border-radius: 10px; border: 1px solid #ddd; background: #000; }
</style>

<div class="wrap">
  <p class="label">Vídeo + captions + descriptions (prueba)</p>
  <video controls>
    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
    <track kind="captions" src="https://interactive-examples.mdn.mozilla.net/media/examples/friday.vtt" srclang="es" label="Español" default>
    <track kind="descriptions" src="https://interactive-examples.mdn.mozilla.net/media/examples/friday.vtt" srclang="es" label="Audiodescripción (prueba)">
  </video>

  <div class="alt">
    <strong>Alternativa:</strong>
    <div>Descripción del vídeo (texto): “Se muestra una flor moviéndose con el viento. Cambia el encuadre”.</div>
  </div>

  <p class="hint">Nota: captions/descriptions aquí son de prueba y pueden no coincidir con el vídeo.</p>
</div>`,
    explanation:
      'La audiodescripción narra la información visual relevante que no está presente en el audio (p. ej., “aparece una alerta”, “se selecciona un botón”).',
  },
  {
    id: 'wcag-1-3-3',
    criterion: '1.3.3',
    name: 'Características sensoriales',
    description:
      'Las instrucciones no deben depender solo de forma, tamaño, ubicación, orientación o sonido (p. ej., “haz clic en el botón de la derecha”).',
    inaccessibleExample: `<style>
.row { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid #ddd; padding: 12px; border-radius: 10px; max-width: 620px; }
.continue { background: #0a0; color: #fff; border: 0; padding: 10px 14px; border-radius: 8px; font-weight: 800; }
p { margin: 0; color: #222; }
</style>

<div class="row">
  <p>Para continuar, pulsa el botón verde de la derecha.</p>
  <button class="continue" type="button">Continuar</button>
</div>`,
    accessibleExample: `<style>
.row { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: space-between; gap: 12px; border: 1px solid #ddd; padding: 12px; border-radius: 10px; max-width: 620px; }
.continue { background: #0a0; color: #fff; border: 0; padding: 10px 14px; border-radius: 8px; font-weight: 800; }
p { margin: 0; color: #222; }
</style>

<div class="row">
  <p>Para continuar, pulsa el botón “Continuar”.</p>
  <button class="continue" type="button">Continuar</button>
</div>`,
    explanation:
      'Las instrucciones basadas en color/posición fallan en lectores de pantalla, reflow, zoom y para usuarios con daltonismo.',
  },
  {
    id: 'wcag-1-3-4',
    criterion: '1.3.4',
    name: 'Orientación',
    description:
      'El contenido no debe restringir su visualización y operación a una sola orientación (vertical u horizontal), salvo que sea esencial.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 620px; }
.app { border: 2px solid #0066cc; border-radius: 12px; padding: 12px; background: #e6f2ff; }
.warning { display: none; border: 2px solid #cc0000; border-radius: 12px; padding: 12px; background: #fff5f5; }
@media (orientation: landscape) {
  .app { display: none; }
  .warning { display: block; }
}
</style>

<div class="wrap">
  <div class="warning" role="alert">
    <strong>Bloqueado:</strong> este contenido solo funciona en vertical.
  </div>
  <div class="app">
    <h3 style="margin:0 0 8px 0;">Preferencias</h3>
    <p style="margin:0;">Contenido diseñado solo para vertical (ejemplo de restricción).</p>
  </div>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 620px; }
.app { border: 2px solid #00aa55; border-radius: 12px; padding: 12px; background: #eafff3; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.tile { border: 1px solid #cfe8d6; border-radius: 10px; padding: 10px; background: #fff; }
@media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
</style>

<div class="wrap">
  <div class="app">
    <h3 style="margin:0 0 8px 0;">Contenido adaptable</h3>
    <p style="margin:0 0 10px 0;">Funciona en vertical y horizontal sin bloquear orientación.</p>
    <div class="grid">
      <div class="tile">Tarjeta A</div>
      <div class="tile">Tarjeta B</div>
    </div>
  </div>
</div>`,
    explanation:
      'Evita bloquear la UI a una orientación salvo necesidad esencial. Restringir por CSS/JS puede impedir el uso a personas que requieren horizontal/vertical (soportes, movilidad, baja visión).',
  },
  {
    id: 'wcag-1-3-5',
    criterion: '1.3.5',
    name: 'Propósito del input (autocomplete)',
    description:
      'Para campos de datos comunes, el propósito debe poder determinarse mediante programación (p. ej., usando autocomplete).',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
label { display:block; margin: 0 0 6px 0; font-weight: 800; }
input { width: 100%; padding: 10px 12px; border: 1px solid #999; border-radius: 8px; }
.hint { margin: 8px 0 0 0; color: #555; font-size: 0.9rem; }
</style>

<div class="wrap">
  <label for="email">Correo</label>
  <input id="email" name="field1" type="text" placeholder="usuario@ejemplo.com">
  <p class="hint">Sin autocomplete: AT y navegadores tienen menos señales para inferir el propósito.</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
label { display:block; margin: 0 0 6px 0; font-weight: 800; }
input { width: 100%; padding: 10px 12px; border: 1px solid #999; border-radius: 8px; }
.hint { margin: 8px 0 0 0; color: #555; font-size: 0.9rem; }
</style>

<div class="wrap">
  <label for="email">Correo</label>

  <!-- Opción A: type="email" + autocomplete -->
  <input id="email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="usuario@ejemplo.com">

  <!-- Opción B (válida): type="text" pero con autocomplete="email" -->
  <div style="margin-top: 10px;">
    <label for="email2">Correo (type text + autocomplete)</label>
    <input id="email2" name="email2" type="text" autocomplete="email" inputmode="email" placeholder="usuario@ejemplo.com">
  </div>

  <p class="hint">Lo importante es que el propósito sea identificable (autocomplete), no solo el type.</p>
</div>`,
    explanation:
      'autocomplete ayuda a tecnologías asistivas y a autocompletado del navegador a identificar el propósito del campo de forma fiable.',
  },
  {
    id: 'wcag-1-4-1',
    criterion: '1.4.1',
    name: 'Uso del color',
    description:
      'El color no debe ser el único medio para comunicar información, indicar acciones o distinguir elementos.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
label { display:block; margin: 0 0 6px 0; font-weight: 800; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 2px solid #cc0000; }
.hint { margin: 8px 0 0 0; color: #555; font-size: 0.9rem; }
</style>

<div class="wrap">
  <label for="code">Código</label>
  <input id="code" aria-invalid="true" placeholder="Ej: ABC-123">
  <p class="hint">Error comunicado solo por color (borde rojo).</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 420px; }
label { display:block; margin: 0 0 6px 0; font-weight: 800; }
input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 2px solid #cc0000; }
.error { margin: 8px 0 0 0; color: #b00020; font-weight: 700; }
</style>

<div class="wrap">
  <label for="code">Código</label>
  <input id="code" aria-invalid="true" aria-describedby="code-error" placeholder="Ej: ABC-123">
  <div id="code-error" class="error" role="alert">El código es obligatorio.</div>
</div>`,
    explanation:
      'Añadir un mensaje textual (y asociarlo con aria-describedby/role="alert") hace que el error sea perceptible sin depender del color.',
  },
  {
    id: 'wcag-1-4-10',
    criterion: '1.4.10',
    name: 'Reflow',
    description:
      'El contenido debe presentarse sin pérdida de información o funcionalidad y sin desplazamiento en dos dimensiones a 320px de ancho (equivalente).',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.fixed { width: 1000px; border: 2px solid #cc0000; border-radius: 10px; padding: 12px; background: #fff5f5; }
.col { display: inline-block; width: 480px; vertical-align: top; padding: 12px; margin-right: 12px; border-radius: 10px; background: #fff; border: 1px solid #ddd; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="fixed">
    <div class="col"><strong>Columna A</strong><div>Contenido ancho fijo</div></div>
    <div class="col"><strong>Columna B</strong><div>Contenido ancho fijo</div></div>
  </div>
  <p class="hint">En 320px de ancho (o zoom), aparece scroll horizontal.</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.fluid { max-width: 100%; border: 2px solid #00aa55; border-radius: 10px; padding: 12px; background: #eafff3; display: flex; flex-wrap: wrap; gap: 12px; }
.col { flex: 1 1 260px; min-width: 220px; padding: 12px; border-radius: 10px; background: #fff; border: 1px solid #cfe8d6; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="fluid">
    <div class="col"><strong>Columna A</strong><div>Se adapta y hace wrap</div></div>
    <div class="col"><strong>Columna B</strong><div>Se adapta y hace wrap</div></div>
  </div>
  <p class="hint">Reduce el ancho o prueba zoom: debería evitarse el scroll horizontal.</p>
</div>`,
    explanation:
      'Usar contenedores fluidos, flex-wrap y tamaños mínimos razonables evita el scroll horizontal al hacer zoom o en móviles.',
  },
  {
    id: 'wcag-1-4-11',
    criterion: '1.4.11',
    name: 'Contraste no textual',
    description:
      'Los componentes de interfaz (bordes, iconos, estados) deben tener contraste suficiente (mín. 3:1) contra colores adyacentes.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.btn { background:#ffffff; border: 1px solid #e6e6e6; color:#222; padding: 10px 14px; border-radius: 10px; font-weight: 800; }
.panel { padding: 14px; border-radius: 12px; background: #fff; border: 1px solid #eee; max-width: 520px; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="panel">
    <button class="btn" type="button">Botón con borde casi invisible</button>
    <p class="hint">El borde/forma del control tiene poco contraste.</p>
  </div>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.btn { background:#ffffff; border: 2px solid #555; color:#222; padding: 10px 14px; border-radius: 10px; font-weight: 800; }
.btn:focus { outline: 3px solid #0066cc; outline-offset: 3px; }
.panel { padding: 14px; border-radius: 12px; background: #fff; border: 1px solid #eee; max-width: 520px; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="panel">
    <button class="btn" type="button">Botón con contraste no textual adecuado</button>
    <p class="hint">Además del texto, el contorno y estados (focus) deben ser perceptibles.</p>
  </div>
</div>`,
    explanation:
      'No basta con el contraste del texto: el control (borde/estado) también debe ser perceptible para ubicar e identificar el componente.',
  },
  {
    id: 'wcag-1-4-12',
    criterion: '1.4.12',
    name: 'Espaciado del texto',
    description:
      'El contenido debe seguir siendo legible si el usuario ajusta espaciado (line-height, letter-spacing, word-spacing) a valores recomendados.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 58ch; }
.box { border: 2px solid #cc0000; border-radius: 12px; padding: 12px; background: #fff5f5; height: 64px; overflow: hidden; }
.user-spacing { line-height: 1.5; letter-spacing: 0.12em; word-spacing: 0.16em; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="box user-spacing">
    Texto con espaciado aumentado (simulando preferencias del usuario). En un contenedor con altura fija se recorta.
  </div>
  <p class="hint">Problema: altura fija + overflow hidden.</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; max-width: 58ch; }
.box { border: 2px solid #00aa55; border-radius: 12px; padding: 12px; background: #eafff3; }
.user-spacing { line-height: 1.5; letter-spacing: 0.12em; word-spacing: 0.16em; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <div class="box user-spacing">
    Texto con espaciado aumentado (simulando preferencias del usuario). Sin altura fija, el contenido fluye y sigue legible.
  </div>
  <p class="hint">OK: sin recorte, soporta ajustes de espaciado.</p>
</div>`,
    explanation:
      'Evitar alturas fijas y overflow oculto en texto permite que ajustes de legibilidad no rompan el contenido.',
  },
  {
    id: 'wcag-1-4-13',
    criterion: '1.4.13',
    name: 'Contenido al pasar el cursor o foco',
    description:
      'El contenido adicional mostrado al hover o focus (tooltips, menús) debe ser descartable, persistente y accesible por teclado.',
    inaccessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.help { position: relative; display: inline-block; }
.trigger { border: 1px solid #999; background: #fff; padding: 8px 10px; border-radius: 10px; font-weight: 800; }
.tip {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  width: 260px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #111;
  color: #fff;
}
.help:hover .tip { display: block; }
.hint { margin: 10px 0 0 0; color: #555; }
</style>

<div class="wrap">
  <span class="help">
    <button type="button" class="trigger">¿Qué es esto?</button>
    <span class="tip">Ayuda (solo hover: con teclado no aparece).</span>
  </span>
  <p class="hint">Problema: el tooltip no aparece al foco de teclado.</p>
</div>`,
    accessibleExample: `<style>
.wrap { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.help { position: relative; display: inline-block; }
.trigger { border: 1px solid #999; background: #fff; padding: 8px 10px; border-radius: 10px; font-weight: 800; }
.tip {
  display: none;
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  width: 280px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background: #111;
  color: #fff;
}
.help:hover .tip, .help:focus-within .tip { display: block; }
</style>

<div class="wrap">
  <span class="help">
    <button type="button" class="trigger" aria-describedby="tip-1">¿Qué es esto?</button>
    <span id="tip-1" class="tip" role="tooltip">Ayuda visible en hover y en foco (teclado).</span>
  </span>
</div>`,
    explanation:
      'Mostrar el tooltip también en foco y asociarlo con aria-describedby permite a teclado y lectores de pantalla acceder al contenido adicional.',
  },

  // =========================
  // OPERABILIDAD (faltantes)
  // =========================
  {
    id: 'wcag-2-1-2',
    criterion: '2.1.2',
    name: 'Sin trampas de teclado',
    description:
      'Si el foco entra en un componente, el usuario debe poder salir usando teclado (Tab/Shift+Tab/Escape) sin quedarse “atrapado”.',
    inaccessibleExample: `<div tabindex="0" onkeydown="event.preventDefault()">
  Modal que bloquea todas las teclas: no puedes salir
</div>`,
    accessibleExample: `<div role="dialog" aria-modal="true" aria-labelledby="dlg-title">
  <h2 id="dlg-title">Preferencias</h2>
  <p>Contenido del modal…</p>
  <button type="button" aria-label="Cerrar" onclick="closeDialog()">Cerrar</button>
</div>

<script>
function closeDialog() {
  // Cierra el diálogo y devuelve foco al disparador
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeDialog();
});
</script>`,
    explanation:
      'Los diálogos deben ofrecer una forma clara de cierre (botón y Escape) y no interceptar Tab de forma que impida abandonar el componente.',
  },
  {
    id: 'wcag-2-1-4',
    criterion: '2.1.4',
    name: 'Atajos de teclado (tecla única)',
    description:
      'Los atajos activados por una sola tecla deben poder desactivarse, reasignarse o requerir modificadores para evitar activaciones accidentales.',
    inaccessibleExample: `<script>
// Tecla única: pulsar "s" guarda, incluso escribiendo en un input
document.addEventListener('keydown', function (e) {
  if (e.key === 's') save();
});
</script>`,
    accessibleExample: `<script>
// Requiere modificador (Ctrl+S) y evita interferir con inputs
document.addEventListener('keydown', function (e) {
  var target = e.target;
  var isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');
  if (!isTyping && e.ctrlKey && (e.key === 's' || e.key === 'S')) {
    e.preventDefault();
    save();
  }
});
</script>

<button type="button" aria-pressed="false" onclick="toggleShortcuts(this)">Atajos: ON</button>`,
    explanation:
      'Evitar teclas únicas reduce activaciones no intencionales (p. ej., dictado, lectores de pantalla, temblores). Añadir control de habilitado mejora accesibilidad.',
  },
  {
    id: 'wcag-2-2-1',
    criterion: '2.2.1',
    name: 'Tiempo ajustable',
    description:
      'Si hay límites de tiempo, el usuario debe poder extender, desactivar o ajustarlos, salvo que sea esencial.',
    inaccessibleExample: `<meta http-equiv="refresh" content="60;url=/logout">
<p>Tu sesión se cerrará automáticamente.</p>`,
    accessibleExample: `<div aria-live="polite" id="timeout-warning">
  Tu sesión expirará en 60 segundos.
</div>

<button type="button" onclick="extendSession()">Extender sesión</button>
<button type="button" onclick="logoutNow()">Cerrar sesión ahora</button>`,
    explanation:
      'Notificar con anticipación y permitir extensión brinda control a usuarios que necesitan más tiempo (lectores de pantalla, movilidad reducida, cognitivo).',
  },
  {
    id: 'wcag-2-2-2',
    criterion: '2.2.2',
    name: 'Pausar, detener, ocultar (carruseles/animaciones)',
    description:
      'Contenido que se mueve o actualiza automáticamente debe poder pausarse/detenerse/ocultarse, salvo que sea esencial.',
    inaccessibleExample: `<div class="carousel" aria-label="Promociones">
  <!-- Rotación automática sin controles -->
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>`,
    accessibleExample: `<div class="carousel" id="promo" aria-label="Promociones">
  <button type="button" aria-controls="promo" aria-pressed="false" onclick="toggleCarousel(this)">
    Pausar
  </button>
  <div>Slide 1</div>
  <div>Slide 2</div>
</div>`,
    explanation:
      'Un botón de pausa da control al usuario, evita distracciones y reduce problemas para usuarios con discapacidad cognitiva o vestibular.',
  },
  {
    id: 'wcag-2-3-1',
    criterion: '2.3.1',
    name: 'Convulsiones y reacciones físicas (flashes)',
    description:
      'No debe haber contenido que parpadee más de 3 veces por segundo en un área significativa, para evitar riesgos de convulsiones fotosensibles.',
    inaccessibleExample: `<style>
.flash { animation: flash 0.1s infinite; }
@keyframes flash { 0%{background:#fff} 50%{background:#f00} 100%{background:#fff} }
</style>

<div class="flash">Banner parpadeante</div>`,
    accessibleExample: `<style>
.safe { transition: background 0.4s ease; }
</style>

<div class="safe">Banner sin parpadeos rápidos</div>`,
    explanation:
      'Evitar flashes rápidos reduce riesgos para usuarios con epilepsia fotosensible y mejora la comodidad visual general.',
  },
  {
    id: 'wcag-2-4-2',
    criterion: '2.4.2',
    name: 'Página titulada',
    description:
      'Las páginas deben tener títulos descriptivos que comuniquen el tema o propósito (p. ej., en <title>).',
    inaccessibleExample: `<head>
  <title></title>
</head>`,
    accessibleExample: `<head>
  <title>Demo WCAG 2.1 - Accesibilidad Web</title>
</head>`,
    explanation:
      'Un título claro ayuda a usuarios de lectores de pantalla, historial y pestañas a ubicarse y navegar entre páginas.',
  },
  {
    id: 'wcag-2-4-3',
    criterion: '2.4.3',
    name: 'Orden del foco',
    description:
      'El orden de tabulación debe preservar significado y operabilidad. Evitar tabindex positivos que alteren el orden natural.',
    inaccessibleExample: `<a href="#" tabindex="3">Tercero</a>
<button tabindex="1">Primero</button>
<input tabindex="2" placeholder="Segundo">`,
    accessibleExample: `<button>Primero</button>
<input placeholder="Segundo">
<a href="#">Tercero</a>`,
    explanation:
      'El orden natural del DOM suele ser el más predecible. tabindex positivo puede generar recorridos confusos y difíciles de mantener.',
  },
  {
    id: 'wcag-2-4-5',
    criterion: '2.4.5',
    name: 'Múltiples vías de navegación',
    description:
      'Debe existir más de una forma de encontrar páginas dentro de un sitio (p. ej., navegación, búsqueda, mapa del sitio), salvo que sea esencial.',
    inaccessibleExample: `<p>Solo puedes encontrar páginas usando la búsqueda.</p>
<input type="search" aria-label="Buscar">`,
    accessibleExample: `<nav aria-label="Navegación principal">
  <a href="/productos">Productos</a>
  <a href="/precios">Precios</a>
  <a href="/contacto">Contacto</a>
</nav>

<p><a href="/mapa-del-sitio">Mapa del sitio</a></p>
<input type="search" aria-label="Buscar">`,
    explanation:
      'Ofrecer alternativas reduce carga cognitiva y mejora el acceso cuando un método no es suficiente para un usuario.',
  },
  {
    id: 'wcag-2-4-7',
    criterion: '2.4.7',
    name: 'Enfoque visible',
    description:
      'Los elementos enfocables deben mostrar un indicador de foco visible al navegar con teclado.',
    inaccessibleExample: `<style>
button:focus, a:focus { outline: none; }
</style>

<button>Guardar</button>`,
    accessibleExample: `<style>
button:focus, a:focus {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}
</style>

<button>Guardar</button>`,
    explanation:
      'Quitar el outline sin reemplazo hace que usuarios de teclado “pierdan” la ubicación del foco. Un foco claro mejora operabilidad.',
  },
  {
    id: 'wcag-2-5-1',
    criterion: '2.5.1',
    name: 'Gestos con puntero',
    description:
      'Las funciones que requieran gestos complejos (arrastrar, pellizcar) deben tener alternativa con gestos simples o controles.',
    inaccessibleExample: `<div class="map" aria-label="Mapa">
  <!-- Solo arrastrar para mover -->
  Arrastra con el dedo para moverte
</div>`,
    accessibleExample: `<div class="map" aria-label="Mapa">
  <button type="button" aria-label="Mover arriba">↑</button>
  <button type="button" aria-label="Mover abajo">↓</button>
  <button type="button" aria-label="Mover izquierda">←</button>
  <button type="button" aria-label="Mover derecha">→</button>
</div>`,
    explanation:
      'Una alternativa por botones permite operar sin gestos complejos y es útil con teclado, switch control y movilidad reducida.',
  },
  {
    id: 'wcag-2-5-2',
    criterion: '2.5.2',
    name: 'Cancelación del puntero',
    description:
      'Para interacciones con puntero, las acciones deben activarse en “up” o permitir cancelar/revertir si se inicia accidentalmente.',
    inaccessibleExample: `<button onpointerdown="deleteItem()">Eliminar</button>
<!-- Se ejecuta al tocar/presionar, sin opción de cancelar -->`,
    accessibleExample: `<button onclick="confirmDelete()">Eliminar</button>

<script>
function confirmDelete() {
  if (confirm('¿Eliminar este elemento?')) deleteItem();
}
</script>`,
    explanation:
      'Activar en click (pointerup) y/o confirmar evita acciones accidentales al tocar o arrastrar el puntero.',
  },
  {
    id: 'wcag-2-5-4',
    criterion: '2.5.4',
    name: 'Activación por movimiento',
    description:
      'Las funciones activadas por movimiento del dispositivo (p. ej., agitar) deben tener alternativa y poder desactivarse.',
    inaccessibleExample: `<script>
// Agitar el teléfono ejecuta "deshacer" sin alternativa
window.addEventListener('devicemotion', function () { undo(); });
</script>`,
    accessibleExample: `<button type="button" onclick="undo()">Deshacer</button>

<label>
  <input type="checkbox" checked onchange="toggleMotion(this.checked)">
  Activar acciones por movimiento
</label>`,
    explanation:
      'Una alternativa por botón y la posibilidad de desactivar movimiento evita activaciones involuntarias y mejora accesibilidad motora.',
  },

  // =========================
  // COMPRENSIBILIDAD (faltantes)
  // =========================
  {
    id: 'wcag-3-1-1',
    criterion: '3.1.1',
    name: 'Idioma de la página',
    description:
      'El idioma principal de la página debe estar definido para que lectores de pantalla usen pronunciación adecuada.',
    inaccessibleExample: `<html>
  <head><title>Mi sitio</title></head>
  <body>Contenido en español</body>
</html>`,
    accessibleExample: `<html lang="es">
  <head><title>Mi sitio</title></head>
  <body>Contenido en español</body>
</html>`,
    explanation:
      'Definir lang mejora pronunciación, selección de voz y diccionarios en tecnologías asistivas.',
  },
  {
    id: 'wcag-3-1-2',
    criterion: '3.1.2',
    name: 'Idioma de partes',
    description:
      'Los cambios de idioma dentro del contenido deben marcarse programáticamente para una lectura correcta.',
    inaccessibleExample: `<p>El mensaje dice: Welcome to our site.</p>`,
    accessibleExample: `<p>El mensaje dice: <span lang="en">Welcome to our site</span>.</p>`,
    explanation:
      'Marcar el idioma de frases extranjeras evita pronunciación incorrecta y mejora comprensión en lectores de pantalla.',
  },
  {
    id: 'wcag-3-2-1',
    criterion: '3.2.1',
    name: 'Al recibir foco',
    description:
      'Al recibir foco, un componente no debe cambiar el contexto automáticamente (p. ej., navegar) sin que el usuario lo solicite.',
    inaccessibleExample: `<input onfocus="location.href='/checkout'" placeholder="Cupones">`,
    accessibleExample: `<label for="coupon">Cupón</label>
<input id="coupon" placeholder="Ej: DESCUENTO10">
<button type="button">Aplicar</button>`,
    explanation:
      'Cambiar de página al enfocar sorprende al usuario y es especialmente problemático con teclado y lectores de pantalla.',
  },
  {
    id: 'wcag-3-2-2',
    criterion: '3.2.2',
    name: 'Al ingresar datos',
    description:
      'Cambios de configuración o contexto no deben ocurrir automáticamente al cambiar el valor de un input, salvo que se informe claramente.',
    inaccessibleExample: `<select onchange="location.href=this.value">
  <option value="/es">Español</option>
  <option value="/en">English</option>
</select>`,
    accessibleExample: `<label for="lang">Idioma</label>
<select id="lang">
  <option value="es">Español</option>
  <option value="en">English</option>
</select>
<button type="button">Cambiar idioma</button>`,
    explanation:
      'Separar selección y acción evita navegación inesperada, permitiendo revisar antes de aplicar cambios.',
  },
  {
    id: 'wcag-3-2-3',
    criterion: '3.2.3',
    name: 'Navegación consistente',
    description:
      'Los mecanismos de navegación repetidos deben aparecer en el mismo orden relativo en páginas del sitio.',
    inaccessibleExample: `<!-- Página A -->
<nav>
  <a href="/inicio">Inicio</a>
  <a href="/productos">Productos</a>
  <a href="/contacto">Contacto</a>
</nav>

<!-- Página B -->
<nav>
  <a href="/contacto">Contacto</a>
  <a href="/productos">Productos</a>
  <a href="/inicio">Inicio</a>
</nav>`,
    accessibleExample: `<!-- Página A y Página B (mismo orden) -->
<nav>
  <a href="/inicio">Inicio</a>
  <a href="/productos">Productos</a>
  <a href="/contacto">Contacto</a>
</nav>`,
    explanation:
      'Mantener el orden reduce carga cognitiva y facilita aprender el sitio, especialmente para usuarios con discapacidad cognitiva.',
  },
  {
    id: 'wcag-3-2-4',
    criterion: '3.2.4',
    name: 'Identificación consistente',
    description:
      'Componentes con la misma función deben identificarse de manera consistente (texto, icono, etiqueta accesible).',
    inaccessibleExample: `<!-- En una página -->
<button aria-label="Buscar">🔎</button>

<!-- En otra página -->
<button aria-label="Ir">🔎</button>`,
    accessibleExample: `<!-- En todas las páginas -->
<button aria-label="Buscar">🔎</button>`,
    explanation:
      'Etiquetas consistentes evitan confusión y facilitan que los usuarios reconozcan rápidamente controles repetidos.',
  },
  {
    id: 'wcag-3-3-3',
    criterion: '3.3.3',
    name: 'Sugerencias ante errores',
    description:
      'Si se detecta un error de entrada y se conoce cómo corregirlo, se deben proporcionar sugerencias.',
    inaccessibleExample: `<label for="pwd">Contraseña</label>
<input id="pwd" type="password" aria-invalid="true">
<div role="alert">Contraseña inválida</div>`,
    accessibleExample: `<label for="pwd">Contraseña</label>
<input id="pwd" type="password" aria-invalid="true" aria-describedby="pwd-help pwd-error">
<div id="pwd-help">Debe tener 8+ caracteres, 1 número y 1 mayúscula.</div>
<div id="pwd-error" role="alert">Falta al menos un número.</div>`,
    explanation:
      'Indicar qué falta (no solo “inválido”) acelera la corrección y reduce frustración, especialmente en formularios complejos.',
  },
  {
    id: 'wcag-3-3-4',
    criterion: '3.3.4',
    name: 'Prevención de errores (legal/financiero/datos)',
    description:
      'En acciones críticas (compras, transferencias, envío definitivo), se debe permitir revisar, corregir y confirmar antes de finalizar.',
    inaccessibleExample: `<button type="submit">Confirmar compra</button>
<!-- Sin revisión ni confirmación -->`,
    accessibleExample: `<h3>Revisar pedido</h3>
<p>Total: $150</p>
<button type="button">Editar datos</button>
<button type="submit">Confirmar compra</button>
<p id="confirm-help">Revisa tu pedido antes de confirmar.</p>`,
    explanation:
      'Un paso de revisión y posibilidad de corrección previene errores costosos, ayudando a usuarios con dificultades cognitivas o de atención.',
  },

  // =========================
  // ROBUSTEZ (faltantes)
  // =========================
  {
    id: 'wcag-4-1-1',
    criterion: '4.1.1',
    name: 'Análisis (HTML bien formado)',
    description:
      'El marcado debe ser analizable: sin errores graves, sin IDs duplicados y con elementos correctamente anidados.',
    inaccessibleExample: `<button id="buy">Comprar <span>ahora</button>
<div id="buy">Duplicado</div>`,
    accessibleExample: `<button id="buy">Comprar <span>ahora</span></button>
<div id="buy-summary">Resumen</div>`,
    explanation:
      'HTML mal formado o IDs duplicados rompen relaciones (label/for, aria-describedby) y generan comportamientos impredecibles en AT.',
  },
  {
    id: 'wcag-4-1-3',
    criterion: '4.1.3',
    name: 'Mensajes de estado',
    description:
      'Los cambios de estado (p. ej., “Guardado”, “Agregado al carrito”) deben comunicarse a tecnologías asistivas sin mover el foco.',
    inaccessibleExample: `<button type="button" onclick="addToCart()">Agregar</button>
<div id="status" style="display:none;">Agregado al carrito</div>`,
    accessibleExample: `<button type="button" onclick="addToCart()">Agregar</button>
<div id="status" role="status" aria-live="polite">Listo.</div>

<script>
function addToCart() {
  document.getElementById('status').textContent = 'Agregado al carrito';
}
</script>`,
    explanation:
      'role="status"/aria-live permite que lectores de pantalla anuncien el mensaje sin forzar un cambio de foco o navegación inesperada.',
  },
];

export const WCAG_CASES: WCAGCase[] = WCAG_CASES_RAW.map(function (wcagCase) {
  return {
    pillar: pillarFromCriterion(wcagCase.criterion),
    ...wcagCase,
  };
});
