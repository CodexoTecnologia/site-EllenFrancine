# Ellen Francine - Lash Designer

Site institucional desenvolvido pela Codexo. Astro estático, TypeScript, CSS com tokens, Lora 600/Manrope e GSAP/ScrollTrigger.

## Rodar

Node 24 e npm.

```sh
npm ci
npm run verify
npm run preview
```

A prévia de produção estará em `http://127.0.0.1:4327/`. Para desenvolvimento: `npm run dev`.

## Vercel agora

1. Importe o repositório e selecione o preset **Astro**.
2. Diretório raiz: este repositório. Build: `npm run build`. Saída: `dist`.
3. Node: 24. Mantenha `PUBLIC_SITE_MODE=preview` nesta etapa.
4. Nenhum adapter ou banco de dados é necessário.

`vercel.json` já descreve o build e os headers básicos. A imagem social utiliza a URL do deploy quando `VERCEL_URL` estiver disponível.

## Cloudflare depois

O mesmo `dist/` pode ser publicado como site estático. Não há dependência de Vercel no código. Quando a conta, o ambiente e o domínio forem definidos, configurar o pipeline usado pela Codexo; ver `docs/DEPLOY.md`.

## Dados e conteúdo

- `src/config/site.ts`: nome, localização, perfil, canal principal e status de prévia.
- `src/data/content.ts`: galeria, referências de estilo e FAQ.
- `src/styles/tokens.css`: tokens da identidade.
- `src/components/`: apresentação e comportamentos reutilizáveis.
- `src/assets/`: fotos locais processadas pelo Astro.
- `public/fonts/`: fontes WOFF2 e licenças.

O Instagram e a localização foram confirmados pelo usuário e pelo post de lançamento. Não foram fornecidos telefone, endereço completo, horários, preços ou nomes de técnicas. O contato funciona pelo Instagram, e as demais informações são combinadas no direct. As três referências de estilo são ilustrações, não ofertas técnicas confirmadas.

A fase real da Ellen é o início da jornada e a procura de modelos para treinamento. O site não inventa experiência, depoimentos, resultados quantitativos ou certificações.

## Indexação

Por padrão todas as páginas têm `noindex, nofollow` e `robots.txt` bloqueia rastreamento. Para produção, configurar `PUBLIC_SITE_URL=https://dominio-confirmado` e `PUBLIC_SITE_MODE=production`. O build exige a URL final e passa a emitir sitemap. `noindex` não é controle de acesso.

## Verificação

`npm run verify` executa tipos/templates, build e contratos das páginas geradas: rotas, metadados, assets, contatos e indexação. A revisão visual e os limites de verificação estão em `docs/VERIFICACAO.md`.
