/**
 * Fuente de verdad de datos (PLAN §3).
 * NAP idéntico en web, GBP, Doctoralia y redes. No variar ni una coma.
 * Un solo punto de cambio cuando lleguen las integraciones de Fase 2.
 */

export const site = {
  brand: 'Constanza Acevedo',
  brandLong: 'Constanza Acevedo · Fisioterapia pediátrica y bienestar familiar',
  person: {
    name: 'Constanza Acevedo',
    shortName: 'Coty',
    jobTitle: 'Fisioterapeuta y acupuntora',
    // Colegiada nº — Col·legi de Fisioterapeutes de Catalunya
    collegiateNumber: '18641',
    acupunctureNumber: '435',
  },

  // Name-Address-Phone (NAP)
  nap: {
    legalName: 'Constanza Acevedo',
    // [INPUT: NIF del titular para aviso legal LSSI]
    taxId: '[INPUT: NIF]',
    location: 'Centro Llevadonas',
    address: {
      street: 'C. de la Independència 371, Baixos',
      postalCode: '08026',
      locality: 'Barcelona',
      region: 'Barcelona',
      country: 'ES',
      neighbourhood: "Camp de l'Arpa · Sant Martí",
    },
    // [INPUT: verificar coordenadas exactas en Google Maps]
    geo: { lat: 41.4116, lng: 2.1855 },
    // [INPUT: enlace de Google Maps del centro]
    mapUrl: 'https://maps.google.com/?q=Independència+371+Barcelona',
  },

  contact: {
    // ⚠️ [INPUT ★: confirmar número único de WhatsApp — 647 137 693 vs 663 013 050]
    whatsapp: {
      // formato internacional sin signos, para wa.me
      number: '34647137693',
      display: '+34 647 137 693',
    },
    phone: {
      number: '34647137693',
      display: '+34 647 137 693',
    },
    centerPhone: {
      number: '34934507931',
      display: '+34 93 450 79 31',
    },
    email: 'contacto@constanzaacevedo.es',
    centerEmail: 'info@llevadonas.es',
  },

  hours: {
    // openingHoursSpecification para schema
    spec: [
      { days: ['Monday'], opens: '16:00', closes: '20:30' },
      { days: ['Friday'], opens: '10:00', closes: '13:00' },
    ],
  },

  priceRange: '€€',

  metrics: {
    yearsExperience: 15,
    // [INPUT: confirmar cifra — +5.000 h clínicas vs +2.500]
    clinicalHours: 5000,
    // [INPUT: nº aproximado de familias atendidas]
    families: null as number | null,
  },
} as const;

export type Site = typeof site;
