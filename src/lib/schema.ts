import { site } from '@config/site';
import { socialSameAs } from '@config/social';
import { localeTag, type Lang } from '@i18n/config';

/**
 * JSON-LD builders (PLAN §7.3). Physiotherapy (subtipo MedicalBusiness) +
 * Person, más nodos por página: Service, FAQPage, BreadcrumbList, WebSite.
 * Se emiten como un único @graph por página.
 */

const dayMap: Record<string, string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

const ORG_ID = `${site.brand}#business`;
const PERSON_ID = `${site.brand}#person`;

export function businessNode(siteUrl: string) {
  return {
    '@type': ['Physiotherapy', 'MedicalBusiness', 'LocalBusiness'],
    '@id': ORG_ID,
    name: site.brand,
    description: site.brandLong,
    url: siteUrl,
    telephone: `+${site.contact.phone.number}`,
    email: site.contact.email,
    priceRange: site.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.nap.location}, ${site.nap.address.street}`,
      postalCode: site.nap.address.postalCode,
      addressLocality: site.nap.address.locality,
      addressRegion: site.nap.address.region,
      addressCountry: site.nap.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.nap.geo.lat,
      longitude: site.nap.geo.lng,
    },
    hasMap: site.nap.mapUrl,
    areaServed: { '@type': 'City', name: 'Barcelona' },
    openingHoursSpecification: site.hours.spec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days.map((d) => dayMap[d]),
      opens: s.opens,
      closes: s.closes,
    })),
    sameAs: socialSameAs(),
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
  };
}

export function personNode(siteUrl: string) {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.person.name,
    jobTitle: site.person.jobTitle,
    worksFor: { '@id': ORG_ID },
    memberOf: {
      '@type': 'Organization',
      name: 'Col·legi de Fisioterapeutes de Catalunya',
    },
    identifier: `Col. ${site.person.collegiateNumber}`,
    knowsAbout: [
      'Fisioterapia pediátrica',
      'Fisioterapia respiratoria infantil',
      'Acupuntura',
      'Medicina Tradicional China',
      'Fertilidad',
      'Embarazo',
      'Menopausia',
    ],
    url: `${siteUrl}/quien-soy`,
  };
}

export function websiteNode(siteUrl: string, lang: Lang) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: site.brand,
    inLanguage: localeTag[lang],
    publisher: { '@id': ORG_ID },
  };
}

export function serviceNode(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@type': 'MedicalTherapy',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: 'Barcelona' },
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
