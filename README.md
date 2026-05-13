# ChaiCoreCSS Site

Vite-powered landing website and playground for ChaiCoreCSS.

## Live Site

- Production: https://chaicore.abishekyadav.in
- Repository: https://github.com/abishek-ydv/chaicorecss-site

## Overview

This site is deployed and uses the public `chaicorecss` npm package. It imports from `chaicorecss` directly, not from a local sibling folder, so the deployed build reflects the published package dependency.

## Structure

- `index.html` - main site entry point.
- `src/main.js` - site behavior and playground wiring.
- `src/styles.css` - site styling.
- `public/` - static assets.
- `dist/` - generated site build output.

## Development

```bash
npm install
npm run dev
```

## Build And Preview

```bash
npm run build
npm run preview
```

## Deployment

Build output is generated in `dist/`. Deploy the contents of `dist/` to update the production site.
