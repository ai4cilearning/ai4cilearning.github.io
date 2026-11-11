// Adds the same header and footer to every page, runs the mobile menu,
// and highlights the nav link for the section you're looking at.
const SITE_NAME = 'Learning Together';

// Nav links. Each id matches a <section id="..."> on the home page.
const NAV_LINKS = [
  { id: 'about-project', label: 'About' },
  { id: 'research-questions', label: 'Research' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'team', label: 'Team' },
  { id: 'partners', label: 'Partners' },
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
// Links use the site root (/) rather than /index.html, so the address bar stays clean.
const sectionHref = (id) => (isHomePage() ? `#${id}` : siteUrl(`#${id}`));

function renderHeader() {
  const link = ({ id, label }, mobile = false) => {
    const base = mobile
      ? 'block rounded-md px-3 py-2 text-base text-slate-600 hover:bg-slate-50 hover:text-slate-950'
      : 'relative px-3 py-2 text-[15px] text-slate-500 transition-colors hover:text-slate-950';
    return `<a href="${sectionHref(id)}" data-nav="${id}" class="${base}">${label}</a>`;
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
      <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">${NAV_LINKS.map(({ id, label }) => `<a href="${sectionHref(id)}" class="hover:text-slate-900">${label}</a>`).join('')}</div>
    </div>
  </footer>`;
}

// Highlight whichever section is in the middle of the screen.
function initScrollSpy() {
  const links = [...document.querySelectorAll('header [data-nav]')];
  const sections = NAV_LINKS.map(({ id }) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

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

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
    { rootMargin: '-45% 0px -50% 0px' } // a thin band across the middle of the viewport
  );
  sections.forEach((s) => observer.observe(s));
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
  // Close the mobile menu once a link is tapped
  menu?.addEventListener('click', (e) => e.target.closest('a') && setMenu(false));

  // Sections are loaded in by include.js, so wait for them before watching the scroll.
  if (isHomePage()) (window.sectionsReady || Promise.resolve()).then(initScrollSpy);
});
