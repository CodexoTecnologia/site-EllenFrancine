import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSite() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menu = document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
  const summary = menu?.querySelector<HTMLElement>('summary');
  const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
  let motionChoice: string | null = null;
  try { motionChoice = sessionStorage.getItem('ellen-motion'); } catch { /* Preferência opcional. */ }
  const isReduced = () => motionChoice ? motionChoice === 'reduced' : preference.matches;
  const cleanupCallbacks: Array<() => void> = [];
  let context: gsap.Context | undefined;
  let media: gsap.MatchMedia | undefined;

  function closeMenu(returnFocus = false) {
    if (!menu?.open) return;
    menu.open = false;
    if (returnFocus) summary?.focus();
  }
  const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeMenu(true); };
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    if (menu?.open && !menu.contains(event.target)) closeMenu();
    if (event.target.closest('.mobile-menu nav a')) closeMenu();
  };
  document.addEventListener('keydown', onKey);
  document.addEventListener('click', onClick);
  cleanupCallbacks.push(() => document.removeEventListener('keydown', onKey), () => document.removeEventListener('click', onClick));

  document.querySelectorAll<HTMLElement>('[data-style-explorer]').forEach(explorer => {
    const options = explorer.querySelectorAll<HTMLButtonElement>('[data-style-select]');
    options.forEach(button => {
      const select = () => {
        options.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
        explorer.querySelectorAll<HTMLElement>('[data-style-art]').forEach(art => { art.hidden = art.dataset.styleArt !== button.dataset.styleSelect; });
        const active = explorer.querySelector<HTMLElement>(`[data-style-art="${button.dataset.styleSelect}"]`);
        if (active && !isReduced()) gsap.fromTo(active, { y: 10 }, { y: 0, duration: .45, ease: 'power3.out', overwrite: true, clearProps: 'transform' });
      };
      button.addEventListener('click', select);
      cleanupCallbacks.push(() => button.removeEventListener('click', select));
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
      document.querySelectorAll<SVGPathElement>('[data-signature]').forEach(path => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' });
      });
      const heroNote = document.querySelector('.hero-photo-note');
      if (heroNote) gsap.fromTo(heroNote, { y: 18, rotation: -2 }, { y: 0, rotation: 0, duration: 1.1, ease: 'power3.out', clearProps: 'transform' });
      const spark = document.querySelector('.orbit-spark');
      if (spark) gsap.fromTo(spark, { scale: .65, rotation: -25 }, { scale: 1, rotation: 0, duration: 1.5, transformOrigin: '50% 50%', ease: 'power3.out', clearProps: 'transform,transformOrigin' });
      media = gsap.matchMedia();
      media.add('(min-width: 761px)', () => {
        document.querySelectorAll<HTMLElement>('[data-photo]').forEach((photo,index) => {
          gsap.fromTo(photo, { y: index === 1 ? 28 : 10 }, { y: index === 1 ? -24 : -10, ease: 'none', scrollTrigger: { trigger: photo.parentElement, start: 'top 90%', end: 'bottom 15%', scrub: .8 } });
        });
        const emblem = document.querySelector('.models-emblem svg');
        if (emblem) gsap.fromTo(emblem, { rotation: -8 }, { rotation: 8, ease: 'none', scrollTrigger: { trigger: '.models-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    });
  }
  configureMotion();
  const onMotionClick = () => {
    motionChoice = isReduced() ? 'full' : 'reduced';
    try { sessionStorage.setItem('ellen-motion', motionChoice); } catch { /* Navegação funciona sem armazenamento. */ }
    configureMotion();
  };
  motionButton?.addEventListener('click', onMotionClick);
  cleanupCallbacks.push(() => motionButton?.removeEventListener('click', onMotionClick));
  preference.addEventListener('change', configureMotion);
  cleanupCallbacks.push(() => preference.removeEventListener('change', configureMotion));
  const onResize = () => { if (window.innerWidth > 760) closeMenu(); };
  window.addEventListener('resize', onResize, { passive: true });
  cleanupCallbacks.push(() => window.removeEventListener('resize', onResize));
  window.addEventListener('pagehide', (event) => { if (event.persisted) return; media?.revert(); context?.revert(); cleanupCallbacks.forEach(clean => clean()); }, { once: true });
}
