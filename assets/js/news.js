// Oldest first; the page shows the newest at the top.
//   href: links the whole title.
//   links: links just some words in the title instead. Each text must match the title exactly.
const NEWS = [
  {
    title: '1st Learning Together Co-Design Workshop, Who Should AI Be in the Team? Co-designing Inclusive Human–AI Collaboration, held as part of the first Asia-Europe Education Next Fellowship (ASEFNextEd1) Conference, co-located with the UNU Macau AI Conference 2026, Macau SAR, China, 26 November 2026.',
    links: [
      { text: 'Who Should AI Be in the Team? Co-designing Inclusive Human–AI Collaboration', href: 'https://unu.edu/macau/aiconf2026/program/workshop/asef-programme-workshop-human-ai-collaboration-who-should-ai-be-team-co-designing' },
      { text: 'UNU Macau AI Conference 2026', href: 'https://unu.edu/macau/aiconf2026' },
    ],
  },
  {
    title: '2nd Learning Together Co-Design Workshop, Who Should AI Be in the Team? Co-designing Inclusive Human–AI Collaboration, co-located with the International Symposium on AI-Empowered Innovation and Development in Teacher Education, Zhuhai, China, 28 November 2026.',
  },
];

// Shown a few at a time, with page numbers underneath.
// The page number is kept in the address (?page=2), so it can be shared and the back button works.
const NEWS_PER_PAGE = 5;

const escNews = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const inlineLink = 'underline decoration-slate-300 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-700';

const newsItemHtml = ({ title, href, links = [] }) => {
  const text = 'font-display text-lg font-semibold leading-snug tracking-tight text-slate-950 sm:text-xl';
  // The &nbsp; keeps the arrow on the same line as the last word.
  if (href) return `<li>
  <a href="${escNews(href)}" target="_blank" rel="noopener" class="group ${text} transition-colors hover:text-brand-700">${escNews(title)}&nbsp;<span class="text-slate-400 transition-colors group-hover:text-brand-700" aria-hidden="true">↗</span></a>
</li>`;
  let html = escNews(title);
  for (const l of links) {
    html = html.replace(escNews(l.text), `<a href="${escNews(l.href)}" target="_blank" rel="noopener" class="${inlineLink}">${escNews(l.text)}</a>`);
  }
  return `<li class="${text}">${html}</li>`;
};

function initNews() {
  const list = document.getElementById('news-list');
  const nav = document.getElementById('news-pagination');
  if (!list || !nav) return;

  // Show the news items in reverse order (most recent first)
  let html = '';
  for (let i = NEWS.length - 1; i >= 0; i--) html += newsItemHtml(NEWS[i]);
  list.innerHTML = html;
  const items = [...list.children];
  const pageCount = Math.ceil(items.length / NEWS_PER_PAGE);

  const pageFromUrl = () => {
    const n = parseInt(new URLSearchParams(window.location.search).get('page'), 10);
    return Math.min(Math.max(n || 1, 1), Math.max(pageCount, 1));
  };

  const button = (label, page, { current = false, disabled = false, aria = '' } = {}) => {
    const look = current
      ? 'bg-slate-950 text-white'
      : disabled
        ? 'text-slate-300'
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950';
    return `<button type="button" data-page="${page}" ${disabled ? 'disabled' : ''} ${current ? 'aria-current="page"' : ''}
      ${aria ? `aria-label="${aria}"` : ''} class="grid h-10 min-w-10 place-items-center rounded-lg px-3 text-sm font-medium transition ${look}">${label}</button>`;
  };

  const show = (page) => {
    items.forEach((li, i) => {
      li.hidden = Math.floor(i / NEWS_PER_PAGE) !== page - 1;
    });

    if (pageCount <= 1) {
      nav.innerHTML = '';
      return;
    }
    const numbers = Array.from({ length: pageCount }, (_, i) => button(i + 1, i + 1, { current: i + 1 === page }));
    nav.innerHTML =
      button('←', page - 1, { disabled: page === 1, aria: 'Previous page' }) +
      numbers.join('') +
      button('→', page + 1, { disabled: page === pageCount, aria: 'Next page' });
  };

  nav.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-page]');
    if (!b || b.disabled) return;
    const page = Number(b.dataset.page);
    const url = new URL(window.location.href);
    if (page === 1) url.searchParams.delete('page');
    else url.searchParams.set('page', page);
    history.pushState(null, '', url);
    show(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('popstate', () => show(pageFromUrl()));
  show(pageFromUrl());
}

document.addEventListener('DOMContentLoaded', initNews);
