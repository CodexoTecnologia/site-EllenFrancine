# Revisão de UX e publicação na busca

23/10/2026. Avaliação do conteúdo e da implementação local; não representa uma medição de conversão, ranking ou desempenho em campo.

**Ajuste posterior de tom:** a pedido do usuário, a home voltou a ter textos mais pessoais e o FAQ passou de quatro para onze perguntas, incluindo dúvidas gerais de primeira aplicação. A contagem de palavras abaixo registra a primeira edição enxuta, não a versão atual. As referências das respostas gerais estão em [Origem dos materiais](FONTES-E-CONTEUDO.md#faq-geral--23102026).

## Alterações entregues

A home repetia a apresentação, o convite e a orientação para contato. Isso prolongava a leitura sem ajudar na decisão. A edição reduz o texto, diferencia as ações e deixa os detalhes nas páginas de apoio.

- Texto do `<main>`: 666 → 310 palavras, aproximadamente 53% menos. Contagem do HTML gerado, incluindo respostas do FAQ, excluindo scripts, SVG, dialog e noscript; não é uma medição apenas do conteúdo inicialmente visível.
- Abertura explica serviço e localização em uma frase. Ação principal: “Falar com a Ellen”. O convite para treinamento mantém sua própria ação: “Quero ser modelo”.
- Galeria da home: três fotos, incluindo as imagens 4 e 5 do post. As cinco continuam em `/resultados/`.
- Passo a passo removido da home e preservado em `/servicos/`.
- Apresentação da Ellen, referências de estilo e contato final mais curtos.
- Escolher um estilo atualiza um link do WhatsApp com mensagem preenchida. Não há etapa de cópia nem envio automático.
- FAQ com quatro perguntas, em HTML nativo acessível. Serviço e localização aparecem naturalmente; não há bloco invisível de palavras-chave.
- Identidade visual, animações e assinatura Codexo preservadas. Nenhuma biblioteca nova.

## Próximas melhorias, em ordem de impacto

| Prioridade | Problema observado e consequência                                                                                                                                                    | Próxima mudança                                                                                                                                                     | Como verificar                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Alta       | Técnicas, investimento, duração e condições de treinamento ainda não estão confirmados. O FAQ encaminha quase tudo ao WhatsApp.                                                      | Publicar respostas curtas com os dados reais da Ellen. Distinguir modelo de atendimento regular e informar a disponibilidade da campanha.                           | Uma visitante deve conseguir saber se o atendimento faz sentido antes de iniciar a conversa.                                               |
| Alta       | As cinco fotos vêm de uma publicação de lançamento. Não comprovam cinco clientes, técnicas ou resultados diferentes. Falta uma apresentação visual real da profissional e do espaço. | Acrescentar retrato da Ellen, ambiente e registros autorizados de trabalhos, com contexto verdadeiro. Depoimentos somente quando existirem.                         | Conferir origem, autorização e legenda de cada imagem; não associar modelos a retratos da Ellen.                                           |
| Alta       | A prévia permanece com `noindex`; o domínio definitivo não foi configurado nesta entrega.                                                                                            | Publicar a versão aprovada no domínio final, ativar produção e verificar canonical, sitemap e HTTPS.                                                                | Inspeção da URL publicada no Search Console; conferir também status 404 e compartilhamento.                                                |
| Média      | As páginas internas ainda compartilham parte do mesmo discurso, porque faltam informações comerciais.                                                                                | Dar uma finalidade própria a cada página: atendimento explica o serviço; sobre apresenta a profissional; galeria contextualiza trabalhos; contato orienta a visita. | Remover trechos que apenas repetem a home. Não criar páginas por cidade ou artigos sem conteúdo útil.                                      |
| Média      | Os desenhos de estilos são inspirações, sem catálogo de técnicas confirmado.                                                                                                         | Trocar ou complementar com exemplos reais quando houver material adequado.                                                                                          | A cliente deve entender a diferença entre referência visual e técnica disponível.                                                          |
| Média      | Não há nova medição em celular real ou dados de desempenho em campo.                                                                                                                 | Medir a versão publicada em rede móvel; revisar primeira dobra, legibilidade, teclado, FAQ, galeria e movimento reduzido.                                           | Usar Lighthouse como diagnóstico e acompanhar Core Web Vitals quando houver dados suficientes. Mais animação não é prioridade nesta etapa. |
| Média      | Ainda não existe um perfil local verificado informado no projeto.                                                                                                                    | Avaliar o Perfil da Empresa no Google, conforme elegibilidade e endereço que Ellen possa divulgar. Manter nome, contato e localização consistentes.                 | Conferir perfil verificado e dados reais; não inventar endereço para habilitar schema local.                                               |
| Posterior  | Cliques no WhatsApp e agendamentos não são medidos.                                                                                                                                  | Definir uma medição simples e compatível com a privacidade antes de instalar analytics.                                                                             | Separar visita, clique de contato e agendamento confirmado; clique não equivale a cliente.                                                 |

## Search Console: o que fazer antes e depois

**A propriedade pode ser verificada antes do deploy**, desde que o domínio já seja seu e você controle o DNS. Para facilitar o primeiro lançamento, também é válido fazer tudo depois de o domínio estar funcionando. Hospedar na Cloudflare não é requisito do Google.

1. Entre no [Google Search Console](https://search.google.com/search-console/). No seletor de propriedades, escolha adicionar uma propriedade de site do tipo **Domínio**. Informe somente o domínio registrado, sem `https://`, caminho ou `www`. Essa propriedade cobre protocolos e subdomínios.
2. Copie o registro TXT de verificação fornecido pelo Google. No provedor responsável pelo DNS autoritativo, adicione o registro sem apagar os existentes. Se o DNS já estiver na Cloudflare: domínio → **DNS → Records → Add record**; tipo **TXT**, nome **@**, conteúdo exatamente como o Google forneceu, TTL **Auto**.
3. Volte ao Search Console e clique em verificar. A propagação pode exigir espera. Mantenha o TXT após a verificação. Se mudar os nameservers depois, preserve esse registro no novo DNS.

Referências: [propriedades do Search Console](https://support.google.com/webmasters/answer/34592?hl=pt-BR), [verificação de propriedade](https://support.google.com/webmasters/answer/9008080), [registros DNS da Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

**Quando o site estiver no domínio definitivo:**

1. Na hospedagem, configurar `PUBLIC_SITE_URL` com a origem HTTPS final e `PUBLIC_SITE_MODE=production`. Gerar outro deploy: essas variáveis são lidas durante o build. Aplicá-las somente ao ambiente de produção; manter previews com `noindex`.
2. Conferir domínio e HTTPS, redirecionamento para a origem escolhida, canonical de cada página, `/robots.txt` e `/sitemap-index.xml`. Não solicitar indexação de uma prévia bloqueada por `noindex`.
3. No Search Console, em **Indexação → Sitemaps**, enviar a URL completa `https://SEU-DOMINIO/sitemap-index.xml`, substituindo pelo domínio real. O arquivo já é gerado pelo projeto no modo de produção; não é necessário enviá-lo como upload.
4. Em **Inspeção de URL**, informar a home publicada, executar o teste da URL ativa e, se estiver acessível e indexável, solicitar indexação. Monitorar processamento do sitemap e os relatórios de páginas e desempenho; solicitação não garante inclusão nem prazo.

Referências: [relatório de sitemaps](https://support.google.com/webmasters/answer/7451001?hl=pt-BR), [inspeção de URL](https://support.google.com/webmasters/answer/9012289), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

**Troca de hospedagem e troca de domínio são situações diferentes.** Mover Vercel → Cloudflare mantendo domínio e caminhos não exige a ferramenta de mudança de endereço. Se existir um domínio antigo já indexado que será substituído, planejar redirecionamentos permanentes por URL, verificar as duas propriedades e avaliar a mudança de endereço. Não presumir essa necessidade para a primeira publicação de um site cuja prévia estava com `noindex`. [Orientação do Google sobre migrações](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## FAQ e palavras-chave

Perguntas recolhidas em acordeões são adequadas quando ajudam a pessoa e podem ser abertas normalmente. Texto invisível feito somente para buscadores e repetição artificial de termos podem violar as políticas de spam. O objetivo é responder às dúvidas sobre extensão de cílios em Roça Grande, Colombo, com informação real. O FAQ não substitui respostas comerciais ainda ausentes nem garante destaque especial na busca. [Políticas do Google](https://developers.google.com/search/docs/essentials/spam-policies#hidden-text-and-link-abuse).

## Verificação desta entrega

`npm run verify`: check sem erros, avisos ou hints; build e seis testes passaram. Os testes conferem HTML estático, metadados, assets, contato confirmado, mensagem inicial do estilo, campanha, seleção de três fotos na home e cinco na galeria, schema e regras de indexação.

A ferramenta de navegador bloqueou o acesso à aba de prévia nesta rodada. Não foi feita nova inspeção visual em desktop/mobile nem exercitada a seleção de estilo no navegador; esses pontos continuam pendentes. O servidor local foi iniciado em `http://127.0.0.1:4327/`. Não houve nova medição de Lighthouse, conexão ao Search Console, alteração de DNS ou deploy nesta revisão.
