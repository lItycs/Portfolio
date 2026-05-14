window.PortfolioModal = (() => {
  const modal = document.getElementById('imageModal');
  const image = document.getElementById('modalImg');
  const meta = document.getElementById('modalMeta');
  const title = document.getElementById('modalTitle');
  const description = document.getElementById('modalDescription');
  const closeButton = document.querySelector('[data-modal-close]');

  function open(item) {
    if (!modal || !image || !item?.image) return;

    image.src = item.image;
    image.alt = item.alt || item.title || 'Матеріал з портфоліо';
    meta.textContent = item.meta || '';
    title.textContent = item.title || '';
    description.textContent = item.description || '';

    document.body.classList.add('modal-open');

    if (typeof modal.showModal === 'function') {
      if (!modal.open) modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function close() {
    if (!modal) return;
    document.body.classList.remove('modal-open');

    if (modal.open && typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  closeButton?.addEventListener('click', close);

  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) close();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.open) close();
  });

  modal?.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
  });

  return { open, close };
})();
