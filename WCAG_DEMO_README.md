# Demo Interactiva de Accesibilidad Web - WCAG 2.1

## Descripción General

Este componente Angular presenta una **demo educativa interactiva** sobre accesibilidad web según las pautas **WCAG 2.1** del W3C. Muestra ejemplos reales de código **no accesible vs accesible** para enseñar mejores prácticas.

## Características

✅ **12 criterios WCAG 2.1 clave** cubiertos
✅ **Comparación visual** de código correcto e incorrecto
✅ **Totalmente accesible** (cumple WCAG AA)
✅ **Navegable por teclado** (Tab, Enter)
✅ **Soporte para lectores de pantalla** (ARIA)
✅ **Responsive design** (mobile-friendly)
✅ **Sin dependencias externas** (solo Angular 7)

## Criterios WCAG 2.1 Cubiertos

### Perceptibilidad
- **1.1.1** Contenido no textual (alternativas de texto)
- **1.3.1** Información y relaciones (marcado semántico)
- **1.3.2** Secuencia significativa (orden lógico)
- **1.4.3** Contraste mínimo (legibilidad visual)
- **1.4.4** Redimensionamiento de texto (escalabilidad)

### Operabilidad
- **2.1.1** Teclado (acceso sin ratón)
- **2.4.1** Saltar contenido (skip links)
- **2.4.4** Propósito del enlace (link descriptivos)
- **2.4.6** Encabezados y etiquetas (jerarquía clara)
- **2.5.3** Etiqueta en el nombre (coincidencia visual-accesible)

### Comprensibilidad
- **3.3.1** Identificación de errores (mensajes de error accesibles)
- **3.3.2** Etiquetas o instrucciones (claridad en formularios)

### Robustez
- **4.1.2** Nombre, rol y valor (compatibilidad con AT)

## Estructura de Archivos

```
src/app/components/wcag-demo/
├── wcag-demo.component.ts       # Lógica del componente
├── wcag-demo.component.html     # Template HTML
└── wcag-demo.component.scss     # Estilos
```

## Uso

### 1. Importar en el módulo

```typescript
import { WCAGDemoComponent } from './components/wcag-demo/wcag-demo.component';

@NgModule({
  declarations: [WCAGDemoComponent],
  imports: [CommonModule],
})
export class AppModule {}
```

### 2. Usar el componente

```html
<wcag-demo></wcag-demo>
```

### 3. Ver en el navegador

```bash
npm run start
# La demo se abrirá en http://localhost:4200
```

## Funcionalidades Interactivas

### Expandir/Contraer casos
Haz clic en cualquier criterio para expandir/contraer los ejemplos de código.

```html
<button
  (click)="toggleCase(case.id)"
  [attr.aria-expanded]="isExpanded(case.id)"
  [attr.aria-controls]="'case-content-' + case.id">
  {{ case.name }}
</button>
```

### Navegación por teclado
- **Tab**: Navega entre criterios
- **Enter/Espacio**: Expande/contrae el criterio seleccionado
- **Shift+Tab**: Navega hacia atrás

### Compatibilidad con lectores de pantalla
- Todas las transiciones se comunican mediante `aria-expanded`
- Los botones tienen roles y labels explícitos
- El contenido expandible está correctamente asociado

## Ejemplos de Criterios

### Ejemplo 1: 1.1.1 - Contenido no textual

**❌ No Accesible:**
```html
<img src="logo.png">
```

**✅ Accesible:**
```html
<img src="logo.png" alt="Logo de la empresa XYZ">
```

**Por qué:** Los lectores de pantalla no pueden interpretar imágenes sin atributo `alt`.

---

### Ejemplo 2: 1.3.1 - Información y relaciones

**❌ No Accesible:**
```html
<div>Nombre:</div>
<input type="text">
```

**✅ Accesible:**
```html
<label for="name">Nombre:</label>
<input type="text" id="name">
```

**Por qué:** `<label>` con `for` establece la relación para usuarios de tecnología asistiva.

---

### Ejemplo 3: 2.1.1 - Teclado

**❌ No Accesible:**
```html
<div onclick="alert('Hecho')">
  Hacer click
</div>
```

**✅ Accesible:**
```html
<button onclick="alert('Hecho')">
  Hacer click
</button>
```

**Por qué:** Los `<button>` nativos son accesibles por teclado automáticamente.

---

### Ejemplo 4: 1.4.3 - Contraste mínimo

**❌ No Accesible:**
```html
<p style="color: #cccccc; background: #ffffff;">
  Texto con bajo contraste
</p>
```

**✅ Accesible:**
```html
<p style="color: #333333; background: #ffffff;">
  Texto con contraste suficiente (7:1)
</p>
```

**Por qué:** Ratio 7:1 es recomendado para AA. Personas con baja visión lo necesitan.

---

### Ejemplo 5: 3.3.1 - Identificación de errores

**❌ No Accesible:**
```html
<input type="email" id="email">
<button>Enviar</button>
<!-- Sin validación -->
```

**✅ Accesible:**
```html
<label for="email">Correo:</label>
<input type="email" id="email" aria-describedby="email-error" required>
<span id="email-error" role="alert" style="display: none; color: red;">
  Ingrese un correo válido
</span>
```

**Por qué:** `role="alert"` notifica al lector de pantalla cuando ocurre un error.

## Atributos ARIA Utilizados

| Atributo | Propósito |
|----------|-----------|
| `aria-expanded` | Indica si un elemento colapsa/expande |
| `aria-controls` | Indica qué elemento es controlado |
| `aria-label` | Proporciona un nombre accesible |
| `aria-describedby` | Vincula con descripción adicional |
| `aria-pressed` | Indica estado "presionado" de botón toggle |
| `role="alert"` | Anota cambios importantes para AT |
| `role="button"` | Define semántica para divs interactivos |
| `role="complementary"` | Denota contenido complementario |

## Estilos Accesibles

### Contraste visual
- Colores: Ratio mínimo 4.5:1 para texto normal (AA)
- Fondos: Suficiente contraste en todos los estados

### Legibilidad
- Fuente: -apple-system, BlinkMacSystemFont, 'Segoe UI' (sans-serif)
- Tamaño: Base 1rem (16px), escalable
- Altura de línea: 1.5-1.6 (cómoda lectura)

### Estados interactivos
- `:hover`: Cambio de color de fondo
- `:focus`: Outline 2px sólido
- Transiciones: 0.2s-0.3s (no causa mareo)

## Testing de Accesibilidad

### Con teclado
1. Abre el navegador (F12)
2. Presiona **Tab** continuamente
3. Verifica que todo sea navegable
4. Presiona **Enter** en botones

### Con lector de pantalla (NVDA/JAWS)
1. Activa el lector de pantalla
2. Navega con Tab/Shift+Tab
3. Lee encabezados con H
4. Escucha descripciones ARIA

### Con inspector de accesibilidad
```bash
# Chrome DevTools
1. F12 → Lighthouse
2. Click "Analyze page load"
3. Revisa "Accessibility" report
```

## Estructura de Datos

```typescript
interface WCAGCase {
  id: string;                  // ID único para state
  criterion: string;           // Número WCAG (ej: "1.1.1")
  name: string;                // Nombre del criterio
  description: string;         // Explicación del problema
  inaccessibleExample: string; // Código no accesible
  accessibleExample: string;   // Código correcto
  explanation: string;         // Por qué funciona
}
```

## Responsividad

### Desktop (> 768px)
- Layout: 2 columnas (contenido + sidebar)
- Sidebar: Sticky (se queda en pantalla)
- Ancho máximo: 1200px

### Tablet/Mobile (≤ 768px)
- Layout: 1 columna
- Sidebar: Normal (scrollable)
- Padding: Reducido (20px)

## Recursos Adicionales

- [WCAG 2.1 Oficial (W3C)](https://www.w3.org/TR/WCAG21/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Guía ARIA del W3C](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Niveles de Conformidad WCAG

| Nivel | Descripción |
|-------|-------------|
| **A** | Mínimo básico de accesibilidad |
| **AA** | Recomendado para la mayoría de sitios |
| **AAA** | Máximo nivel (ideal para contenido crítico) |

## Notas para Desarrolladores

### Mejores Prácticas Implementadas
✅ Elementos semánticos HTML5 (`<button>`, `<label>`, `<main>`, etc.)
✅ Jerarquía de encabezados correcta (H1 → H2 → H3)
✅ Contraste de color >= 4.5:1
✅ Campos de formulario con labels explícitas
✅ Navegación por teclado completa
✅ Mensajes de error accesibles
✅ Links descriptivos (no "click aquí")
✅ Imágenes con alt text
✅ Enfoque visible en todos los interactivos

### Validación
Usa [WAVE](https://wave.webaim.org/) o [Axe DevTools](https://www.deque.com/axe/devtools/) para validar:
```javascript
// En console
axe.run((err, results) => {
  console.log(results.violations);
});
```

## Licencia

Este componente es parte de un proyecto educativo sobre accesibilidad web.

---

**Última actualización:** Febrero 2026
**Compatibilidad:** Angular 7+
**Estado:** Producción
