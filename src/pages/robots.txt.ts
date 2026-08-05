import type { APIRoute } from 'astro';
import { allowIndexing } from '@config/env';

/**
 * robots.txt coherente con la política de indexación (§config/env.ts):
 * solo el despliegue del dominio real permite rastreo. Desarrollo y previews
 * bloquean todo para no competir con constanzaacevedo.es.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://constanzaacevedo.es').href;

  const body = allowIndexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `# Entorno no productivo: rastreo bloqueado a propósito.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
