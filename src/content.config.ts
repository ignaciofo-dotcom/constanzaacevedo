import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections (PLAN §4, §10.2.1). Todo el contenido migrable a CMS/BD
 * sin tocar componentes. Cada servicio tiene una `serviceKey` estable e
 * independiente del idioma — en Fase 2 citas y BD referencian esas claves,
 * no los slugs.
 *
 * Convención de idioma: un fichero por idioma con sufijo `.{lang}.md`
 * (p. ej. `fisio-pediatrica.es.md`). El campo `lang` + `serviceKey` los agrupa.
 */

const langField = z.enum(['es', 'ca', 'en']);

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    // Clave estable e independiente del idioma (Fase 2 la referencia).
    serviceKey: z.enum([
      'fisio-pediatrica',
      'fisio-respiratoria',
      'acupuntura-mujer',
      'acupuntura-fertilidad-embarazo',
      'acupuntura-menopausia',
      'masaje-infantil',
      'domicilios',
    ]),
    lang: langField,
    slug: z.string(), // slug traducido, sin prefijo de idioma
    title: z.string(), // H1
    metaTitle: z.string().max(65),
    metaDescription: z.string().max(160),
    summary: z.string(), // para tarjetas del hub y home
    audience: z.enum(['child', 'woman']), // rama "Para tu peque" / "Para ti"
    icon: z.string().default('leaf'),
    order: z.number().default(0),
    parent: z.enum(['acupuntura-mujer']).optional(), // relación madre→hija (§6.6)
    heroImage: z.string().optional(), // [INPUT] ruta a foto real
    heroImageAlt: z.string().optional(),
    // CTA de WhatsApp con mensaje precargado contextual (§6)
    whatsappMessage: z.string(),
    ctaLabel: z.string().optional(),
    faqs: z.array(faqItem).default([]),
    featuredOnHome: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    lang: langField,
    slug: z.string(),
    title: z.string(),
    metaTitle: z.string().max(65),
    metaDescription: z.string().max(160),
    summary: z.string(),
    audience: z.enum(['child', 'woman']),
    updatedDate: z.coerce.date(),
    seasonal: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    relatedService: z.string().optional(), // serviceKey relacionada
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    faqs: z.array(faqItem).default([]),
    whatsappMessage: z.string(),
    draft: z.boolean().default(false),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/faqs' }),
  schema: z.object({
    lang: langField,
    items: z.array(faqItem),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    // JAMÁS inventar. Reseñas reales de GBP/Doctoralia con permiso (§6.1, §14.5).
    lang: langField,
    items: z.array(
      z.object({
        text: z.string(),
        author: z.string(), // nombre + inicial
        audience: z.enum(['child', 'woman']),
        source: z.string().optional(), // GBP / Doctoralia
      })
    ),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/locations' }),
  schema: z.object({
    // El footer, /contacto y el schema LocalBusiness se generan desde aquí.
    key: z.string(), // clave estable (Fase 2: citas referencian ubicación)
    type: z.enum(['clinic', 'home-visits']),
    name: z.string(),
    street: z.string().optional(),
    postalCode: z.string().optional(),
    locality: z.string().optional(),
    region: z.string().optional(),
    geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
    mapUrl: z.string().optional(),
    areaServed: z.string(),
    primary: z.boolean().default(false),
  }),
});

export const collections = { services, guides, faqs, testimonials, locations };
