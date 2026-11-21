import { getCollection, type CollectionEntry } from 'astro:content';

export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getCspPosts() {
  const all = await getCollection('csp');
  return all.sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export async function getWork() {
  const all = await getCollection('work');
  const key = (e: CollectionEntry<'work'>) => e.data.start ?? '9999';
  return all.sort((a, b) => key(b).localeCompare(key(a)));
}

/** Blogger's 72px square thumbnails can be requested at any size by rewriting the size segment. */
export const cspThumb = (url?: string, size = 600) => url?.replace(/\/s72-c\//, `/s${size}-c/`).replace(/^http:/, 'https:');
