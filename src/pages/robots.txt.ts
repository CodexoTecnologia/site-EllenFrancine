import type { APIRoute } from 'astro';
import { site } from '../config/site';
export const GET: APIRoute = () => new Response(
  site.preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n${site.domain ? `Sitemap: ${site.domain.replace(/\/$/,'')}/sitemap-index.xml\n` : ''}`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
