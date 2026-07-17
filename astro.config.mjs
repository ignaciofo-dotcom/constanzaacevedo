import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const src = (p) => fileURLToPath(new URL(`./src/${p}`, import.meta.url));

// Provisional preview URL. Swap for https://constanzaacevedo.es at deploy time.
const SITE = process.env.SITE_URL ?? 'https://constanzaacevedo.es';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          ca: 'ca-ES',
          en: 'en',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': src('components'),
        '@layouts': src('layouts'),
        '@config': src('config'),
        '@i18n': src('i18n'),
        '@lib': src('lib'),
        '@': src(''),
      },
    },
  },
});
