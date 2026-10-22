# Verificação da implementação

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
