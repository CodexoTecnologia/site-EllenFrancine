# Ellen Francine - site institucional

Astro estático + TypeScript estrito + CSS semântico + GSAP/ScrollTrigger. Node 24.

## Comandos

- `npm run dev`: desenvolvimento Astro.
- `npm run verify`: check, build e verificações do HTML gerado.
- `npm run preview`: servir `dist` em 127.0.0.1:4327.

## Regras

- Dados, canais e status da prévia em `src/config/site.ts`. Não repetir contato em componentes.
- Não inventar serviços confirmados, valores, depoimentos, formação, endereço ou trabalhos.
- Imagem editorial gerada é ilustração de conceito, identificada como tal. Nunca apresentar como cliente ou resultado da Ellen.
- Referências de estilo são inspiração, não catálogo de técnicas já confirmado.
- Tokens de cor, tipografia e espaçamento em `src/styles/tokens.css`; identidade preto/rosé/marfim/vinho; Lora 600 e Manrope.
- Manter conteúdo essencial renderizado em HTML e visível sem JS. Sem preloaders bloqueantes.
- GSAP coordena cenas; CSS responde pelos estados dos controles. Respeitar reduced motion e limpar efeitos/listeners ao trocar rotas.
- Navegação mobile, teclado, foco e ações reais fazem parte da entrega. Sem formulário fingindo envio ou botão sem destino.
- A prévia usa `noindex` até haver domínio e conteúdo confirmados. Não apontar canonical para domínio inventado.
- Vercel agora; build estático portável para Cloudflare depois. Não adicionar SSR/adapters sem necessidade real.
- Rodar `npm run verify` e conferir desktop/mobile após mudanças relevantes.
