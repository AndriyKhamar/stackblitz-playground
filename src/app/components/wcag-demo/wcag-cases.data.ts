import { A11yPillarKey, WCAGCase } from './wcag-case.model';

type WCAGCaseRaw = {
  id: string;
  criterion: string;
  pillar: A11yPillarKey;
  name: string;
  important?: boolean;
  description: string;
  explanation: string;
};

const WCAG_CASES_RAW: WCAGCaseRaw[] = [
  {
    id: 'wcag-1-1-1',
    criterion: '1.1.1',
    pillar: 'perceptible',
    name: 'Contenido no textual',
    important: true,
    description:
      'Todo contenido no textual (imágenes) debe tener un equivalente textual mediante atributo alt para que los lectores de pantalla lo interpreten.',
    explanation:
      'El atributo alt describe el contenido de la imagen para usuarios con discapacidad visual. En el caso de una imagen decorativa la descripcion no siempre es necesaria.',
  },
  {
    id: 'wcag-1-3-1',
    criterion: '1.3.1',
    pillar: 'perceptible',
    name: 'Información y relaciones',
    description:
      'La información, la estructura y las relaciones deben estar presentes en el marcado o ser determinables mediante programación.',
    explanation:
      'El uso de <label> (con for/id o anidando el input) establece la relación programática entre etiqueta y campo. Esto es clave para lectores de pantalla y para que el foco/lectura “entienda” qué significa cada input. Aria-controls indica qué elemento controla un botón, y aria-expanded comunica si ese elemento está abierto o cerrado',
  },
  {
    id: 'wcag-1-3-2',
    criterion: '1.3.2',
    pillar: 'perceptible',
    name: 'Secuencia significativa',
    description:
      'Cuando la secuencia en que se presenta el contenido afecta a su significado, se debe poder determinar mediante programación una secuencia de lectura correcta.',
    explanation:
      'El orden en el HTML/DOM (lectura y tabulación) debe ser el mismo que el orden visual. Evita “falsear” el orden con CSS (p. ej. order) si cambia el significado, porque lectores de pantalla y usuarios de teclado siguen el orden del DOM.',
  },
  {
    id: 'wcag-1-4-3',
    criterion: '1.4.3',
    pillar: 'perceptible',
    name: 'Contraste mínimo',
    important: true,
    description:
      'El contraste visual entre el texto y el fondo debe ser al menos 7:1 para cumplir AAA o 4.5:1 para AA.',
    explanation:
      'Un ratio de contraste 7:1 garantiza legibilidad para personas con baja visión o daltonismo.',
  },
  {
    id: 'wcag-1-4-4',
    criterion: '1.4.4',
    pillar: 'perceptible',
    name: 'Redimensionamiento de texto',
    description:
      'El texto debe poder redimensionarse hasta 200% sin que se pierda contenido o funcionalidad.',
    explanation:
      'Usar unidades relativas (rem/em) y evitar alturas fijas/overflow oculto permite que el texto sea legible cuando se amplía. Para comprobarlo, prueba zoom del navegador al 200%.',
  },
  {
    id: 'wcag-2-1-1',
    criterion: '2.1.1',
    pillar: 'operable',
    name: 'Teclado',
    important: true,
    description:
      'Todo elemento interactivo debe ser accesible mediante teclado (Tab, Enter, Espacio).',
    explanation:
      'Usar elementos <button> nativos o agregar role="button" y gestionar eventos de teclado.',
  },
  {
    id: 'wcag-2-4-1',
    criterion: '2.4.1',
    pillar: 'operable',
    name: 'Saltar contenido',
    description:
      'Debe existir un mecanismo para saltarse bloques de contenido repetitivo.',
    explanation:
      'Un enlace "Skip to main content" permite a usuarios de teclado omitir la navegación.',
  },
  {
    id: 'wcag-2-4-4',
    criterion: '2.4.4',
    pillar: 'operable',
    name: 'Propósito del enlace',
    description:
      'El propósito de cada enlace debe ser determinable desde el texto del enlace o contexto.',
    explanation:
      'El texto del enlace debe ser descriptivo para que usuarios de lectores de pantalla entiendan su destino.',
  },
  {
    id: 'wcag-2-4-6',
    criterion: '2.4.6',
    pillar: 'operable',
    name: 'Encabezados y etiquetas',
    important: true,
    description:
      'Los encabezados y etiquetas deben ser descriptivos y cumplir una jerarquía clara.',
    explanation:
      'Usar una jerarquía H1 → H2 → H3 permite a los lectores de pantalla navegar la estructura.',
  },
  {
    id: 'wcag-3-3-1',
    criterion: '3.3.1', 
    pillar: 'comprensible',
    name: 'Identificación de errores',
    important: true,
    description:
      'Los errores deben ser identificados automáticamente y sugerencias de corrección.',
    explanation:
      'Se recomienda usar role="alert" y aria-describedby para informar de errores de forma accesible.',
  },
  {
    id: 'wcag-3-3-2',
    criterion: '3.3.2',
    pillar: 'comprensible',
    name: 'Etiquetas o instrucciones',
    important: true,
    description:
      'Se proporcionan etiquetas o instrucciones claras para entrada de datos.',
    explanation:
      'Las etiquetas y instrucciones claramente asociadas ayudan a usuarios a completar formularios.',
  },
  {
    id: 'wcag-4-1-2',
    criterion: '4.1.2',
    pillar: 'robusto',
    name: 'Nombre, rol y valor',
    important: true,
    description:
      'Todos los componentes deben comunicar su nombre, rol y estado de forma accesible.',
    explanation:
      'Usar role="button" o elementos <button>, con aria-pressed para comunicar estado.',
  },
  {
    id: 'wcag-1-2-1-3',
    criterion: '1.2.1',
    pillar: 'perceptible',
    name: 'Alternativas para audio y vídeo',
    description:
      'Para contenido multimedia prerregrabado, se deben proporcionar alternativas equivalentes: transcripción (solo audio), subtítulos (vídeo con audio) y audiodescripción o alternativa cuando la información visual sea esencial.',
    explanation:
      'Estas medidas permiten que personas sordas/hipoacúsicas o con discapacidad visual accedan al contenido. Incluye: 1) transcripción para audio; 2) captions/subtítulos sincronizados para vídeo; 3) audiodescripción o alternativa textual cuando lo visual aporta significado.',
  },
  {
    id: 'wcag-1-3-3',
    criterion: '1.3.3',
    pillar: 'perceptible',
    name: 'Características sensoriales',
    important: true,
    description:
      'Las instrucciones no deben depender solo de forma, tamaño, ubicación, orientación o sonido (p. ej., “haz clic en el botón de la derecha”).',
    explanation:
      'Las instrucciones basadas en color/posición fallan en lectores de pantalla, reflow, zoom y para usuarios con daltonismo.',
  },
  {
    id: 'wcag-1-3-4',
    criterion: '1.3.4',
    pillar: 'perceptible',
    name: 'Orientación',
    description:
      'El contenido no debe restringir su visualización y operación a una sola orientación (vertical u horizontal), salvo que sea esencial.',
    explanation:
      'Evita bloquear la UI a una orientación salvo necesidad esencial. Restringir por CSS/JS puede impedir el uso a personas que requieren horizontal/vertical (soportes, movilidad, baja visión).',
  },
  {
    id: 'wcag-1-3-5',
    criterion: '1.3.5',
    pillar: 'perceptible',
    name: 'Propósito del input',
    description:
      'Para campos de datos comunes, el propósito debe poder determinarse mediante programación (p. ej., usando autocomplete).',
    explanation:
      'Autocomplete ayuda a tecnologías asistivas y a autocompletado del navegador a identificar el propósito del campo de forma fiable.',
  },
  {
    id: 'wcag-1-4-1', 
    criterion: '1.4.1',
    pillar: 'perceptible',
    name: 'Uso del color',
    important: true,
    description:
      'El color no debe ser el único medio para comunicar información, indicar acciones o distinguir elementos.',
    explanation:
      'Añadir un mensaje textual (y asociarlo con aria-describedby/role="alert") hace que el error sea perceptible sin depender del color.',
  },
  {
    id: 'wcag-1-4-10',
    criterion: '1.4.10',
    pillar: 'perceptible',
    name: 'Reflow',
    important: true,
    description:
      'El contenido debe presentarse sin pérdida de información o funcionalidad y sin desplazamiento en dos dimensiones a 320px de ancho (equivalente).',
    explanation:
      'Usar contenedores fluidos, flex-wrap y tamaños mínimos razonables evita el scroll horizontal al hacer zoom o en móviles.',
  },
  {
    id: 'wcag-1-4-11',
    criterion: '1.4.11',
    pillar: 'perceptible',
    name: 'Contraste no textual',
    description:
      'Los componentes de interfaz (bordes, iconos, estados) deben tener contraste suficiente (mín. 3:1) contra colores adyacentes.',
    explanation:
      'No basta con el contraste del texto: el control (borde/estado) también debe ser perceptible para ubicar e identificar el componente.',
  },
  {
    id: 'wcag-1-4-12',
    criterion: '1.4.12',
    pillar: 'perceptible',
    name: 'Espaciado del texto',
    description:
      'El contenido debe seguir siendo legible si el usuario ajusta espaciado (line-height, letter-spacing, word-spacing) a valores recomendados.',
    explanation:
      'Evitar alturas fijas y overflow oculto en texto permite que ajustes de legibilidad no rompan el contenido.',
  },
  {
    id: 'wcag-1-4-13',
    criterion: '1.4.13',
    pillar: 'perceptible',
    name: 'Contenido al pasar el cursor o foco',
    description:
      'El contenido adicional mostrado al hover o focus (tooltips, menús) debe ser descartable, persistente y accesible por teclado.',
    explanation:
      'Mostrar el tooltip también en foco y asociarlo con aria-describedby permite a teclado y lectores de pantalla acceder al contenido adicional. El uso de aria-describedby brinda descripcion adicional al contenido sin reemplazar el contenido del elemento, lo que es útil para tooltips y mensajes de error.',
  },
  {
    id: 'wcag-2-1-2',
    criterion: '2.1.2',
    pillar: 'operable',
    name: 'Sin trampas de teclado',
    description:
      'Si el foco entra en un componente, el usuario debe poder salir usando teclado (Tab/Shift+Tab/Escape) sin quedarse “atrapado”.',
    explanation:
      'Los diálogos deben ofrecer una forma clara de cierre (botón y Escape) y no interceptar Tab de forma que impida abandonar el componente.',
  },
  {
    id: 'wcag-2-2-1',
    criterion: '2.2.1',
    pillar: 'operable',
    name: 'Tiempo ajustable',
    important: true,
    description:
      'Si hay límites de tiempo, el usuario debe poder extender, desactivar o ajustarlos, salvo que sea esencial.',
    explanation:
      'Notificar con anticipación y permitir extensión brinda control a usuarios que necesitan más tiempo (lectores de pantalla, movilidad reducida, cognitivo).',
  },
  {
    id: 'wcag-2-2-2',
    criterion: '2.2.2',
    pillar: 'operable',
    name: 'Pausar, detener, ocultar (carruseles/animaciones)',
    important: true,
    description:
      'Contenido que se mueve o actualiza automáticamente debe poder pausarse/detenerse/ocultarse, salvo que sea esencial.',
    explanation:
      'Un botón de pausa da control al usuario, evita distracciones y reduce problemas para usuarios con discapacidad cognitiva o vestibular.',
  },
  {
    id: 'wcag-2-3-1',
    criterion: '2.3.1',
    pillar: 'operable',
    name: 'Convulsiones y reacciones físicas (flashes)',
    description:
      'No debe haber contenido que parpadee más de 3 veces por segundo en un área significativa, para evitar riesgos de convulsiones fotosensibles.',
    explanation:
      'Evitar flashes rápidos reduce riesgos para usuarios con epilepsia fotosensible y mejora la comodidad visual general.',
  },
  {
    id: 'wcag-2-4-3',
    criterion: '2.4.3',
    pillar: 'operable',
    name: 'Orden del foco',
    important: true,
    description:
      'El orden de tabulación debe preservar significado y operabilidad. Evitar tabindex positivos que alteren el orden natural.',
    explanation:
      'El orden natural del DOM suele ser el más predecible. tabindex positivo puede generar recorridos confusos y difíciles de mantener.',
  },
  {
    id: 'wcag-2-4-5',
    criterion: '2.4.5',
    pillar: 'operable',
    name: 'Múltiples vías de navegación',
    description:
      'Debe existir más de una forma de encontrar páginas dentro de un sitio (p. ej., navegación, búsqueda, mapa del sitio), salvo que sea esencial.',
    explanation:
      'Ofrecer alternativas reduce carga cognitiva y mejora el acceso cuando un método no es suficiente para un usuario.',
  },
  {
    id: 'wcag-2-4-7',
    criterion: '2.4.7',
    pillar: 'operable',
    name: 'Enfoque visible',
    important: true,
    description:
      'Los elementos enfocables deben mostrar un indicador de foco visible al navegar con teclado.',
    explanation:
      'Quitar el outline sin reemplazo hace que usuarios de teclado “pierdan” la ubicación del foco. Un foco claro mejora operabilidad.',
  },
  {
    id: 'wcag-2-5-1',
    criterion: '2.5.1',
    pillar: 'operable',
    name: 'Gestos con puntero',
    description:
      'Las funciones que requieran gestos complejos (arrastrar, pellizcar) deben tener alternativa con gestos simples o controles.',
    explanation:
      'Una alternativa por botones permite operar sin gestos complejos y es útil con teclado, switch control y movilidad reducida.',
  },
  {
    id: 'wcag-3-1-1',
    criterion: '3.1.1',
    pillar: 'comprensible',
    name: 'Idioma de la página + idioma de partes',
    important: true,
    description:
      '3.1.1 / 3.1.2 El idioma principal debe definirse y los cambios de idioma dentro del contenido deben marcarse programáticamente.',
    explanation:
      'Definir lang en el contenedor principal ayuda a pronunciación y selección de voz. Para frases en otro idioma, usa lang en ese fragmento (p. ej. <span lang="en">...</span>) para evitar pronunciación incorrecta.',
  },
  {
    id: 'wcag-3-2-1',
    criterion: '3.2.1',
    pillar: 'comprensible',
    name: 'Al recibir foco',
    description:
      'Al recibir foco, un componente no debe cambiar el contexto automáticamente (p. ej., navegar) sin que el usuario lo solicite.',
    explanation:
      'Cambiar de página al enfocar sorprende al usuario y es especialmente problemático con teclado y lectores de pantalla.',
  },
  {
    id: 'wcag-3-2-2',
    criterion: '3.2.2',
    pillar: 'comprensible',
    name: 'Al ingresar datos',
    description:
      'Cambios de configuración o contexto no deben ocurrir automáticamente al cambiar el valor de un input, salvo que se informe claramente.',
    explanation:
      'Separar selección y acción evita navegación inesperada, permitiendo revisar antes de aplicar cambios.',
  },
  {
    id: 'wcag-3-2-3',
    criterion: '3.2.3',
    pillar: 'comprensible',
    name: 'Navegación consistente',
    description:
      'Los mecanismos de navegación repetidos deben aparecer en el mismo orden relativo en páginas del sitio.',
    explanation:
      'Mantener el orden reduce carga cognitiva y facilita aprender el sitio, especialmente para usuarios con discapacidad cognitiva.',
  },
  {
    id: 'wcag-3-2-4',
    criterion: '3.2.4',
    pillar: 'comprensible',
    name: 'Identificación consistente',
    description:
      'Componentes con la misma función deben identificarse de manera consistente (texto, icono, etiqueta accesible).',
    explanation:
      'Etiquetas consistentes evitan confusión y facilitan que los usuarios reconozcan rápidamente controles repetidos.',
  },
  {
    id: 'wcag-3-3-3',
    criterion: '3.3.3',
    pillar: 'comprensible',
    name: 'Sugerencias ante errores',
    important: true,
    description:
      'Si se detecta un error de entrada y se conoce cómo corregirlo, se deben proporcionar sugerencias.',
    explanation:
      'Indicar qué falta (no solo “inválido”) acelera la corrección y reduce frustración, especialmente en formularios complejos.',
  },
  {
    id: 'wcag-4-1-1',
    criterion: '4.1.1',
    pillar: 'robusto',
    name: 'Análisis (HTML bien formado)',
    important: true,
    description:
      'El marcado debe ser analizable: sin errores graves, sin IDs duplicados y con elementos correctamente anidados.',
    explanation:
      'HTML mal formado o IDs duplicados rompen relaciones (label/for, aria-describedby) y generan comportamientos impredecibles en AT.',
  },
  {
    id: 'wcag-4-1-3',
    criterion: '4.1.3',
    pillar: 'robusto',
    name: 'Mensajes de estado',
    important: true,
    description:
      'Los cambios de estado (p. ej., “Guardado”, “Agregado al carrito”) deben comunicarse a tecnologías asistivas sin mover el foco.',
    explanation:
      'role="status"/aria-live permite que lectores de pantalla anuncien el mensaje sin forzar un cambio de foco o navegación inesperada.',
  },
];

export const WCAG_CASES: WCAGCase[] = WCAG_CASES_RAW.map(function (wcagCase) {
  return {
    ...wcagCase,
    important: wcagCase.important === true,
    inaccessibleTemplateKey: wcagCase.id + '/inaccessible',
    accessibleTemplateKey: wcagCase.id + '/accessible',
  };
});
