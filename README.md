# Agent Layer website

This repository owns the Docusaurus site configuration, theme components, CSS,
branding assets, and deployment workflow for https://agent-layer.dev.

The `conn-castle/agent-layer` release publisher owns `src/pages`, `docs`, versioned
documentation, `CHANGELOG.md`, `redirect-manifest.json`, `static/deepswe-planner`,
`static/llms.txt`, and `static/docs`. Make lasting content changes in that
repository's `site/` sources. For an immediate website correction, update the
canonical source and this published copy together so the next release preserves
the fix.

Navbar links live in `docusaurus.config.js`. The custom footer owns its links in
`src/theme/Footer/index.js`; Docusaurus's unused footer configuration is omitted.
Changes to these files, styles, or branding require a website PR: publishing a
CLI release does not copy unpublished website work.

## Development and validation

Use Node.js 22 or later:

```sh
npm ci
npm run build
npm run serve
```

The build runs `npm test` afterward to check the actual published files for
missing local assets and required homepage navigation and branding. Run
`npm test` directly to recheck an existing build. Docusaurus also rejects broken
page links and anchors. Inspect desktop and mobile layouts in both color modes
when changing navigation, layout, or branding.

Pull requests run the production build and its checks. Merging to `main` builds
and deploys GitHub Pages.

## Grok artwork

`static/img/logos/grok.svg` preserves the SVG paths served by the official
[Grok homepage](https://grok.com/) on 2026-09-18. It identifies a supported client;
it does not indicate sponsorship. The mark belongs to its owner and is subject
to the [official brand guidelines](https://x.ai/legal/brand-guidelines).
