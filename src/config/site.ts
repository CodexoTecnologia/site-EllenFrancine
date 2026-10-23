const instagram =
  import.meta.env.PUBLIC_INSTAGRAM?.trim() || 'https://www.instagram.com/ellenfrancine.lash/';
const whatsapp = import.meta.env.PUBLIC_WHATSAPP?.replace(/\D/g, '') || '5541999179039';
const domain = import.meta.env.PUBLIC_SITE_URL?.trim() || null;
const recruitmentActive = import.meta.env.PUBLIC_RECRUITMENT_ACTIVE !== 'false';
const contactChannel = whatsapp ? 'WhatsApp' : 'Instagram';
const contactInstruction = whatsapp ? 'pelo WhatsApp' : 'pelo direct do Instagram';

export const site = {
  name: 'Ellen Francine',
  role: 'Lash Designer',
  tagline: 'Realce o que te faz única.',
  description: `Extensão de cílios com Ellen Francine em Roça Grande, Colombo. Converse ${contactInstruction} sobre atendimento${recruitmentActive ? ' e modelos para treinamento' : ''}.`,
  city: import.meta.env.PUBLIC_CITY?.trim() || 'Colombo',
  neighborhood: import.meta.env.PUBLIC_NEIGHBORHOOD?.trim() || 'Roça Grande',
  state: 'PR',
  instagram,
  instagramHandle: '@ellenfrancine.lash',
  whatsapp,
  telephone: `+${whatsapp}`,
  phoneLabel: whatsapp.replace(/^(55)(\d{2})(\d{5})(\d{4})$/, '+$1 ($2) $3-$4'),
  contactUrl: whatsapp ? `https://wa.me/${whatsapp}` : instagram,
  contactLabel: `Conversar no ${contactChannel}`,
  contactChannel,
  contactInstruction,
  primaryCta: 'Falar com a Ellen',
  domain,
  preview: import.meta.env.PUBLIC_SITE_MODE !== 'production',
  streetAddress: import.meta.env.PUBLIC_STREET_ADDRESS?.trim() || null,
  postalCode: import.meta.env.PUBLIC_POSTAL_CODE?.replace(/\D/g, '') || null,
  launchPost: 'https://www.instagram.com/p/DewcYglnH-F/',
  launchDate: '2026-10-21',
  recruitmentActive,
} as const;

export const navigation = [
  { href: '/', label: 'Início' },
  { href: '/servicos/', label: 'O atendimento' },
  { href: '/resultados/', label: 'Galeria' },
  { href: '/sobre/', label: 'A Ellen' },
] as const;

export const locationLabel = `${site.neighborhood} · ${site.city}, ${site.state}`;

export const styleMessage = (name: string) =>
  `Olá, Ellen! Gostei do estilo ${name.toLocaleLowerCase('pt-BR')}. Quero saber sobre o atendimento.`;
export function contactWithMessage(message: string) {
  const url = new URL(site.contactUrl);
  if (site.whatsapp) url.searchParams.set('text', message);
  return url.href;
}
