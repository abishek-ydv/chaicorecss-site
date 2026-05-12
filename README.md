# ChaiCoreCSS Site

This directory contains the Vite landing website and playground for ChaiCoreCSS.

It is ready to live in its own repository. The site depends on the public `chaicorecss` npm package and imports from `chaicorecss`, not from a local sibling folder.

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

## Build

```bash
npm run build
npm run preview
```

## Before the Package Is Published

For local pre-publish testing, either install a package tarball created with `npm pack` from the package repo, or use `npm link`. After publishing, keep the dependency as the normal npm version in `package.json`.
