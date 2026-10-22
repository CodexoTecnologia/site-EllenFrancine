const instagram = import.meta.env.PUBLIC_INSTAGRAM?.trim() || 'https://www.instagram.com/ellenfrancine.lash/';
const whatsapp = import.meta.env.PUBLIC_WHATSAPP?.replace(/\D/g, '') || null;
const domain = import.meta.env.PUBLIC_SITE_URL?.trim() || null;

export const site = {
  name: 'Ellen Francine',
  role: 'Lash Designer',
  tagline: 'Realce o que te faz única.',
  description: 'Extensão de cílios com Ellen Francine em Roça Grande, Colombo. Conheça esse novo começo e converse pelo Instagram sobre atendimento e modelos para treinamento.',
  city: import.meta.env.PUBLIC_CITY?.trim() || 'Colombo',
  neighborhood: import.meta.env.PUBLIC_NEIGHBORHOOD?.trim() || 'Roça Grande',
  state: 'PR',
  instagram,
  instagramHandle: '@ellenfrancine.lash',
  whatsapp,
  contactUrl: whatsapp ? `https://wa.me/${whatsapp}` : instagram,
  contactLabel: whatsapp ? 'Conversar no WhatsApp' : 'Conversar no Instagram',
  domain,
  preview: import.meta.env.PUBLIC_SITE_MODE !== 'production',
  launchPost: 'https://www.instagram.com/p/DewcYglnH-F/',
  launchDate: '2026-10-21',
  recruitmentActive: true,
} as const;

export const navigation = [
  { href: '/', label: 'Início' },
  { href: '/servicos/', label: 'O atendimento' },
  { href: '/resultados/', label: 'Galeria' },
  { href: '/sobre/', label: 'A Ellen' },
] as const;

export const locationLabel = `${site.neighborhood} · ${site.city}, ${site.state}`;
