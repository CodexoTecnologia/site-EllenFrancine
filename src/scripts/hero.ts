import gsap from 'gsap';

export function initHero(isReduced: () => boolean, enableMotion: () => void) {
  const root = document.querySelector<HTMLElement>('[data-hero-showcase]');
  const frames = root ? [...root.querySelectorAll<HTMLElement>('[data-hero-frame]')] : [];
  if (!root || frames.length < 2) return { refresh: () => {}, cleanup: () => {} };
  const controls = root.querySelector<HTMLElement>('[data-hero-controls]')!;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-hero-select]')];
  const playback = root.querySelector<HTMLButtonElement>('[data-hero-playback]')!;
  const label = root.querySelector<HTMLElement>('[data-playback-label]')!;
  const icon = root.querySelector<HTMLElement>('[data-playback-icon]')!;
  const count = root.querySelector<HTMLElement>('[data-hero-counter]')!;
  const status = root.querySelector<HTMLElement>('[data-hero-status]')!;
  let current = 0,
    request = 0;
  let manualPause = false,
    hovering = false,
    inView = false,
    disposed = false;
  let timer: gsap.core.Tween | undefined;
  let transition: gsap.core.Tween | undefined;
  const canPlay = () => !isReduced() && !manualPause && !hovering && inView && !document.hidden;
  function refresh() {
    timer?.kill();
    if (isReduced()) transition?.progress(1);
    label.textContent = isReduced()
      ? 'Ativar animações'
      : manualPause
        ? 'Reproduzir fotos'
        : 'Pausar fotos';
    icon.textContent = manualPause || isReduced() ? '▷' : 'Ⅱ';
    root!.dataset.playing = String(canPlay());
    if (canPlay())
      timer = gsap.delayedCall(7, () => {
        void select((current + 1) % frames.length, false);
      });
  }
  async function select(index: number, manual: boolean) {
    const token = ++request;
    if (manual) manualPause = true;
    timer?.kill();
    if (index === current) {
      refresh();
      return;
    }
    const next = frames[index];
    const image = next.querySelector('img')!;
    image.loading = 'eager';
    try {
      await image.decode();
    } catch {
      if (!disposed && token === request) {
        if (manual) status.textContent = 'Não foi possível abrir esse retrato. Tente pela galeria.';
        manualPause = true;
        refresh();
      }
      return;
    }
    if (disposed || token !== request || (!manual && !canPlay())) return;
    transition?.progress(1);
    current = index;
    frames.forEach((frame, item) => frame.setAttribute('aria-hidden', String(item !== index)));
    next.hidden = false;
    next.style.zIndex = '2';
    const finish = () =>
      frames.forEach((frame, item) => {
        frame.hidden = item !== current;
        frame.style.removeProperty('z-index');
      });
    buttons.forEach((button, item) => button.setAttribute('aria-pressed', String(item === index)));
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
    if (manual) status.textContent = `Retrato ${index + 1} de ${frames.length}.`;
    if (isReduced()) finish();
    else
      transition = gsap.fromTo(
        next,
        { opacity: 0, scale: 1.035 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          onComplete: finish,
        },
      );
    refresh();
  }
  controls.hidden = false;
  const listeners = buttons.map((button, index) => {
    const click = () => {
      void select(index, true);
    };
    button.addEventListener('click', click);
    return () => button.removeEventListener('click', click);
  });
  const onPlayback = () => {
    if (isReduced()) {
      manualPause = false;
      enableMotion();
      return;
    }
    manualPause = !manualPause;
    refresh();
  };
  const enter = () => {
    hovering = true;
    refresh();
  };
  const leave = () => {
    hovering = false;
    refresh();
  };
  const focus = (event: FocusEvent) => {
    if (event.target !== playback) {
      manualPause = true;
      refresh();
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.25;
      refresh();
    },
    { threshold: [0, 0.25] },
  );
  observer.observe(root);
  root.addEventListener('pointerenter', enter);
  root.addEventListener('pointerleave', leave);
  root.addEventListener('focusin', focus);
  playback.addEventListener('click', onPlayback);
  document.addEventListener('visibilitychange', refresh);
  refresh();
  return {
    refresh,
    cleanup: () => {
      disposed = true;
      request++;
      timer?.kill();
      transition?.revert();
      observer.disconnect();
      listeners.forEach((cleanup) => cleanup());
      root.removeEventListener('pointerenter', enter);
      root.removeEventListener('pointerleave', leave);
      root.removeEventListener('focusin', focus);
      playback.removeEventListener('click', onPlayback);
      document.removeEventListener('visibilitychange', refresh);
    },
  };
}
