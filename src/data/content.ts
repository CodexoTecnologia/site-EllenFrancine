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
    description: 'Para quem ama um detalhe delicado no dia a dia.',
    note: 'Uma referência de estilo para começar a conversa.',
    curve: 1,
  },
  {
    id: 'definido',
    number: '02',
    name: 'Definição elegante',
    description: 'Um pouco mais de destaque, sem deixar a delicadeza de lado.',
    note: 'O resultado desejado será conversado com a Ellen.',
    curve: 2,
  },
  {
    id: 'marcante',
    number: '03',
    name: 'Presença marcante',
    description: 'Seu olhar em destaque, do jeitinho que você gosta.',
    note: 'Técnica e disponibilidade são confirmadas no atendimento.',
    curve: 3,
  },
] as const;

export const faq = [
  {
    question: 'Dói colocar extensão de cílios?',
    answer:
      'A aplicação não deve doer. Se sentir ardor, pontadas ou qualquer desconforto, me avise na hora para interrompermos. Pode me avisar sem receio, combinado?',
  },
  {
    question: 'Quero algo bem natural. Dá para fazer?',
    answer:
      'A extensão de cílios não precisa ter um efeito supermarcado. Me conta o que você gosta e, se tiver, traz uma foto de inspiração. Vamos conversar sobre as opções disponíveis e o que faz sentido para os seus fios.',
  },
  {
    question: 'Quanto tempo a extensão de cílios dura?',
    answer:
      'Não existe um prazo igual para todo mundo. Os fios naturais se renovam, e a retenção também varia com a aplicação e os cuidados no dia a dia. Por isso, a manutenção faz parte da conversa antes de começar.',
  },
  {
    question: 'Preciso fazer manutenção?',
    answer:
      'Com a renovação dos cílios naturais, o efeito vai mudando e podem aparecer espaços. Para manter o visual, pode ser necessário fazer manutenção. O intervalo e a possibilidade de reposição dependem de como os fios estão; a gente conversa sobre isso no atendimento.',
  },
  {
    question: 'Posso lavar o rosto e molhar os cílios?',
    answer:
      'A higiene faz parte dos cuidados, sim! O momento de molhar após a aplicação e os produtos indicados dependem do adesivo usado. Peça essas orientações no atendimento e evite esfregar ou puxar os fios.',
  },
  {
    question: 'A extensão estraga os meus cílios naturais?',
    answer:
      'As extensões exigem cuidado: peso inadequado, tração e remoção incorreta podem danificar os fios. Não puxe nem tente tirar sozinha. Se quiser remover ou perceber algo diferente, me chama para conversar sobre o próximo passo.',
  },
  {
    question: 'Tenho olhos sensíveis ou alergia. Posso colocar?',
    answer:
      'Me conta isso antes de agendar, inclusive se já teve reação a alguma cola ou cosmético. Os adesivos podem causar irritação e alergia. Se seus olhos estiverem irritados ou você tiver alguma condição ocular, converse com seu oftalmologista antes de fazer a extensão.',
  },
  {
    question: 'Quanto tempo preciso separar para a aplicação?',
    answer:
      'Separe um momento sem correria. O tempo varia conforme a aplicação e, no treinamento, pode ser maior. Eu te conto a previsão antes de marcarmos, para você conseguir se organizar com calma.',
  },
  {
    question: 'Onde você atende?',
    answer: `Estou em ${site.neighborhood}, ${site.city} (${site.state}). Se você procura uma Lash Designer por aqui, me chama ${site.contactInstruction}. Te passo o endereço e a gente combina os detalhes antes da sua visita.`,
  },
  {
    question: site.recruitmentActive ? 'Como participar como modelo?' : 'Há vagas para modelos?',
    answer: site.recruitmentActive
      ? `Vou adorar ter você nesse começo! Me chama ${site.contactInstruction} e eu te explico as condições do treinamento, os valores e os horários disponíveis. Você pode tirar suas dúvidas antes de decidir.`
      : `No momento, não estou com campanha de modelos aberta. Mas pode me chamar ${site.contactInstruction} para conversar sobre o atendimento.`,
  },
  {
    question: 'Como vejo os valores e marco meu horário?',
    answer: `Me chama ${site.contactInstruction} e me conta o que você está buscando. Eu te passo as opções disponíveis, os valores e a previsão de duração. Seu horário fica combinado quando a gente confirmar tudo na conversa.`,
  },
] as const;
