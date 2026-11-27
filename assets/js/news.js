// The news, newest first. A title with an href links to the full story on another site, opening in a new tab.
// Leave href out (or as '') for news with no link.
const NEWS = [
  {
    title: 'Co-Design Inclusive Human-AI Collaboration: ASEF Workshop at the UNU Macau AI Conference on 26 November 2026',
    href: 'https://unu.edu/macau/aiconf2026/program/workshop/asef-programme-workshop-human-ai-collaboration-who-should-ai-be-team-co-designing',
  },
  {
    title: 'Co-Design Inclusive Human-AI Collaboration: ASEF Workshop at BNU (Zhuhai) on 28 November 2026',
    // href: 'https://www.bnu.edu.cn/zhuhai/news/asef-workshop-human-ai-collaboration'
  }
];

// Shown a few at a time, with page numbers underneath.
// The page number is kept in the address (?page=2), so it can be shared and the back button works.
const NEWS_PER_PAGE = 5;

const escNews = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Items without an href show as plain text. The &nbsp; keeps the arrow on the same line as the last word.
const newsItemHtml = ({ title, href }) => {
  const text = 'font-display text-lg font-semibold leading-snug tracking-tight text-slate-950 sm:text-xl';
  if (!href) return `<li class="${text} cursor-pointer">${escNews(title)}</li>`;
  return `<li>
  <a href="${escNews(href)}" target="_blank" rel="noopener" class="group ${text} transition-colors hover:text-brand-700">${escNews(title)}&nbsp;<span class="text-slate-400 transition-colors group-hover:text-brand-700" aria-hidden="true">↗</span></a>
</li>`;
};

function initNews() {
  const list = document.getElementById('news-list');
  const nav = document.getElementById('news-pagination');
  if (!list || !nav) return;

  list.innerHTML = NEWS.map(newsItemHtml).join('');
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
