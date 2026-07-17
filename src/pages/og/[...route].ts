import { OGImageRoute } from 'astro-og-canvas';
import { getServices, getGuides } from '@lib/content';
import { site } from '@config/site';

/**
 * OG images 1200×630 generadas en build (PLAN §7.4): foto de marca + título.
 * Ruta resultante: /og/<route>.png — referenciada desde `ogImage` en las páginas.
 */
const services = await getServices('es');
const guides = await getGuides('es');

const pages: Record<string, { title: string; description: string }> = {
  default: { title: site.brand, description: site.brandLong },
};
for (const s of services) {
  pages[`servicios/${s.data.slug}`] = {
    title: s.data.title,
    description: 'Constanza Acevedo · Barcelona',
  };
}
for (const g of guides) {
  pages[`guias/${g.data.slug}`] = {
    title: g.data.title,
    description: 'Guía · Constanza Acevedo · Barcelona',
  };
}

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [63, 100, 70],
      [43, 66, 48],
    ],
    padding: 80,
    font: {
      title: { color: [255, 253, 250], size: 64, weight: 'Bold', lineHeight: 1.1 },
      description: { color: [220, 233, 221], size: 30 },
    },
    // Fuentes vendorizadas en el repo → build self-contained y portable (sin red).
    fonts: [
      './src/assets/og-fonts/LiberationSans-Regular.ttf',
      './src/assets/og-fonts/LiberationSans-Bold.ttf',
    ],
  }),
});
