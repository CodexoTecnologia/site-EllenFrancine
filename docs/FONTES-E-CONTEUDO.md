# Origem dos materiais

## Confirmado em 21/10/2026

O usuário forneceu o perfil `https://www.instagram.com/ellenfrancine.lash/` e a publicação `https://www.instagram.com/p/DewcYglnH-F/`, com o texto e os dados de atendimento. A publicação também foi conferida no navegador.

- Nome: Ellen Francine; profissão: Lash Designer; serviço mencionado: extensão de cílios.
- Localização: Roça Grande, Colombo, Paraná.
- Agendamento pelo Instagram e, confirmado em 22/10/2026, WhatsApp +55 41 99917-9039.
- Início da jornada profissional e convite para modelos para treinamento.

As fotografias em `src/assets/modelo-instagram-*.webp` vieram dos cinco primeiros itens dessa publicação (itens 4 e 5 adicionados a pedido do usuário em 22/10/2026), baixados pela interface do Instagram. Elas não receberam filtros que alterem o conteúdo nesta implementação; o pipeline apenas gera formatos/tamanhos para a web. A interface do Instagram exibia o marcador “AI content” na publicação. Não tratamos as fotos como comprovação de técnica, imagem original não editada ou evidência de resultado mensurado. As legendas as identificam como material do perfil/publicação de lançamento.

Antes de publicação definitiva, confirmar com Ellen a autorização de uso das modelos e a identificação que deseja dar a cada fotografia. Não presumir que a pessoa fotografada seja a Ellen.

## Identidade

A logo foi fornecida pelo usuário em `EllenFrancineLogo.jfif`; cópia preservada em `public/brand/ellen-francine-original.jpg` sem alteração do conteúdo. As fontes Lora e Manrope vêm do repositório oficial Google Fonts, com licenças OFL incluídas em `public/fonts`. Os WOFF2 foram gerados para o conjunto latino necessário ao português.

Os desenhos de referências de estilo são SVGs de autoria do projeto, identificados como ilustrações. Não são técnicas ou resultados de clientes.

## FAQ geral — 23/10/2026

O FAQ passou a responder dúvidas de primeira aplicação em tom de conversa: desconforto, efeito natural, retenção, manutenção, higiene, danos aos fios e sensibilidade ocular. São informações gerais, não um protocolo individual nem comprovação de técnicas ou produtos utilizados pela Ellen. Não há promessa de ausência de alergias, duração fixa ou procedimento sem riscos.

- [FDA: segurança de cosméticos para os olhos](https://www.fda.gov/cosmetics/cosmetic-products/eye-cosmetic-safety): adesivos podem causar irritação e alergia; sintomas não devem ser ignorados.
- [Canadian Association of Optometrists: extensões de cílios](https://opto.ca/eye-health-library/eyelash-extensions): ciclo dos fios, riscos de danos e cuidados com a aplicação.
- [London Lash: banho e extensões](https://londonlash.com/blogs/news/how-to-shower-with-eyelash-extensions): orientações após molhar variam com os produtos e a cura do adesivo. Como a marca usada pela Ellen não foi informada, não foi prescrito um intervalo universal de 24 ou 48 horas.

As respostas sobre valores, tempo de aplicação e horários continuam dependendo de confirmação com a profissional. A linguagem em primeira pessoa é copy proposta para a marca, baseada no tom do post de lançamento fornecido pelo usuário.

Uma ilustração editorial chegou a ser gerada durante o início do trabalho, antes de o usuário fornecer o post. Ela não foi selecionada nem incluída no site: o material da própria marca se tornou a escolha visual da implementação.

## Referências técnicas

A assinatura de desenvolvimento usa `public/brand/codexo-white.svg`, cópia da logo oficial `site-Codexo/public/assets/logo/logo_codexo_nome_branco.svg`, solicitada pelo usuário. Proporções e desenho preservados.

- https://docs.astro.build/en/guides/deploy/vercel/
- https://docs.astro.build/en/guides/deploy/cloudflare/
- https://gsap.com/docs/v3/Installation/
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/

GSAP é instalado pelo pacote oficial npm, com seus avisos de distribuição preservados na dependência. Revisar os termos vigentes no momento da publicação comercial.
