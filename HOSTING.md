# Site Hosting Guide

This folder is ready to be the root of the landing site repository.

## Deploy Settings

Use these settings on Vercel, Netlify, or another static host:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

The site depends on the published `chaicorecss` npm package. Publish the package first, then deploy the site.

## Local Build

```bash
npm install
npm run build
```

## Pre-Publish Local Testing

Before the package is on npm, test the site with a local package tarball:

In the package repo:

```bash
npm test
npm run build
npm pack
```

Then install the generated `.tgz` in this site project for local testing. After publishing, switch back to the versioned npm dependency.
