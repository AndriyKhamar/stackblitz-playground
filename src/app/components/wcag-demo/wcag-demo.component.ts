import { Component } from '@angular/core';

interface WCAGCase {
  id: string;
  criterion: string;
  name: string;
  description: string;
  inaccessibleExample: string;
  accessibleExample: string;
  explanation: string;
}

@Component({
  selector: 'wcag-demo',
  templateUrl: './wcag-demo.component.html',
  styleUrls: ['./wcag-demo.component.scss'],
})
export class WCAGDemoComponent {
  wcagCases: WCAGCase[] = [
    {
      id: 'wcag-1-1-1',
      criterion: '1.1.1',
      name: 'Contenido no textual',
      description:
        'Todo contenido no textual (imágenes) debe tener un equivalente textual mediante atributo alt para que los lectores de pantalla lo interpreten.',
      inaccessibleExample: `<img src="logo.png">`,
      accessibleExample: `<img src="logo.png" alt="Logo de la empresa XYZ">`,
      explanation:
        'El atributo alt describe el contenido de la imagen para usuarios con discapacidad visual.',
    },
    {
      id: 'wcag-1-3-1',
      criterion: '1.3.1',
      name: 'Información y relaciones',
      description:
        'La información, la estructura y las relaciones deben estar presentes en el marcado o ser determinables mediante programación.',
      inaccessibleExample: `<div>Nombre:</div>
<input type="text">
<div>Correo:</div>
<input type="email">`,
      accessibleExample: `<label for="name">Nombre:</label>
<input type="text" id="name">

<label for="email">Correo:</label>
<input type="email" id="email">`,
      explanation:
        'El uso de <label> con atributo for establece la relación entre la etiqueta y el campo de entrada.',
    },
    {
      id: 'wcag-1-3-2',
      criterion: '1.3.2',
      name: 'Secuencia significativa',
      description:
        'Cuando la secuencia en que se presenta el contenido afecta a su significado, se debe poder determinar mediante programación una secuencia de lectura correcta.',
      inaccessibleExample: `<div style="float: left; width: 30%;">
  Columna 1
</div>
<div style="float: left; width: 70%;">
  Contenido principal
</div>`,
      accessibleExample: `<main>
  <div style="display: flex;">
    <aside style="width: 30%;">Columna 1</aside>
    <section style="width: 70%;">Contenido principal</section>
  </div>
</main>`,
      explanation:
        'Usar elementos semánticos (main, aside, section) y flexbox en lugar de floats asegura una secuencia lógica.',
    },
    {
      id: 'wcag-1-4-3',
      criterion: '1.4.3',
      name: 'Contraste mínimo (AAA)',
      description:
        'El contraste visual entre el texto y el fondo debe ser al menos 7:1 para cumplir AAA o 4.5:1 para AA.',
      inaccessibleExample: `<p style="color: #cccccc; background: #ffffff;">
  Texto con bajo contraste
</p>`,
      accessibleExample: `<p style="color: #333333; background: #ffffff;">
  Texto con contraste suficiente
</p>`,
      explanation:
        'Un ratio de contraste 7:1 garantiza legibilidad para personas con baja visión o daltonismo.',
    },
    {
      id: 'wcag-1-4-4',
      criterion: '1.4.4',
      name: 'Redimensionamiento de texto',
      description:
        'El texto debe poder redimensionarse hasta 200% sin que se pierda contenido o funcionalidad.',
      inaccessibleExample: `<p style="font-size: 10px; width: 200px; overflow: hidden;">
  Texto pequeño en contenedor fijo
</p>`,
      accessibleExample: `<p style="font-size: 1rem; max-width: 100%; word-wrap: break-word;">
  Texto redimensionable con flujo adaptable
</p>`,
      explanation:
        'Usar unidades relativas (rem, em) y evitar overflow permite que el texto sea legible cuando se amplía.',
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
  ];

  expandedCases: Set<string> = new Set();

  toggleCase(caseId: string): void {
    if (this.expandedCases.has(caseId)) {
      this.expandedCases.delete(caseId);
    } else {
      this.expandedCases.add(caseId);
    }
  }

  isExpanded(caseId: string): boolean {
    return this.expandedCases.has(caseId);
  }
}
