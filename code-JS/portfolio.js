window.Portfolio = (() => {
  const grid = document.querySelector('[data-portfolio-grid]');
  const buttons = [...document.querySelectorAll('.filter-btn')];
  const items = [
    ...(window.PORTFOLIO_WORKS || []),
    ...(window.PORTFOLIO_CERTIFICATES || []),
    ...(window.PORTFOLIO_REVIEWS || [])
  ];

  function createMedia(item) {
    const mediaButton = document.createElement('button');
    mediaButton.className = 'portfolio-media';
    mediaButton.type = 'button';
    mediaButton.setAttribute('aria-label', `Відкрити: ${item.title}`);

    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.alt || item.title;
    image.loading = 'lazy';

    mediaButton.append(image);
    mediaButton.addEventListener('click', () => window.PortfolioModal?.open(item));
    return mediaButton;
  }

  function createPortfolioCard(item) {
    const card = document.createElement('article');
    card.className = `portfolio-item ${item.category}`;
    card.dataset.category = item.category;

    card.append(createMedia(item));

    const body = document.createElement('div');
    body.className = 'portfolio-body';

    const meta = document.createElement('span');
    meta.textContent = item.meta;

    const title = document.createElement('h3');
    title.textContent = item.title;

    const description = document.createElement('p');
    description.textContent = item.description;

    body.append(meta, title, description);
    card.append(body);
    return card;
  }

  function createReviewCard(item) {
    const card = document.createElement('article');
    card.className = 'portfolio-item review';
    card.dataset.category = item.category;

    const review = document.createElement('div');
    review.className = 'review-card';

    const text = document.createElement('p');
    text.textContent = `“${item.text}”`;

    const author = document.createElement('strong');
    author.textContent = item.author;

    review.append(text, author);
    card.append(review);
    return card;
  }

  function render() {
    if (!grid) return;

    const cards = items.map((item) => item.category === 'review' ? createReviewCard(item) : createPortfolioCard(item));
    grid.replaceChildren(...cards);
  }

  function setFilter(filter = 'project') {
    buttons.forEach((button) => {
      const isActive = button.dataset.filter === filter;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    grid?.querySelectorAll('.portfolio-item').forEach((item) => {
      item.hidden = item.dataset.category !== filter;
    });
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  document.querySelectorAll('[data-filter-link]').forEach((link) => {
    link.addEventListener('click', () => {
      window.setTimeout(() => setFilter(link.dataset.filterLink), 120);
    });
  });

  return { render, setFilter };
})();
