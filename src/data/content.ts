import photo1 from '../assets/modelo-instagram-01.webp';
import photo2 from '../assets/modelo-instagram-02.webp';
import photo3 from '../assets/modelo-instagram-03.webp';
import { site } from '../config/site';

export const gallery = [
  {
    image: photo1,
    alt: 'Modelo com os olhos abertos, em fotografia da publicação de lançamento da Ellen Francine.',
    title: 'O olhar, por inteiro.',
    detail: 'Um retrato desse novo começo.',
    position: '50% 40%',
  },
  {
    image: photo2,
    alt: 'Outro enquadramento do rosto e dos cílios da modelo, publicado no Instagram da Ellen.',
    title: 'Beleza nos detalhes.',
    detail: 'Outro ângulo, a mesma expressão.',
    position: '42% 40%',
  },
  {
    image: photo3,
    alt: 'Detalhe dos cílios e do olho em imagem publicada no perfil profissional da Ellen Francine.',
    title: 'De perto, cada detalhe.',
    detail: 'Um olhar mais próximo para os cílios.',
    position: '50% 45%',
  },
] as const;

export const styles = [
  {
    id: 'leve',
    number: '01',
    name: 'Leve & natural',
    description: 'Para quem se identifica com um olhar delicado e uma presença mais sutil.',
    note: 'Uma referência de estilo para começar a conversa.',
    curve: 1,
  },
  {
    id: 'definido',
    number: '02',
    name: 'Definição elegante',
    description: 'Para quem gosta de realçar o contorno do olhar com um pouco mais de expressão.',
    note: 'O resultado desejado será conversado com a Ellen.',
    curve: 2,
  },
  {
    id: 'marcante',
    number: '03',
    name: 'Presença marcante',
    description: 'Para quem ama um olhar que aparece e faz parte da sua identidade.',
    note: 'Técnica e disponibilidade são confirmadas no atendimento.',
    curve: 3,
  },
] as const;

export const faq = [
  {
    question: 'Onde a Ellen atende?',
    answer: `Em ${site.neighborhood}, ${site.city}, ${site.state}. Fale ${site.contactInstruction} para confirmar o endereço e combinar o seu atendimento.`,
  },
  {
    question: site.recruitmentActive
      ? 'Como faço para ser modelo de treinamento?'
      : 'Há vagas para modelos?',
    answer: site.recruitmentActive
      ? `A Ellen divulgou um convite para modelos de treinamento. Fale ${site.contactInstruction} para confirmar a disponibilidade, as condições, o tempo e o investimento antes de combinar o horário.`
      : `Não há uma campanha de modelos aberta neste site. Fale ${site.contactInstruction} para conhecer as possibilidades de atendimento.`,
  },
  {
    question: 'Como agendar um horário?',
    answer: `O primeiro contato é ${site.contactInstruction}. Combine o atendimento e aguarde a confirmação do horário com a Ellen. O site não faz reservas automáticas.`,
  },
  {
    question: 'Quais são as técnicas, os valores e a duração?',
    answer:
      'Esses detalhes são informados diretamente pela Ellen. Na conversa, você pode tirar dúvidas sobre a técnica disponível, o tempo necessário, o investimento e a manutenção.',
  },
] as const;
