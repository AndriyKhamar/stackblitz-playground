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
    criterion: '1.4.3', //TODO: quitar referencias de AAA
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
    criterion: '2.1.1', //TODO: agregar un efecto click al mouse para mostrar que mouse funciona y por teclado no
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
    name: 'Saltar contenido', //TODO: poner skip to main antes de elnaces
    description:
      'Debe existir un mecanismo para saltarse bloques de contenido repetitivo.',
    explanation:
      'Un enlace "Skip to main content" permite a usuarios de teclado omitir la navegación.',
  },
  {
    id: 'wcag-2-4-4',
    criterion: '2.4.4', //TODO: cambiar por clica aqui, y accesible poner click aqui para ir a xxxx
    pillar: 'operable',
    name: 'Propósito del enlace',
    description:
      'El propósito de cada enlace debe ser determinable desde el texto del enlace o contexto.',
    explanation:
      'El texto del enlace debe ser descriptivo para que usuarios de lectores de pantalla entiendan su destino.',
  },
  {
    id: 'wcag-2-4-6',
    criterion: '2.4.6', // TODO: agregar ejemplo de un input sin label vs otro con label, explicarlo
    pillar: 'operable',
    name: 'Encabezados y etiquetas',
    important: true,
    description:
      'Los encabezados y etiquetas deben ser descriptivos y cumplir una jerarquía clara.',
    explanation:
      'Usar una jerarquía H1 → H2 → H3 permite a los lectores de pantalla navegar la estructura.',
  },
  {
    id: 'wcag-2-5-3',
    criterion: '2.5.3', //TODO: remover
    pillar: 'operable',
    name: 'Etiqueta en el nombre',
    description:
      'Para componentes con etiqueta visual, el nombre accesible debe incluir la etiqueta visible.',
    explanation:
      'La etiqueta visual y el nombre accesible deben coincidir para evitar confusión.',
  },
  {
    id: 'wcag-3-3-1',
    criterion: '3.3.1', //TODO: simular el formulario con foco al error, explicar movimiento del foco al error
    pillar: 'comprensible',
    name: 'Identificación de errores',
    important: true,
    description:
      'Los errores deben ser identificados automáticamente y sugerencias de corrección.',
    explanation:
      'Usar role="alert" y aria-describedby para informar de errores de forma accesible.',
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
    criterion: '4.1.2', //TODO: agregar mejor ejemplo, 1º un boton que simula comportamiento de checkbox, componentes con rol modificado, representar semantica y aria correctos
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
    criterion: '1.4.10', //TODO: quitar width fijo
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
    id: 'wcag-1-4-12', //TODO: juntar al 1.4.10
    criterion: '1.4.12', // TODO: agregar word-break: break-word; al ejemplo correcto
    pillar: 'perceptible',
    name: 'Espaciado del texto',
    description:
      'El contenido debe seguir siendo legible si el usuario ajusta espaciado (line-height, letter-spacing, word-spacing) a valores recomendados.',
    explanation:
      'Evitar alturas fijas y overflow oculto en texto permite que ajustes de legibilidad no rompan el contenido.',
  },
  {
    id: 'wcag-1-4-13',
    criterion: '1.4.13', //TODO: buen ejemplo para explciar la relacion del contenido en la lectura
    pillar: 'perceptible',
    name: 'Contenido al pasar el cursor o foco',
    description:
      'El contenido adicional mostrado al hover o focus (tooltips, menús) debe ser descartable, persistente y accesible por teclado.',
    explanation:
      'Mostrar el tooltip también en foco y asociarlo con aria-describedby permite a teclado y lectores de pantalla acceder al contenido adicional.',
  },

  // =========================
  // OPERABILIDAD (faltantes)
  // =========================
  {
    id: 'wcag-2-1-2',
    criterion: '2.1.2', //TODO: no accesible, cancelar el movimiento de teclado
    pillar: 'operable',
    name: 'Sin trampas de teclado', //TODO: agrega mas de un contenido, para mostrar el movimiento atrapado vs libre
    description:
      'Si el foco entra en un componente, el usuario debe poder salir usando teclado (Tab/Shift+Tab/Escape) sin quedarse “atrapado”.',
    explanation:
      'Los diálogos deben ofrecer una forma clara de cierre (botón y Escape) y no interceptar Tab de forma que impida abandonar el componente.',
  },
  {
    id: 'wcag-2-1-4',
    criterion: '2.1.4', //TODO: quitar
    pillar: 'operable',
    name: 'Atajos de teclado (tecla única)',
    description:
      'Los atajos activados por una sola tecla deben poder desactivarse, reasignarse o requerir modificadores para evitar activaciones accidentales.',
    explanation:
      'Evitar teclas únicas reduce activaciones no intencionales (p. ej., dictado, lectores de pantalla, temblores). Añadir control de habilitado mejora accesibilidad.',
  },
  {
    id: 'wcag-2-2-1',
    criterion: '2.2.1', //TODO: visualizar mejor el ejemplo
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
    criterion: '2.2.2', //TODO: visualmente mostrar que pausa para animacion
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
    criterion: '2.3.1', //TODO:reducir el flash vs reducirlo mas aun
    pillar: 'operable',
    name: 'Convulsiones y reacciones físicas (flashes)',
    description:
      'No debe haber contenido que parpadee más de 3 veces por segundo en un área significativa, para evitar riesgos de convulsiones fotosensibles.',
    explanation:
      'Evitar flashes rápidos reduce riesgos para usuarios con epilepsia fotosensible y mejora la comodidad visual general.',
  },
  {
    id: 'wcag-2-4-2',
    criterion: '2.4.2', //TODO: quitar
    pillar: 'operable',
    name: 'Página titulada',
    description:
      'Las páginas deben tener títulos descriptivos que comuniquen el tema o propósito (p. ej., en <title>).',
    explanation:
      'Un título claro ayuda a usuarios de lectores de pantalla, historial y pestañas a ubicarse y navegar entre páginas.',
  },
  {
    id: 'wcag-2-4-3',
    criterion: '2.4.3', //TODO: no funciona por no estar alislado 
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
    criterion: '2.4.5', //TODO: descatar la importancia del concepto en si
    pillar: 'operable',
    name: 'Múltiples vías de navegación',
    description:
      'Debe existir más de una forma de encontrar páginas dentro de un sitio (p. ej., navegación, búsqueda, mapa del sitio), salvo que sea esencial.',
    explanation:
      'Ofrecer alternativas reduce carga cognitiva y mejora el acceso cuando un método no es suficiente para un usuario.',
  },
  {
    id: 'wcag-2-4-7',
    criterion: '2.4.7', //TODO: explicar que no tiene foco a proposito, mostrar focus trapping con un modal y role dialog
    pillar: 'operable',
    name: 'Enfoque visible', //TODO: movimiento del foco al eliminar o agregar el contenido
    important: true,
    description:
      'Los elementos enfocables deben mostrar un indicador de foco visible al navegar con teclado.',
    explanation:
      'Quitar el outline sin reemplazo hace que usuarios de teclado “pierdan” la ubicación del foco. Un foco claro mejora operabilidad.',
  },
  {
    id: 'wcag-2-5-1',
    criterion: '2.5.1', //TODO: permitir arrastrar el conteido no accesible, accesible permitir arrastrar y ademas hacer que las flechas muevan el conteido
    pillar: 'operable',
    name: 'Gestos con puntero', //TODO: en mobile banner cambia de slides, pero que tambien hayan flechas
    description:
      'Las funciones que requieran gestos complejos (arrastrar, pellizcar) deben tener alternativa con gestos simples o controles.',
    explanation:
      'Una alternativa por botones permite operar sin gestos complejos y es útil con teclado, switch control y movilidad reducida.',
  },
  {
    id: 'wcag-2-5-2',
    criterion: '2.5.2', //TODO: quitar
    pillar: 'operable',
    name: 'Cancelación del puntero',
    description:
      'Para interacciones con puntero, las acciones deben activarse en “up” o permitir cancelar/revertir si se inicia accidentalmente.',
    explanation:
      'Activar en click (pointerup) y/o confirmar evita acciones accidentales al tocar o arrastrar el puntero.',
  },
  {
    id: 'wcag-2-5-4',
    criterion: '2.5.4', //TODO: quitar
    pillar: 'operable',
    name: 'Activación por movimiento',
    description:
      'Las funciones activadas por movimiento del dispositivo (p. ej., agitar) deben tener alternativa y poder desactivarse.',
    explanation:
      'Una alternativa por botón y la posibilidad de desactivar movimiento evita activaciones involuntarias y mejora accesibilidad motora.',
  },

  // =========================
  // COMPRENSIBILIDAD (faltantes)
  // =========================
  {
    id: 'wcag-3-1-1',
    criterion: '3.1.1', //TODO nota, cambiar cada vez que cambiamos el idioma
    pillar: 'comprensible',
    name: 'Idioma de la página',
    important: true,
    description:
      'El idioma principal de la página debe estar definido para que lectores de pantalla usen pronunciación adecuada.',
    explanation:
      'Definir lang mejora pronunciación, selección de voz y diccionarios en tecnologías asistivas.',
  },
  {
    id: 'wcag-3-1-2',
    criterion: '3.1.2', //TODO: juntar a 3.1.1
    pillar: 'comprensible',
    name: 'Idioma de partes', //TODO: nota paraque se entienda atributo lang
    important: true,
    description:
      'Los cambios de idioma dentro del contenido deben marcarse programáticamente para una lectura correcta.',
    explanation:
      'Marcar el idioma de frases extranjeras evita pronunciación incorrecta y mejora comprensión en lectores de pantalla.',
  },
  {
    id: 'wcag-3-2-1',
    criterion: '3.2.1', //TODO: ejempl malo, boton que activa algo en foco, cambiar
    pillar: 'comprensible',
    name: 'Al recibir foco',
    description:
      'Al recibir foco, un componente no debe cambiar el contexto automáticamente (p. ej., navegar) sin que el usuario lo solicite.',
    explanation:
      'Cambiar de página al enfocar sorprende al usuario y es especialmente problemático con teclado y lectores de pantalla.',
  },
  {
    id: 'wcag-3-2-2',
    criterion: '3.2.2', //TODO: input y datos enviaron, vs el input y el boton de enviar
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
    criterion: '3.3.3', //TODO: como sugerencia formato de fecha
    pillar: 'comprensible',
    name: 'Sugerencias ante errores',
    important: true,
    description:
      'Si se detecta un error de entrada y se conoce cómo corregirlo, se deben proporcionar sugerencias.',
    explanation:
      'Indicar qué falta (no solo “inválido”) acelera la corrección y reduce frustración, especialmente en formularios complejos.',
  },
  {
    id: 'wcag-3-3-4',
    criterion: '3.3.4', //TODO: quitar
    pillar: 'comprensible',
    name: 'Prevención de errores (legal/financiero/datos)',
    description:
      'En acciones críticas (compras, transferencias, envío definitivo), se debe permitir revisar, corregir y confirmar antes de finalizar.',
    explanation:
      'Un paso de revisión y posibilidad de corrección previene errores costosos, ayudando a usuarios con dificultades cognitivas o de atención.',
  },

  // =========================
  // ROBUSTEZ (faltantes)
  // =========================
  {
    id: 'wcag-4-1-1',
    criterion: '4.1.1', //TODO: mostrar mas ejemplos de html malo vs bueno
    pillar: 'robusto',
    name: 'Análisis (HTML bien formado)',
    important: true,
    description:
      'El marcado debe ser analizable: sin errores graves, sin IDs duplicados y con elementos correctamente anidados.',
    explanation:
      'HTML mal formado o IDs duplicados rompen relaciones (label/for, aria-describedby) y generan comportamientos impredecibles en AT.',
  },
  {
    id: 'wcag-4-1-3', //TODO: hablar sobre la comunicacion de los cambios de estado
    criterion: '4.1.3', //TODO: agregar mecanismo para cambiar status iterando, agregar role alert
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
