// Adds the same header and footer to every page, runs the mobile menu,
// and highlights the nav link for the section you're looking at.
const SITE_NAME = 'Learning Together';

// Nav links: id scrolls to a <section id="..."> on the home page, page opens a separate page.
const NAV_LINKS = [
  { id: 'about-project', label: 'About' },
  { id: 'research-questions', label: 'Research' },
  { page: 'news.html', label: 'News' },
  { id: 'team', label: 'Team' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact', label: 'Contact' },
];

// Work out where the site starts from this file's own location (two folders up),
// so links still work on pages inside folders like /partners/.
const SITE_ROOT = new URL('../../', document.currentScript.src);
const siteUrl = (path) => new URL(path, SITE_ROOT).href;

function isHomePage() {
  const rel = window.location.pathname.slice(SITE_ROOT.pathname.length);
  return rel === '' || rel === 'index.html';
}

// On the home page a link just scrolls down. On other pages it takes you back to the home page at that section.
const sectionHref = (id) => (isHomePage() ? `#${id}` : siteUrl(`#${id}`));
const navHref = ({ id, page }) => (page ? siteUrl(page) : sectionHref(id));

const isCurrentPage = (page) => !!page && window.location.pathname.endsWith(`/${page}`);

function renderHeader() {
  const link = (l, mobile = false) => {
    const current = isCurrentPage(l.page);
    const base = mobile
      ? `block rounded-md px-3 py-2 text-base hover:bg-slate-50 hover:text-slate-950 ${current ? 'font-medium text-slate-950' : 'text-slate-600'}`
      : `relative px-3 py-2 text-[15px] transition-colors hover:text-slate-950 ${current ? 'font-medium text-slate-950' : 'text-slate-500'}`;
    const attrs = l.page ? (current ? ' aria-current="page"' : '') : ` data-nav="${l.id}"`;
    return `<a href="${navHref(l)}"${attrs} class="${base}">${l.label}</a>`;
  };

  return `
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6" aria-label="Main">
      <a href="${isHomePage() ? '#' : siteUrl('')}" class="font-display text-lg tracking-tight text-slate-950">
        <span class="font-bold">Learning</span> Together
      </a>
      <div class="hidden items-center gap-1 md:flex">${NAV_LINKS.map((l) => link(l)).join('')}</div>
      <button id="menu-toggle" class="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </nav>
    <div id="mobile-menu" class="hidden border-t border-slate-200 px-4 py-2 md:hidden">
      ${NAV_LINKS.map((l) => link(l, true)).join('')}
    </div>
  </header>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="mt-16 border-t border-slate-200 bg-white">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
      <p>&copy; ${year} ${SITE_NAME}. All rights reserved.</p>
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">${NAV_LINKS.map((l) => `<a href="${navHref(l)}" class="hover:text-slate-900">${l.label}</a>`).join('')}</div>
    </div>
  </footer>`;
}

function initScrollSpy() {
  const links = [...document.querySelectorAll('header [data-nav]')];
  const sections = [...document.querySelectorAll('section[id]')].filter((s) => s.id !== 'hero');
  // Sections without their own nav link light up the link they belong under.
  const PARENT = { roadmap: 'research-questions' };
  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((a) => {
      const on = a.dataset.nav === id;
      a.classList.toggle('text-slate-950', on);
      a.classList.toggle('font-medium', on);
      a.classList.toggle('text-slate-500', !on && !a.closest('#mobile-menu'));
      if (on) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
  };

  const update = () => {
    const line = window.innerHeight / 3;
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = PARENT[s.id] || s.id;
    setActive(current);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.outerHTML = renderHeader();
  if (footer) footer.outerHTML = renderFooter();

  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle?.addEventListener('click', () => setMenu(menu.classList.contains('hidden')));
  menu?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));

  // Sections are loaded in by include.js, so wait for them before watching the scroll.
  if (isHomePage()) (window.sectionsReady || Promise.resolve()).then(initScrollSpy);
});
