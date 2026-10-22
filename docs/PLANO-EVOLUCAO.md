# Plano de evolução — Ellen Francine

22/10/2026. Planejamento baseado no código, no conteúdo disponível e na inspeção da prévia local. Nenhuma alteração de interface ou publicação faz parte desta revisão.

## Direção

Transformar a apresentação de lançamento em uma experiência de marca que ajude a visitante a entender o atendimento e iniciar uma conversa. Preservar Lora 600, Manrope e a paleta preto, rosé, marfim e vinho. Usar o gesto de uma curva de cílios como assinatura gráfica recorrente, com composição e movimento próprios.

O estágio profissional precisa continuar transparente. Não há informação suficiente para afirmar técnicas, valores, formação, tempo de procedimento, disponibilidade atual ou resultados comprovados.

## Diagnóstico

| Observação                                                                            | Consequência                                                    | Mudança proposta                                                                                          | Como verificar                                                                          |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| A home repete começo, sonho e nova história em várias seções.                         | A leitura avança pouco em informação útil.                      | Reduzir repetição e organizar a narrativa por decisão.                                                    | A visitante consegue explicar oferta, local e próximo passo depois da primeira leitura. |
| O CTA principal fala em ser modelo, mas os requisitos ficam no direct.                | A pessoa chega à conversa sem entender o compromisso.           | Exibir condições confirmadas em um bloco curto e manter convite transparente para treinamento.            | Testar com alguém que não conhece a Ellen.                                              |
| As três imagens vêm de uma única publicação, com enquadramentos relacionados.         | A galeria sugere variedade maior do que a evidência disponível. | Tratar como ensaio de lançamento; expandir apenas com trabalhos autorizados e identificados corretamente. | Conferir origem, legenda e autorização de cada mídia.                                   |
| A página sobre usa a logo como principal imagem.                                      | Falta presença pessoal para conhecer a profissional.            | Pedir retrato real da Ellen e fotografias do espaço/preparo, quando disponíveis.                          | A pessoa distingue claramente profissional, modelo e ilustração.                        |
| A escolha de estilos muda uma ilustração, mas não acompanha a conversa.               | A interação agrega inspiração, com pouca continuidade.          | Mostrar resumo da escolha e oferecer mensagem para copiar e levar ao direct.                              | Copiar funciona, tem feedback e alternativa manual.                                     |
| `recruitmentActive` existe, mas a oferta é escrita diretamente nas páginas.           | Encerrar a campanha pode deixar convites antigos no ar.         | Usar o estado central para home, FAQ, atendimento e metadados.                                            | Conferir as duas condições de recrutamento em build.                                    |
| `contactUrl` pode virar WhatsApp, enquanto alguns rótulos continuam Instagram/direct. | Ao configurar o telefone, texto e destino podem divergir.       | Centralizar canal, rótulo e texto de apoio; preservar o link independente para Instagram.                 | Conferir com e sem telefone configurado.                                                |

## Etapa 1 — clareza e contato

Prioridade alta. Pode começar com os dados atuais.

- Manter o título de marca e acrescentar uma frase objetiva: extensão de cílios em Roça Grande, Colombo; convite para modelos de treinamento enquanto estiver confirmado.
- Padronizar o CTA principal. Exemplo para campanha ativa: “Quero ser modelo”; apoio: “Fale com a Ellen pelo Instagram”. Não prometer reserva automática.
- Nova sequência da home: abertura → convite e condições → imagens → como funciona → estilos → Ellen → dúvidas e contato. A apresentação da marca entra nesses blocos, sem uma seção repetindo a promessa.
- Encurtar os textos e títulos auxiliares. Preservar a voz acolhedora, dando informação nova a cada seção.
- Levar o processo de três passos, já existente em atendimento, para a home de forma compacta.
- Testar uma ação fixa no mobile após o CTA inicial sair da tela. Reservar espaço, respeitar área segura e evitar cobrir conteúdo ou foco. Não exibir sobre o menu aberto.
- Separar o aviso editorial de revisão da decisão técnica de indexação. Remover o aviso somente quando a apresentação for aprovada; liberar SEO em uma etapa própria.
- Corrigir os estados centrais de campanha e canal descritos acima.

Depende da Ellen: confirmar se ainda busca modelos, requisitos, duração, investimento, técnicas disponíveis e política de confirmação. Informação ausente permanece ausente, sem texto especulativo.

## Etapa 2 — identidade e interação

Prioridade alta para apresentação; execução depois da estrutura de conteúdo.

- Composição editorial com uma foto principal forte, recortes intencionais e menos repetição de molduras, órbitas e estrelas. Usar a curva do olhar como motivo dominante.
- Preservar a tipografia já escolhida e revisar quebras manuais, largura de texto e ritmo de espaços em mobile e desktop.
- Melhorar a ilustração do explorador para que cada estilo se diferencie com clareza. Manter o rótulo de referência ilustrada.
- Acrescentar resumo e mensagem copiável ao explorador; não sugerir que a seleção define uma técnica ou resultado garantido.
- Abrir fotos em visualizador acessível com legenda e origem. Usar dialog nativo, controles de teclado, Escape e retorno do foco; navegação por links deve continuar útil sem JS.
- Priorizar retrato da Ellen, espaço e trabalhos autorizados. Um vídeo curto pode entrar com pôster e reprodução por escolha da pessoa, depois de avaliar peso e qualidade.

## Etapa 3 — movimento com assinatura

Manter Astro, CSS e GSAP/ScrollTrigger. A stack existente atende a proposta. Não há necessidade identificada de adicionar React, outra biblioteca de animação ou WebGL.

| Cena     | Intenção                                       | Implementação proposta                                                                              | Alternativa estática                      |
| -------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Abertura | Apresentar a assinatura visual da marca.       | Coordenar curva SVG, foto e detalhe gráfico em uma única sequência curta; título e CTA já visíveis. | Composição final disponível desde o HTML. |
| Estilos  | Tornar a mudança escolhida compreensível.      | Transição breve da ilustração e do estado selecionado.                                              | Troca imediata e rótulo textual.          |
| Galeria  | Dar continuidade entre miniatura e fotografia. | Abertura discreta do visualizador, sem mover os controles.                                          | Abrir diretamente sem efeito.             |
| Rotas    | Manter continuidade visual.                    | Avaliar View Transitions entre documentos com fallback; só adotar após revisar navegação e suporte. | Navegação normal por páginas.             |

Não adicionar rolagem sequestrada ou preloader. Evitar movimentos contínuos que disputem atenção com o agendamento. Respeitar a preferência do sistema e o controle manual já existente. Se houver ClientRouter no futuro, revisar inicialização/limpeza dos efeitos em cada troca de rota.

## Etapa 4 — publicação, busca e acompanhamento

- Publicar uma prévia acessível por link para a Ellen revisar; manter `noindex` até o domínio e o conteúdo serem aprovados.
- Definir hospedagem final e domínio, configurar HTTPS, redirects e páginas 404. Conferir a imagem de compartilhamento na URL publicada. O fallback atual da imagem social contempla Vercel; incluir a origem de prévia da Cloudflare se ela for usada sem domínio configurado.
- Configurar URL canônica, sitemap e indexação na publicação definitiva. Cadastrar o domínio no Search Console.
- Acrescentar dados estruturados adequados somente com as informações reais necessárias e visíveis no site. Não publicar endereço residencial sem decisão da Ellen.
- Ampliar conteúdo de atendimento e cuidados com orientação revisada pela profissional. Criar páginas de técnicas apenas quando existirem oferta e conteúdo próprios suficientes.
- Se houver interesse em medir conversas, definir ferramenta de analytics e privacidade antes de instalar. Medir cliques em contato e origem do tráfego; clique não equivale a agendamento confirmado.

## Validação antes da entrega

- Build/check e testes dos comportamentos afetados; formatter.
- QA em 320, 390, 768 e 1440 CSS px, além de celular físico quando disponível.
- Menu, seleção, visualizador, copiar mensagem, contatos, voltar/avançar, teclado e movimento reduzido.
- Conferir zoom, contraste, alvos, foco e nomes acessíveis. Usar leitura assistiva na verificação final.
- Diagnóstico de carregamento e animação na URL publicada. As medições anteriores não incluem Lighthouse ou dados reais de Core Web Vitals; não atribuir notas antecipadamente.
- Metas de campo: LCP até 2,5 s, INP até 200 ms e CLS até 0,1. Avaliar evolução quando houver tráfego suficiente.

## Ordem recomendada

1. Corrigir estados e reescrever a home com as informações atuais.
2. Implementar explorador com continuidade para contato e visualizador da galeria.
3. Refinar composição e coordenar as cenas de movimento.
4. Incorporar fotos e condições aprovadas pela Ellen.
5. Validar a prévia publicada e preparar o domínio para indexação.

As páginas existentes permanecem úteis. Não ampliar quantidade de rotas ou dependências antes de melhorar conteúdo e interações atuais.

## Referências técnicas

- [Astro: View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [Google Search Central: dados estruturados de negócio local](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- Regras locais: `CLAUDE.md`, `docs/FONTES-E-CONTEUDO.md` e `docs/VERIFICACAO.md`.
