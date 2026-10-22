import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGallery } from './gallery';
import { initMobileContact } from './mobile-contact';
import { initHero } from './hero';

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
  const hero = initHero(isReduced, () => setMotionChoice('full'));
  cleanupCallbacks.push(hero.cleanup);
  const transientMotion: Array<() => void> = [];
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
    transientMotion.push(() => styleTween?.revert());
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
    transientMotion.forEach((cleanup) => cleanup());
    document.documentElement.dataset.motion = isReduced() ? 'reduced' : 'full';
    hero.refresh();
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
      if (document.querySelector('.home-hero')) {
        gsap.fromTo(
          '.hero-title-line',
          { y: 22 },
          { y: 0, duration: 0.95, stagger: 0.12, ease: 'expo.out', clearProps: 'transform' },
        );
        gsap.fromTo(
          '.hero-lead, .hero-actions, .hero-contact-hint',
          { y: 14 },
          { y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out', clearProps: 'transform' },
        );
        gsap.fromTo(
          '.hero-visual',
          { y: 24 },
          { y: 0, duration: 1.15, ease: 'power3.out', clearProps: 'transform' },
        );
      }
      document
        .querySelectorAll<HTMLElement>(
          '.section-heading h2, .invitation-grid h2, .about-grid h2, .faq-grid h2, .page-hero h1',
        )
        .forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 26 },
            {
              y: 0,
              duration: 0.85,
              ease: 'expo.out',
              immediateRender: false,
              clearProps: 'transform',
              scrollTrigger: { trigger: heading, start: 'top 93%', once: true },
            },
          );
        });
      document.querySelectorAll<HTMLElement>('.steps-list').forEach((list) => {
        gsap.fromTo(
          list.children,
          { y: 24 },
          {
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            immediateRender: false,
            clearProps: 'transform',
            scrollTrigger: { trigger: list, start: 'top 90%', once: true },
          },
        );
        gsap.fromTo(
          list.querySelectorAll('.step-ink'),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: 'power3.inOut',
            immediateRender: false,
            scrollTrigger: { trigger: list, start: 'top 88%', once: true },
          },
        );
      });
      const quote = document.querySelector<HTMLElement>('.about-copy > p:first-child');
      if (quote)
        gsap.fromTo(
          quote,
          { color: '#705a63' },
          {
            color: '#100d0f',
            ease: 'none',
            scrollTrigger: { trigger: quote, start: 'top 90%', end: 'top 48%', scrub: 0.6 },
          },
        );
      gsap.fromTo(
        '[data-scroll-progress]',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } },
      );
      const contactCurve = document.querySelector<SVGPathElement>('.contact-signature path');
      if (contactCurve) {
        const length = contactCurve.getTotalLength();
        gsap.fromTo(
          contactCurve,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.35,
            ease: 'power2.inOut',
            immediateRender: false,
            clearProps: 'strokeDasharray,strokeDashoffset',
            scrollTrigger: { trigger: contactCurve, start: 'top 92%', once: true },
          },
        );
      }
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
  function setMotionChoice(choice: 'full' | 'reduced') {
    motionChoice = choice;
    try {
      sessionStorage.setItem('ellen-motion', motionChoice);
    } catch {
      /* Navegação funciona sem armazenamento. */
    }
    configureMotion();
  }
  const onMotionClick = () => setMotionChoice(isReduced() ? 'full' : 'reduced');
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
