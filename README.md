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
| Blog posts (served at `/blog/<file-name>/`) | `src/content/blog/` |
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

### Write an essay for the blog

Copy `src/content/blog/example-post.md` to a new file such as `src/content/blog/avoid-stupidity.md`
(the file name becomes the URL: `/blog/avoid-stupidity/`). The example shows every option:

```md
---
title: Avoid Stupidity
date: 2026-11-25
topics: [Ideologies]               # one or more of: Ideologies, Operating Principles, Commentary
summary: One or two sentences shown in the article list and in link previews.
quote:                             # optional: the quote the essay is built around
  text: The quote, word for word.
  author: Who said it
  source: Book, talk or interview   # optional
  url: https://…                    # optional link to the original
series: Quotes I Live By           # optional: essays with the same series name link to each other
thanks: Tiago Atwi for reading drafts of this.   # optional closing line
draft: false                       # true = only visible in `npm run dev`
---

The essay, in Markdown. Add notes with [^1] and define them at the end:

[^1]: The note text.
```

Essay pages follow Paul Graham's layout: the date as month and year, the quote at the top, numbered
notes at the end, and an optional thanks line. Essays in the same series list each other.

To list an article published somewhere else (LinkedIn, Medium, a newspaper…), add
`link: https://…` and optionally `publisher: LinkedIn`, and leave the body empty. It shows up in the
list and links straight to that site.

The topics and their one-line descriptions live in `src/lib/site.ts`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes the site on every push to `master`.
One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
