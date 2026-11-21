# mateoatwi.com

Personal site of Mateo Atwi, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run check    # type-check .astro / .ts files
```

Requires Node 22.23.4 or newer.

## Where things live

| What | Where |
| --- | --- |
| Projects (one Markdown file each, served at `/<slug>/`) | `src/content/projects/` |
| Work & education entries (file name = `#anchor` on the page) | `src/content/work/` |
| Collection pages (books, quotes, words, 3D printing) | `src/content/pages/` |
| China Summer Program posts (Blogger HTML exports) | `src/content/csp/` |
| Home page copy (skills, goals, interests) | `src/pages/index.astro` |
| Site-wide settings (email, nav, analytics ID) | `src/lib/site.ts` |
| Images optimized at build time | `src/assets/` |
| Files copied as-is (`CNAME`, favicon, legacy images) | `public/` |

### Add a project

Create `src/content/projects/my-project.md`:

```md
---
title: My Project
date: 2026-11-21
slug: myProject            # URL becomes /myProject/
summary: One paragraph shown on cards and as the page lede. [Links](/projects/) work.
thumbnail: ../../assets/projects/myProject.jpg   # optional
draft: false               # true = only visible in `npm run dev`
---

Markdown body…
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes the site on every push to `master`.
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
