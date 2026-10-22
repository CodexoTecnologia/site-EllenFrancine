// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const production = process.env.PUBLIC_SITE_MODE === 'production';
const site = process.env.PUBLIC_SITE_URL?.trim() || undefined;
if (production && !site)
  throw new Error('Configure PUBLIC_SITE_URL antes de habilitar a indexação.');
if (site) {
  const origin = new URL(site);
  if (
    origin.protocol !== 'https:' ||
    origin.username ||
    origin.password ||
    origin.search ||
    origin.hash ||
    origin.pathname !== '/'
  )
    throw new Error(
      'PUBLIC_SITE_URL precisa ser uma origem HTTPS, sem caminho, credenciais ou parâmetros.',
    );
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations:
    production && site
      ? [sitemap({ filter: (page) => !page.endsWith('/404/') && !page.endsWith('/404.html') })]
      : [],
  image: { responsiveStyles: true, layout: 'constrained' },
  build: { inlineStylesheets: 'auto' },
  vite: { build: { sourcemap: false } },
});
