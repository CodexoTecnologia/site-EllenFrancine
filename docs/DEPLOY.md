# Publicação e configuração

## Etapa atual: prévia na Vercel

Preset Astro, Node 24, `npm run build`, saída `dist`. A página e as animações funcionam como arquivos estáticos. Não adicionar `@astrojs/vercel` ou funções sem requisito de servidor.

Variáveis opcionais documentadas em `.env.example`. A versão inicial contém Instagram e localização reais como padrão. Manter `PUBLIC_SITE_MODE=preview` enquanto Ellen revisa o conteúdo. Conferir mobile, menu, galeria e todos os links externos no endereço publicado.

## Etapa seguinte: Cloudflare da Codexo

Escolher o projeto/conta e a estratégia de publicação existente na Codexo. O build é o mesmo; assets gerados ficam em `dist`. Se o destino for Workers com static assets, configurar o diretório `dist` no projeto Workers e usar o pipeline da conta. Se for Pages, usar `npm run build` e `dist` no projeto Pages. Não há integração amarrada a um provedor nesta implementação.

Antes de apontar domínio e habilitar indexação:

- Confirmar domínio, proprietário, DNS e ambiente de produção.
- Validar conteúdo final com Ellen, incluindo uso das fotografias e condições para modelos.
- Confirmar técnicas, valores, duração, manutenção, horário e endereço publicável.
- Configurar `PUBLIC_SITE_URL` com a origem HTTPS final e `PUBLIC_SITE_MODE=production`.
- Verificar canonical, sitemap, robots, imagem social e HTTPS no domínio real.
- Revisar privacidade conforme hospedagem e ferramentas efetivamente usadas.
- Medir desempenho e encaminhar a propriedade ao Search Console quando houver autorização/acesso.

Nenhuma configuração de DNS, Vercel ou Cloudflare foi executada automaticamente nesta entrega.
