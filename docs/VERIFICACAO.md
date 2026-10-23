# Verificação da implementação

## Tom pessoal e FAQ de primeira aplicação — 23/10/2026

- Home revisada em primeira pessoa: abertura, convite para modelos, galeria, estilos, apresentação e contato com linguagem mais próxima do post de lançamento.
- FAQ ampliado de quatro para onze perguntas, incluindo desconforto, efeito natural, duração, manutenção, higiene e sensibilidade ocular. Referências e limites em `docs/FONTES-E-CONTEUDO.md`.
- Respostas continuam renderizadas em HTML dentro de `details` nativos. Metadados, canal de contato, galeria e indexação foram preservados.
- `npm run verify`: check sem erros/avisos/hints, build concluído e seis testes passaram. Formatação e `git diff --check` passaram.
- Prévia local respondeu HTTP 200. A revisão visual desktop/mobile continua pendente pelo bloqueio de acesso à aba na ferramenta de navegador registrado na revisão anterior; não houve tentativa de contornar essa restrição. Sem novas medições de desempenho ou publicação de domínio.

## Contato, novas fotos, movimento e SEO — 22/10/2026

- Faixa de revisão removida do layout. WhatsApp confirmado pelo usuário: +55 41 99917-9039, configurado como padrão dos contatos e incluído na página de contato e rodapé.
- Fotos 4 e 5 do carrossel solicitado baixadas, inspecionadas e incluídas nos assets locais. Home e galeria têm cinco itens, com legendas próprias e visualizador compartilhado.
- Referência de movimento consultada em `site-Codexo`, `origin/main` no commit `5349651`: entradas escalonadas, títulos, linhas de processo, parallax e troca de painéis. A adaptação usa o GSAP existente, sem adicionar React, Motion ou outra dependência.
- Abertura com dois retratos, transição suave, seleção manual e reprodução a cada sete segundos. Pausa por controle, interação/foco, hover, aba oculta e saída da viewport. Preferência por movimento reduzido continua respeitada; a pessoa pode ativar os efeitos no controle da abertura ou do rodapé.
- Entradas do título e blocos sem ocultar o conteúdo crítico, linhas desenhadas no processo/contato, progresso de leitura, resposta de cor ao scroll e transição nativa entre documentos com fallback.
- SEO: JSON-LD, breadcrumbs, títulos/descrições próprios, canônicos condicionais, Open Graph/Twitter, sitemap de produção e 404 sempre `noindex`. O robots da prévia permite a leitura do `noindex`. `Organization` permanece como tipo da marca enquanto não houver endereço completo aprovado; detalhes em `docs/SEO.md`.
- Seis testes passaram no build de prévia e no build separado de produção com domínio de teste e campanha encerrada. Astro check sem erros, avisos ou hints após excluir os bundles descartáveis de `artifacts/` da análise de tipos.
- No navegador: nova foto na abertura, reprodução automática observada, pausa e ativação explícita dos efeitos; galeria abriu fotos 4/5 em 320px, com Escape e retorno de foco. Contato apresentou o número correto e o link `wa.me`. Sem overflow nas larguras medidas de 320 e 768px; console da aba não retornou erros/avisos durante esses testes.

Não houve publicação de domínio, conexão ao Search Console, validação externa no Google ou novas medições de Core Web Vitals. O build de teste de produção fica somente em `artifacts/` e não é enviado ao Git.

## Evolução de 22/10/2026

- Home reorganizada: proposta objetiva, convite para treinamento, ensaio de lançamento, processo de atendimento, estilos, apresentação e dúvidas. Removida uma seção de promessa repetida e o emblema sem informação adicional.
- Galeria com ampliação em dialog nativo na home e em `/resultados/`, navegação anterior/próxima e por setas, Escape e retorno de foco. Os links continuam abrindo imagens reais sem JavaScript.
- Explorador atualiza mensagem copiável conforme o estilo. Feedback informa cópia ou seleção manual quando a API não está disponível. Nada é enviado automaticamente para a Ellen.
- Contato fixo no mobile somente após a ação inicial sair da área útil; oculto no menu, visualizador e seção final de contato. Conteúdo possui espaço para a barra e alvos de foco têm margem de rolagem.
- Campanha e canal principal centralizados; aviso visual de revisão separado da indexação. Testes verificam também campanha encerrada, WhatsApp configurado e aviso oculto em um build separado e descartável em `artifacts/qa-closed`. O número usado nessa variante é apenas um dado de teste e não faz parte da prévia entregue.
- Ilustrações com diferenças mais claras e curva da marca simplificada. Mantidos Astro, GSAP e fontes locais, sem novas dependências.

Verificações desta evolução:

- Astro check: zero erros, avisos ou hints. Build final e quatro testes passaram. A variante com campanha encerrada, WhatsApp de teste e aviso oculto também passou nos quatro testes; ela não substituiu o `dist` entregue.
- Prettier e `git diff --check` passaram.
- Revisão no navegador em 320, 390, 768 e 1440px. Sem overflow horizontal nas larguras medidas. A legenda do explorador ganhou espaço próprio após detectar proximidade com o nome do estilo.
- Seleção de estilo atualizou `aria-pressed`, ilustração e mensagem; botão de cópia apresentou confirmação real da API. O fallback de seleção manual está implementado, mas não foi forçada uma negativa de permissão nesta sessão.
- Dialog na home: abertura, próxima foto, seta direita, Escape e retorno de foco à fotografia original verificados. Em 320px, imagem, legenda e controles couberam no visualizador.
- Contato fixo apareceu após a abertura e desapareceu no menu e no fim da página. Escape fechou o menu e retornou o foco. Modos de movimento reduzido e completo foram exercitados.
- Nenhum erro ou aviso foi retornado pelo console da aba de revisão nesta sessão. Não foram medidos novos scores Lighthouse, Core Web Vitals em campo ou aparelhos físicos.

O registro abaixo descreve a versão inicial.

21/10/2026 - versão inicial para a Ellen avaliar.

## Implementado

- Repositório Astro estático independente, com organização Codexo: configuração única do negócio, dados separados, componentes, layouts, tokens, scripts e documentação.
- Home, atendimento, galeria, sobre, contato, privacidade e 404. As seis páginas comerciais/informativas são renderizadas em HTML.
- Lora 600 e Manrope 400/600 em WOFF2 locais. Total de fontes: 56.804 bytes.
- Três fotografias do post fornecido pelo usuário. O pipeline gera 24 variantes responsivas, com dimensões explícitas, prioridade alta apenas na imagem da abertura e lazy loading fora da dobra.
- Contato real por Instagram; localização Roça Grande, Colombo/PR; convite para modelos de treinamento. Sem preços, endereço completo, duração ou técnicas inventadas.
- GSAP/ScrollTrigger: assinatura SVG, detalhe da abertura, galeria em camadas no desktop, motivo da seção de modelos e resposta visual da seleção de estilos.
- Movimento reduzido por padrão quando solicitado pelo sistema; controle opcional no rodapé para a pessoa ativar/reduzir. Escolha lembrada somente na sessão e descrita na privacidade.
- Configuração de build da Vercel e documentação de migração futura para Cloudflare. Sem adapter de servidor, banco de dados ou formulário fictício.
- Prévia com `noindex, nofollow`, robots bloqueado e sitemap condicionado à produção com domínio confirmado.

## Verificações executadas

- `npm install`: 271 pacotes instalados, zero vulnerabilidades reportadas na auditoria desse momento.
- `npm run verify`: Astro check sem erros/avisos/hints; build concluído; três testes passaram. Os testes verificam HTML/metadados, links e assets locais, imagens com alt/dimensões, contato real, ausência de reserva fictícia e bloqueio da indexação na prévia.
- Build gerou sete páginas, além de robots e assets. A geração da imagem social produziu avisos locais de cache Fontconfig indisponível; a imagem foi produzida e inspecionada visualmente, sem corte observado.
- JavaScript final: 115.889 bytes, 44.726 bytes em gzip calculado localmente. Esse valor é o tamanho do bundle, não uma medição de carregamento ou de Core Web Vitals.
- Desktop no navegador, 1280px: fonte carregada, foto principal sem distorção, oferta e CTA visíveis. Largura do documento 1265px com barra de rolagem; sem overflow horizontal observado.
- Revisão por iframes de 320px e 390px: primeira dobra, navegação móvel e página de contato. O menu abriu em 320px; Escape fechou e devolveu foco ao summary.
- Seleção de estilo alterou `aria-pressed` e mostrou a ilustração correspondente. As descrições continuam no HTML sem depender da seleção.
- FAQ abriu pelo Espaço com foco visível. Links da galeria e páginas internas foram acessados.
- Ativação manual do movimento alterou o estado para `full`; o progresso do desenho SVG foi observado e a escolha permaneceu após navegar à home. Conteúdo crítico nunca fica invisível esperando GSAP.
- A leitura de console registrou um erro de MutationObserver durante a revisão por iframes. A busca no código-fonte e no bundle do site não encontrou MutationObserver; a origem não foi confirmada. Não foi observada falha nos controles do site durante os testes manuais.

## Limites

Não foram medidos Lighthouse, Core Web Vitals em campo, FPS/GPU ou rede móvel real. Não houve teste com Safari, leitor de tela, zoom ampliado ou aparelho físico. Vercel, Cloudflare e domínio não foram configurados por esta implementação. A autorização final de uso das fotos, as condições para modelos e os dados ainda ausentes devem ser revisados com Ellen antes da publicação definitiva.

O servidor de prévia local foi mantido disponível para a revisão solicitada pelo usuário, em `http://127.0.0.1:4327/`. Essa URL não é pública.
