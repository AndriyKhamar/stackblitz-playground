# stackblitz-playground

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/AndriyKhamar/stackblitz-playground)

## Qué es

Proyecto Angular con una demo interactiva de accesibilidad basada en WCAG 2.1.

- Demo principal: `src/app/components/wcag-demo/`
- Documentación detallada: [WCAG_DEMO_README.md](WCAG_DEMO_README.md)

## Ejecutar local

```bash
npm install
npm run start
```

Si estás en Node moderno y falla por OpenSSL:

```bash
npm run start:legacy
```

## Nota

La demo incluye ejemplos *intencionalmente no accesibles* (p. ej. un caso con parpadeos rápidos para WCAG 2.3.1). Úsalo con fines educativos.

## Deploy (GitHub Pages)

Este repo incluye scripts para publicar en GitHub Pages apuntando a **root** (base-href `/`).

```bash
npm run deploy:ghpages
```

Si estás en Node moderno y necesitas OpenSSL legacy:

```bash
npm run deploy:ghpages:legacy
```