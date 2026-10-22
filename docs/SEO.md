# SEO e dados estruturados

Atualizado em 22/10/2026.

## Implementado

- HTML estático útil em todas as rotas, H1 único, títulos e descrições próprios por página.
- JSON-LD no HTML: marca, profissional, site e página; serviço na página de atendimento; cinco imagens e origem na galeria; breadcrumbs nas páginas internas com origem conhecida.
- `Organization` contém nome, telefone confirmado, logo, Instagram, área de atendimento e canal de contato. `Person` identifica Ellen como Lash Designer; as modelos não são tratadas como retratos da profissional.
- `BeautySalon` é habilitado somente se `PUBLIC_STREET_ADDRESS` e `PUBLIC_POSTAL_CODE` estiverem preenchidos com dados aprovados. O endereço também fica visível na página de contato. Não há rua, CEP, coordenadas, horários, preços, avaliações ou formação inventados.
- Canonical por rota quando `PUBLIC_SITE_URL` está configurada, com validação da origem HTTPS no build. Não aceitar caminhos, credenciais, query ou fragmento no domínio.
- Open Graph e Twitter Card com imagem local 1200 × 630. Origem da imagem usa o domínio configurado ou o endereço do deploy da Vercel/Cloudflare Pages. Na prévia local sem origem pública, as referências ficam relativas.
- Sitemap apenas no modo de produção, sem a 404. `robots.txt` permite acesso para os buscadores lerem as diretivas HTML.
- Prévia: `noindex, follow`. Produção: `index, follow, max-image-preview:large`. Página 404: `noindex, follow` sempre, sem canonical ou schema de página comercial.
- Fotos WebP responsivas, dimensões reservadas, fontes locais, primeira imagem prioritária e restantes carregadas sob demanda.

## Ativação no domínio final

1. Confirmar domínio e conteúdo público com Ellen.
2. Configurar `PUBLIC_SITE_URL=https://dominio-confirmado` e `PUBLIC_SITE_MODE=production` na hospedagem e gerar novo deploy.
3. Conferir HTTPS, redirecionamento para a origem escolhida, status 404, canônicos, `/robots.txt`, `/sitemap-index.xml` e a imagem de compartilhamento na URL publicada.
4. Validar o JSON-LD no Schema Markup Validator e os recursos suportados no Rich Results Test.
5. Conectar Search Console e enviar o sitemap quando houver acesso à propriedade. O perfil de empresa no Google e sua elegibilidade dependem dos dados reais e da verificação da Ellen.

Os passos 3–5 exigem a hospedagem/domínio publicados. Não foram executados nesta alteração. Uma URL da Vercel também pode ser adotada explicitamente como origem, mas não foi presumida como domínio definitivo.

## Validação local

Os testes em `tests/site.test.mjs` verificam JSON válido, relações/IDs do grafo, telefone, ausência de dados inventados, cinco imagens, descrições únicas, canônicos condicionais, breadcrumbs, sitemap e exclusão da 404. Um build descartável de produção com `https://example.com` em `artifacts/qa-production` validou o modo de indexação; essa URL não é configurada no site entregue.

Testes locais e schema válido não garantem posição ou apresentação especial na busca. Não há métricas de Core Web Vitals em campo ou aprovação do Google nesta entrega.

O FAQ permanece acessível no HTML. Não foi acrescentado markup só para buscar um destaque de FAQ: o Google encerrou esse recurso em 2026. Não há `SearchAction` sem uma busca funcional ou ações de reserva que o site não executa.

## Fontes

- [Google: noindex precisa estar acessível ao robô](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google: negócio local e propriedades necessárias](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: validação de dados estruturados](https://developers.google.com/search/docs/appearance/structured-data)
- [Google: encerramento dos destaques de FAQ em 2026](https://developers.google.com/search/updates)
