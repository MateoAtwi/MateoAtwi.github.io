import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../lib/site';
import { getCspPosts, getProjects } from '../lib/content';
import { excerpt, plainText } from '../lib/format';

export async function GET(context: APIContext) {
  const projects = await getProjects();
  const csp = await getCspPosts();
  const items = [
    ...projects.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: plainText(p.data.summary),
      link: `/${p.data.slug}/`,
      categories: ['Projects'],
    })),
    ...csp.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: excerpt(p.body ?? '', 60),
      link: `/csp/${p.id}/`,
      categories: ['China Summer Program'],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
  });
}
