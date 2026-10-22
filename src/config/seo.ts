import { site } from './site';
import { gallery } from '../data/content';

export const pageDetails: Record<string, { name: string; type: string }> = {
  '/': { name: 'Início', type: 'WebPage' },
  '/servicos/': { name: 'O atendimento', type: 'WebPage' },
  '/resultados/': { name: 'Galeria', type: 'CollectionPage' },
  '/sobre/': { name: 'A Ellen', type: 'AboutPage' },
  '/contato/': { name: 'Contato', type: 'ContactPage' },
  '/privacidade/': { name: 'Privacidade', type: 'WebPage' },
};

export function buildSeoGraph(path: string, title: string, description: string, origin?: string) {
  const url = (value: string) => (origin ? new URL(value, origin).href : value);
  const businessId = url('/#negocio');
  const websiteId = url('/#site');
  const personId = url('/#ellen');
  const pageId = url(`${path}#pagina`);
  const hasPublicAddress = Boolean(site.streetAddress && site.postalCode);
  const area = {
    '@type': 'City',
    name: site.city,
    containedInPlace: { '@type': 'State', name: 'Paraná' },
  };
  const graph: Record<string, unknown>[] = [
    {
      '@type': hasPublicAddress ? 'BeautySalon' : 'Organization',
      '@id': businessId,
      name: site.name,
      description: site.description,
      url: origin ? url('/') : undefined,
      logo: {
        '@type': 'ImageObject',
        url: url('/brand/ellen-francine-original.jpg'),
        width: 1254,
        height: 1254,
      },
      telephone: site.telephone,
      sameAs: [site.instagram],
      areaServed: area,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.telephone,
        contactType: 'agendamento e dúvidas',
        availableLanguage: 'pt-BR',
        url: site.contactUrl,
      },
      ...(hasPublicAddress
        ? {
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.streetAddress,
              postalCode: site.postalCode,
              addressLocality: site.city,
              addressRegion: site.state,
              addressCountry: 'BR',
            },
          }
        : {}),
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      jobTitle: site.role,
      worksFor: { '@id': businessId },
      sameAs: [site.instagram],
      url: origin ? url('/sobre/') : undefined,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.name,
      url: origin ? url('/') : undefined,
      inLanguage: 'pt-BR',
      publisher: { '@id': businessId },
    },
    {
      '@type': pageDetails[path]?.type || 'WebPage',
      '@id': pageId,
      name: title,
      description,
      url: origin ? url(path) : undefined,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': websiteId },
      about: { '@id': path === '/sobre/' ? personId : businessId },
      ...(origin && path !== '/' ? { breadcrumb: { '@id': url(`${path}#caminho`) } } : {}),
    },
  ];
  if (origin && path !== '/' && pageDetails[path])
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url(`${path}#caminho`),
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: url('/') },
        { '@type': 'ListItem', position: 2, name: pageDetails[path].name, item: url(path) },
      ],
    });
  if (path === '/servicos/')
    graph.push({
      '@type': 'Service',
      '@id': url('/servicos/#extensao-de-cilios'),
      name: 'Extensão de cílios',
      serviceType: 'Extensão de cílios',
      description:
        'Atendimento de extensão de cílios. Técnica disponível, investimento, duração e condições são confirmados diretamente com a Ellen.',
      provider: { '@id': businessId },
      areaServed: area,
      url: origin ? url(path) : undefined,
    });
  if (path === '/resultados/')
    graph.push({
      '@type': 'ImageGallery',
      '@id': url('/resultados/#ensaio'),
      name: 'Ensaio de lançamento',
      isPartOf: { '@id': pageId },
      image: gallery.map((item) => ({
        '@type': 'ImageObject',
        contentUrl: url(item.image.src),
        caption: item.alt,
        width: item.image.width,
        height: item.image.height,
        creditText: site.instagramHandle,
        isBasedOn: site.launchPost,
      })),
    });
  return { '@context': 'https://schema.org', '@graph': graph };
}

export const serializeSchema = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
