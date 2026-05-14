window.Comments = (() => {
  const STORAGE_KEY = 'lizaPortfolioComments';
  const form = document.getElementById('commentForm');
  const list = document.getElementById('commentsList');

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function save(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  }

  function createEmptyState() {
    const empty = document.createElement('p');
    empty.className = 'comments-empty';
    empty.textContent = 'Поки що коментарів немає. Ваш відгук з’явиться тут після відправлення.';
    return empty;
  }

  function createElement({ name, comment, date }) {
    const item = document.createElement('article');
    item.className = 'comment';

    const meta = document.createElement('div');
    meta.className = 'comment-meta';

    const author = document.createElement('strong');
    author.textContent = name;

    const time = document.createElement('small');
    time.textContent = date || '';

    const text = document.createElement('p');
    text.textContent = comment;

    meta.append(author, time);
    item.append(meta, text);
    return item;
  }

  function render() {
    if (!list) return;
    const comments = read();
    list.replaceChildren(...(comments.length ? comments.map(createElement) : [createEmptyState()]));
  }

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameInput = document.getElementById('userName');
    const commentInput = document.getElementById('userComment');
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) return;

    const newComment = {
      name,
      comment,
      date: new Intl.DateTimeFormat('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date())
    };

    save([newComment, ...read()].slice(0, 12));
    render();
    form.reset();
  });

  return { render };
})();
