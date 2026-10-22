import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGallery } from './gallery';
import { initMobileContact } from './mobile-contact';

export function initSite() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
  const summary = menu?.querySelector<HTMLElement>('summary');
  const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  let motionChoice: string | null = null;
  try {
    motionChoice = sessionStorage.getItem('ellen-motion');
  } catch {
    /* Preferência opcional. */
  }
  const isReduced = () => (motionChoice ? motionChoice === 'reduced' : preference.matches);
  const cleanupCallbacks: Array<() => void> = [];
  cleanupCallbacks.push(initGallery(), initMobileContact(menu));
  let context: gsap.Context | undefined;
  let media: gsap.MatchMedia | undefined;

  function closeMenu(returnFocus = false) {
    if (!menu?.open) return;
    menu.open = false;
    if (returnFocus) summary?.focus();
  }
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeMenu(true);
  };
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    if (menu?.open && !menu.contains(event.target)) closeMenu();
    if (event.target.closest('.mobile-menu nav a')) closeMenu();
  };
  document.addEventListener('keydown', onKey);
  document.addEventListener('click', onClick);
  cleanupCallbacks.push(
    () => document.removeEventListener('keydown', onKey),
    () => document.removeEventListener('click', onClick),
  );

  document.querySelectorAll<HTMLElement>('[data-style-explorer]').forEach((explorer) => {
    const options = explorer.querySelectorAll<HTMLButtonElement>('[data-style-select]');
    const message = explorer.querySelector<HTMLTextAreaElement>('[data-style-message]');
    const copy = explorer.querySelector<HTMLButtonElement>('[data-copy-message]');
    const status = explorer.querySelector<HTMLElement>('[data-copy-status]');
    let copyAttempt = 0;
    let styleTween: gsap.core.Tween | undefined;
    const note = 'Uma referência de estilo; técnica e resultado são conversados com a Ellen.';
    options.forEach((button) => {
      button.disabled = false;
      const select = () => {
        copyAttempt++;
        if (message)
          message.value = `Olá, Ellen! Conheci seu site e gostei do estilo ${button.dataset.styleName?.toLocaleLowerCase('pt-BR')}. Quero conversar sobre as possibilidades do atendimento.`;
        if (status) status.textContent = note;
        styleTween?.revert();
        options.forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
        explorer.querySelectorAll<HTMLElement>('[data-style-art]').forEach((art) => {
          art.hidden = art.dataset.styleArt !== button.dataset.styleSelect;
        });
        const active = explorer.querySelector<HTMLElement>(
          `[data-style-art="${button.dataset.styleSelect}"]`,
        );
        if (active && !isReduced())
          styleTween = gsap.fromTo(
            active,
            { y: 10 },
            { y: 0, duration: 0.45, ease: 'power3.out', overwrite: true, clearProps: 'transform' },
          );
      };
      button.addEventListener('click', select);
      cleanupCallbacks.push(() => button.removeEventListener('click', select));
    });
    const onCopy = async () => {
      if (!message) return;
      const attempt = ++copyAttempt;
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(message.value);
        if (status && attempt === copyAttempt)
          status.textContent = 'Mensagem copiada. Abra o canal da Ellen e cole na conversa.';
      } catch {
        if (attempt !== copyAttempt) return;
        message.focus();
        message.select();
        if (status) status.textContent = 'Selecione e copie o texto acima para levar à conversa.';
      }
    };
    if (copy) copy.hidden = false;
    copy?.addEventListener('click', onCopy);
    cleanupCallbacks.push(() => {
      copyAttempt++;
      styleTween?.revert();
      copy?.removeEventListener('click', onCopy);
    });
  });

  function configureMotion() {
    media?.revert();
    context?.revert();
    document.documentElement.dataset.motion = isReduced() ? 'reduced' : 'full';
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.setAttribute('aria-pressed', String(!isReduced()));
      const label = isReduced() ? 'Ativar movimento' : 'Reduzir movimento';
      motionButton.setAttribute('aria-label', label);
      const text = motionButton.querySelector('[data-motion-label]');
      if (text) text.textContent = label;
    }
    if (isReduced()) return;
    gsap.registerPlugin(ScrollTrigger);
    context = gsap.context(() => {
      document.querySelectorAll<SVGPathElement>('[data-signature]').forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.8,
            ease: 'power2.inOut',
            clearProps: 'strokeDasharray,strokeDashoffset',
          },
        );
      });
      const heroNote = document.querySelector('.hero-photo-note');
      if (heroNote)
        gsap.fromTo(
          heroNote,
          { y: 18, rotation: -2 },
          { y: 0, rotation: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform' },
        );
      media = gsap.matchMedia();
      media.add('(min-width: 761px)', () => {
        document.querySelectorAll<HTMLElement>('[data-photo]').forEach((photo, index) => {
          gsap.fromTo(
            photo,
            { y: index === 1 ? 28 : 10 },
            {
              y: index === 1 ? -24 : -10,
              ease: 'none',
              scrollTrigger: {
                trigger: photo.parentElement,
                start: 'top 90%',
                end: 'bottom 15%',
                scrub: 0.8,
              },
            },
          );
        });
      });
    });
  }
  configureMotion();
  const onMotionClick = () => {
    motionChoice = isReduced() ? 'full' : 'reduced';
    try {
      sessionStorage.setItem('ellen-motion', motionChoice);
    } catch {
      /* Navegação funciona sem armazenamento. */
    }
    configureMotion();
  };
  motionButton?.addEventListener('click', onMotionClick);
  cleanupCallbacks.push(() => motionButton?.removeEventListener('click', onMotionClick));
  preference.addEventListener('change', configureMotion);
  cleanupCallbacks.push(() => preference.removeEventListener('change', configureMotion));
  const onResize = () => {
    if (window.innerWidth > 760) closeMenu();
  };
  window.addEventListener('resize', onResize, { passive: true });
  cleanupCallbacks.push(() => window.removeEventListener('resize', onResize));
  window.addEventListener(
    'pagehide',
    (event) => {
      if (event.persisted) return;
      media?.revert();
      context?.revert();
      cleanupCallbacks.forEach((clean) => clean());
    },
    { once: true },
  );
}
