import { defineCollection } from 'astro:content';
import { glob, type Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { readdir, readFile } from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';
import { BLOG_TOPICS } from './lib/site';

/** Projects: long-form write-ups, each served at its own legacy permalink (e.g. /electricLongboard/). */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    slug: z.string(),
    summary: z.string(),
    thumbnail: image().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Blog: articles on ideologies, operating principles and commentary.
 * Posts written here are served at /blog/<file-name>/. Setting `link` instead lists an
 * article published elsewhere: it links straight out and gets no page on this site.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    topics: z.array(z.enum(BLOG_TOPICS)).min(1),
    /** One or two sentences shown in the article list and in link previews. */
    summary: z.string(),
    /** The quote the essay is built around, shown at the top of the article and in the list. */
    quote: z
      .object({
        text: z.string(),
        author: z.string(),
        /** Book, talk, interview… */
        source: z.string().optional(),
        /** Link to the original source. */
        url: z.url().optional(),
      })
      .optional(),
    /** Name of the series this essay belongs to, e.g. "Quotes I Live By". */
    series: z.string().optional(),
    /** Closing acknowledgement, e.g. "Tiago Atwi for reading drafts of this." */
    thanks: z.string().optional(),
    /** URL of an article published somewhere else (Medium, LinkedIn, a newspaper…). */
    link: z.url().optional(),
    /** Where the external article was published, e.g. "LinkedIn". */
    publisher: z.string().optional(),
    updated: z.coerce.date().optional(),
    /** Drafts are visible in `npm run dev` but are not published. */
    draft: z.boolean().default(false),
  }),
});

/** Work & education history. The file name doubles as the in-page #anchor. */
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) => z.object({
    kind: z.enum(['work', 'education']),
    org: z.string(),
    orgUrl: z.url().optional(),
    role: z.string().optional(),
    logo: z.string().optional(),
    /** YYYY-MM, used for ordering only. Entries without it sort first (current roles). */
    start: z.string().optional(),
    period: z.string(),
    blurb: z.string().optional(),
    skills: z.array(z.string()).default([]),
    /** Short bullet points. May contain simple inline HTML such as links. */
    highlights: z.array(z.string()).default([]),
    photos: z.array(z.object({ src: image(), href: z.string().optional() })).default([]),
  }),
});

/** Personal collection pages (books, quotes, words, 3D printing…). */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    toc: z.boolean().default(false),
  }),
});

/**
 * China Summer Program (2017) posts were exported from Blogger as raw HTML.
 * The glob loader only understands Markdown, so this tiny loader reads the
 * front matter itself and stores the (lightly cleaned) HTML as rendered content.
 */
function bloggerHtmlLoader(base: string): Loader {
  return {
    name: 'blogger-html',
    async load({ store, parseData, generateDigest, config, watcher, logger }) {
      const dir = new URL(base, config.root);
      const sync = async () => {
        store.clear();
        const files = (await readdir(dir)).filter((f) => f.endsWith('.html'));
        for (const file of files) {
          const raw = await readFile(new URL(file, dir), 'utf8');
          const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
          if (!match) {
            logger.warn(`Skipping ${file}: no front matter`);
            continue;
          }
          const fm = parseYaml(match[1]) ?? {};
          const body = match[2];
          const id = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.html$/, '');
          const data = await parseData({
            id,
            data: { title: fm.title, date: fm.date, thumbnail: fm.thumbnail, originalUrl: fm.blogger_orig_url },
          });
          store.set({
            id,
            data,
            body,
            filePath: `${base}${file}`,
            rendered: { html: cleanBloggerHtml(body) },
            digest: generateDigest(raw),
          });
        }
      };
      await sync();
      watcher?.on('change', (path) => {
        if (path.includes(base.replace(/^\.\//, ''))) sync();
      });
    },
  };
}

function cleanBloggerHtml(html: string) {
  return html
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+(imageanchor|border|data-original-height|data-original-width)="[^"]*"/g, '')
    .replace(/http:\/\/(\d\.bp\.blogspot\.com)/g, 'https://$1')
    .replace(/<img /g, '<img loading="lazy" decoding="async" ')
    .replace(/(<img[^>]+src="[^"]+)\/s(640|400|320)\//g, '$1/s1200/');
}

const csp = defineCollection({
  loader: bloggerHtmlLoader('./src/content/csp/'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    thumbnail: z.string().optional(),
    originalUrl: z.string().optional(),
  }),
});

export const collections = { projects, work, pages, csp, blog };
