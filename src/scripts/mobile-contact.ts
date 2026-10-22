export function initMobileContact(menu: HTMLDetailsElement | null) {
  const bar = document.querySelector<HTMLElement>('[data-mobile-contact]');
  const hero = document.querySelector<HTMLElement>('[data-hero-contact]');
  const contact = document.querySelector<HTMLElement>('#conversar');
  const footer = document.querySelector<HTMLElement>('.site-footer');
  if (!bar || !hero || !contact || !footer || !('IntersectionObserver' in window)) return () => {};
  const header = document.querySelector<HTMLElement>('[data-header]');
  const update = () => {
    const pastHero =
      hero.getBoundingClientRect().bottom < (header?.getBoundingClientRect().bottom || 0);
    const atContact = contact.getBoundingClientRect().top < window.innerHeight;
    const atFooter = footer.getBoundingClientRect().top < window.innerHeight;
    bar.hidden = !pastHero || atContact || atFooter || Boolean(menu?.open);
  };
  const observer = new IntersectionObserver(update, { threshold: [0, 1] });
  [hero, contact, footer].forEach((element) => observer.observe(element));
  // A sticky header can cover the action before it leaves the viewport.
  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      update();
      frame = 0;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  menu?.addEventListener('toggle', update);
  document.documentElement.classList.add('has-mobile-contact');
  update();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', update);
    menu?.removeEventListener('toggle', update);
    document.documentElement.classList.remove('has-mobile-contact');
  };
}
