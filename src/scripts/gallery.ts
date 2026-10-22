export function initGallery() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-photo-viewer]');
  const photos = [...document.querySelectorAll<HTMLAnchorElement>('[data-gallery-photo]')];
  if (!dialog || !photos.length || typeof dialog.showModal !== 'function') return () => {};
  const image = dialog.querySelector<HTMLImageElement>('[data-viewer-image]')!;
  const title = dialog.querySelector<HTMLElement>('[data-viewer-title]')!;
  const count = dialog.querySelector<HTMLElement>('[data-viewer-count]')!;
  const status = dialog.querySelector<HTMLElement>('[data-viewer-status]')!;
  const close = dialog.querySelector<HTMLButtonElement>('[data-viewer-close]')!;
  const previous = dialog.querySelector<HTMLButtonElement>('[data-viewer-prev]')!;
  const next = dialog.querySelector<HTMLButtonElement>('[data-viewer-next]')!;
  let index = 0;
  let opener: HTMLAnchorElement | undefined;

  function showPhoto(value: number) {
    index = (value + photos.length) % photos.length;
    const photo = photos[index];
    const source = photo.querySelector('img');
    image.src = photo.href;
    image.alt = source?.alt || '';
    image.width = source?.width || 1200;
    image.height = source?.height || 1200;
    title.textContent = photo.dataset.photoTitle || '';
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    status.textContent = `Foto ${index + 1} de ${photos.length}`;
  }
  const listeners = photos.map((photo, photoIndex) => {
    const open = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      opener = photo;
      showPhoto(photoIndex);
      dialog.showModal();
      document.documentElement.classList.add('photo-viewer-open');
      close.focus();
    };
    photo.addEventListener('click', open);
    return () => photo.removeEventListener('click', open);
  });
  const onClose = () => {
    document.documentElement.classList.remove('photo-viewer-open');
    opener?.focus({ preventScroll: true });
  };
  const closePhoto = () => dialog.close();
  const goBack = () => showPhoto(index - 1);
  const goNext = () => showPhoto(index + 1);
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  };
  const onBackdrop = (event: MouseEvent) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      dialog.close();
  };
  dialog.addEventListener('close', onClose);
  dialog.addEventListener('keydown', onKey);
  dialog.addEventListener('click', onBackdrop);
  close.addEventListener('click', closePhoto);
  previous.addEventListener('click', goBack);
  next.addEventListener('click', goNext);
  return () => {
    if (dialog.open) dialog.close();
    document.documentElement.classList.remove('photo-viewer-open');
    listeners.forEach((cleanup) => cleanup());
    dialog.removeEventListener('close', onClose);
    dialog.removeEventListener('keydown', onKey);
    dialog.removeEventListener('click', onBackdrop);
    close.removeEventListener('click', closePhoto);
    previous.removeEventListener('click', goBack);
    next.removeEventListener('click', goNext);
  };
}
