// Usa o credential helper do Git em memória. Nunca imprime ou salva a credencial.
import { execFileSync } from 'node:child_process';

const owner = 'CodexoTecnologia';
const repo = 'site-EllenFrancine';
let credential;
try {
  credential = execFileSync('git', ['credential', 'fill'], {
    input: 'protocol=https\nhost=github.com\n\n',
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' },
  });
} catch {
  console.error('Não foi possível usar uma credencial GitHub do Git neste ambiente.');
  process.exit(2);
}
const token = credential
  .split(/\r?\n/)
  .find((line) => line.startsWith('password='))
  ?.slice(9);
if (!token) {
  console.error('Nenhuma credencial HTTPS do GitHub disponível.');
  process.exit(2);
}
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'Codexo-Ellen-Site',
};
async function request(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const body = await response.json().catch(() => ({}));
  return { status: response.status, body };
}
const user = await request('/user');
if (user.status !== 200) {
  console.error(`GitHub não autorizou a credencial (HTTP ${user.status}).`);
  process.exit(3);
}
const existing = await request(`/repos/${owner}/${repo}`);
if (process.argv.includes('--inspect')) {
  const membership = await request(`/user/memberships/orgs/${owner}`);
  console.log(
    JSON.stringify({
      login: user.body.login,
      organization: owner,
      membership: membership.body.state || null,
      role: membership.body.role || null,
      repositoryExists: existing.status === 200,
    }),
  );
} else if (process.argv.includes('--create')) {
  if (existing.status === 200) {
    console.log(
      JSON.stringify({
        url: existing.body.html_url,
        created: false,
        private: existing.body.private,
      }),
    );
  } else if (existing.status === 404) {
    const created = await request(`/orgs/${owner}/repos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: repo,
        description:
          'Site institucional de Ellen Francine, Lash Designer em Colombo. Astro, GSAP e design system Codexo.',
        private: true,
        auto_init: false,
      }),
    });
    if (created.status !== 201) {
      console.error(
        `Não foi possível criar o repositório na organização (HTTP ${created.status}).`,
      );
      process.exit(4);
    }
    console.log(
      JSON.stringify({ url: created.body.html_url, created: true, private: created.body.private }),
    );
  } else {
    console.error(`Não foi possível verificar o repositório (HTTP ${existing.status}).`);
    process.exit(5);
  }
} else {
  console.error('Use --inspect ou --create.');
  process.exit(1);
}
