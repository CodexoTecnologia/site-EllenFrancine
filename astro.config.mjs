// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const production = process.env.PUBLIC_SITE_MODE === 'production';
const site = process.env.PUBLIC_SITE_URL?.trim() || undefined;
if (production && !site)
  throw new Error('Configure PUBLIC_SITE_URL antes de habilitar a indexação.');
if (site && new URL(site).protocol !== 'https:')
  throw new Error('PUBLIC_SITE_URL precisa usar HTTPS.');

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: production && site ? [sitemap()] : [],
  image: { responsiveStyles: true, layout: 'constrained' },
  build: { inlineStylesheets: 'auto' },
  vite: { build: { sourcemap: false } },
});
