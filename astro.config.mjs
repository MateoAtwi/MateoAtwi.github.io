// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mateoatwi.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/anna'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'monokai',
      wrap: false,
    },
  },
});
