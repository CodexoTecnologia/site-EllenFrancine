import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.env.TEST_SITE_DIST || 'dist');
const routes = ['/', '/servicos/', '/resultados/', '/sobre/', '/contato/', '/privacidade/'];
const htmlFor = (route) => readFileSync(resolve(root, '.' + route, 'index.html'), 'utf8');

test('as seis páginas entregam conteúdo e metadados sem depender de JavaScript', () => {
  for (const route of routes) {
    const html = htmlFor(route);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: H1 único`);
    assert.match(html, /<html[^>]+lang="pt-BR"/);
    assert.match(html, /<meta[^>]+name="description"[^>]+content="[^"]{30,}"/);
    assert.match(html, /<main[^>]+id="conteudo"/);
    assert.ok(html.includes('Ellen Francine'));
    assert.ok(!html.includes('lorem ipsum'));
  }
});

test('navegação e assets locais não apontam para arquivos ausentes', () => {
  for (const route of routes) {
    const html = htmlFor(route);
    const references = [...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map((match) => match[1]);
    for (const reference of references) {
      if (!reference.startsWith('/')) continue;
      const path = reference.split(/[?#]/)[0];
      const target = resolve(root, '.' + path, path.endsWith('/') ? 'index.html' : '');
      assert.ok(existsSync(target), `${route}: ${reference}`);
    }
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image[0], /\balt="[^"]*"/, `${route}: alt`);
      assert.match(image[0], /\bwidth="\d+"/, `${route}: width`);
      assert.match(image[0], /\bheight="\d+"/, `${route}: height`);
    }
  }
});

test('prévia protege indexação e mantém contato verdadeiro, sem reserva fictícia', () => {
  const production = process.env.PUBLIC_SITE_MODE === 'production';
  for (const route of routes) {
    const html = htmlFor(route);
    assert.match(
      html,
      production
        ? /name="robots" content="index, follow"/
        : /name="robots" content="noindex, nofollow"/,
    );
    assert.ok(html.includes('https://www.instagram.com/ellenfrancine.lash/'));
    assert.ok(!/<form\b/.test(html), 'Não há formulário de agendamento não implementado');
    assert.ok(!html.includes('aggregateRating'), 'Sem avaliações inventadas');
    assert.ok(!html.includes('wa.me/000'));
    assert.ok(!/href="(?:#|javascript:|)"/.test(html));
  }
  const robots = readFileSync(resolve(root, 'robots.txt'), 'utf8');
  assert.match(robots, production ? /Allow: \// : /Disallow: \//);
  assert.ok(existsSync(resolve(root, '404.html')));
  for (const font of [
    'lora-600-latin.woff2',
    'manrope-400-latin.woff2',
    'manrope-600-latin.woff2',
  ]) {
    assert.ok(existsSync(resolve(root, 'fonts', font)), `Fonte local disponível: ${font}`);
  }
});

test('campanha e canal de contato seguem a configuração em todas as páginas', () => {
  const active = process.env.PUBLIC_RECRUITMENT_ACTIVE !== 'false';
  const whatsapp = process.env.PUBLIC_WHATSAPP?.replace(/\D/g, '');
  const channel = whatsapp ? 'WhatsApp' : 'Instagram';
  const home = htmlFor('/');
  assert.equal(home.includes('id="modelos"'), active, 'Convite da home acompanha a campanha');
  for (const route of ['/', '/servicos/', '/sobre/', '/contato/']) {
    const html = htmlFor(route);
    if (!active) {
      assert.ok(!html.includes('Quero ser modelo'), `${route}: sem CTA de campanha encerrada`);
      assert.ok(!html.includes('Estou procurando modelos'), `${route}: sem convite antigo`);
      assert.ok(
        !html.includes('procurando modelos para treinamento'),
        `${route}: sem convite antigo`,
      );
    }
    const contactLinks = [...html.matchAll(/<a\b[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
    const primaryLinks = contactLinks.filter((link) => link[2].includes(`Conversar no ${channel}`));
    assert.ok(primaryLinks.length, `${route}: canal visível`);
    for (const link of primaryLinks) {
      assert.equal(
        link[1],
        whatsapp ? `https://wa.me/${whatsapp}` : 'https://www.instagram.com/ellenfrancine.lash/',
      );
    }
  }
  assert.equal(
    home.includes('class="preview-note"'),
    process.env.PUBLIC_SITE_MODE !== 'production' && process.env.PUBLIC_PREVIEW_NOTICE !== 'false',
  );
});
