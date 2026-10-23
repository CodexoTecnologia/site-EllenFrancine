import photo1 from '../assets/modelo-instagram-01.webp';
import photo2 from '../assets/modelo-instagram-02.webp';
import photo3 from '../assets/modelo-instagram-03.webp';
import photo4 from '../assets/modelo-instagram-04.webp';
import photo5 from '../assets/modelo-instagram-05.webp';
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
  {
    image: photo4,
    alt: 'Close do olho aberto e dos cílios da modelo, na quarta imagem da publicação da Ellen Francine.',
    title: 'Um olhar de presença.',
    detail: 'O contorno dos cílios em primeiro plano.',
    position: '50% 42%',
  },
  {
    image: photo5,
    alt: 'Modelo sorrindo, com o rosto de lado e os olhos abertos, na quinta imagem da publicação da Ellen Francine.',
    title: 'Beleza que se expressa.',
    detail: 'Outro retrato da publicação de lançamento.',
    position: '50% 45%',
  },
] as const;

export const styles = [
  {
    id: 'leve',
    number: '01',
    name: 'Leve & natural',
    description: 'Um realce suave para o dia a dia.',
    note: 'Uma referência de estilo para começar a conversa.',
    curve: 1,
  },
  {
    id: 'definido',
    number: '02',
    name: 'Definição elegante',
    description: 'Mais definição no contorno do olhar.',
    note: 'O resultado desejado será conversado com a Ellen.',
    curve: 2,
  },
  {
    id: 'marcante',
    number: '03',
    name: 'Presença marcante',
    description: 'Para quem gosta de um olhar com mais presença.',
    note: 'Técnica e disponibilidade são confirmadas no atendimento.',
    curve: 3,
  },
] as const;

export const faq = [
  {
    question: 'Onde a Ellen atende?',
    answer: `A Ellen atende extensão de cílios em ${site.neighborhood}, ${site.city} (${site.state}). Confirme o endereço ${site.contactInstruction} antes do horário.`,
  },
  {
    question: site.recruitmentActive ? 'Como participar como modelo?' : 'Há vagas para modelos?',
    answer: site.recruitmentActive
      ? `Fale ${site.contactInstruction} para saber as condições e a disponibilidade para treinamento em extensão de cílios.`
      : `Não há campanha de modelos aberta. Consulte a Ellen sobre atendimento ${site.contactInstruction}.`,
  },
  {
    question: 'Como agendar um horário?',
    answer: `Fale com a Ellen ${site.contactInstruction}. O horário é confirmado na conversa.`,
  },
  {
    question: 'Quais são as técnicas, os valores e a duração?',
    answer: `A Ellen informa as técnicas disponíveis, os valores e o tempo de atendimento ${site.contactInstruction}, antes de agendar.`,
  },
] as const;
