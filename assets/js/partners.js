// Our partners, shown in this order. Add, remove or reorder them here.
//   page: their own page in /partners, written without .html (e.g. 'partners/prolific'). Copy an existing page to start a new one.
//   logo: path to their logo. Leave it as '' and we just show their name instead.
const PARTNERS = [
  { name: 'Prolific', page: 'partners/prolific', logo: 'assets/images/partners/prolific.svg' },
  { name: 'NetMind.AI', page: 'partners/netmind', logo: 'assets/images/partners/netmind.svg' },
];

function initPartners() {
  const grid = document.getElementById('partner-grid');
  if (!grid) return;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  grid.innerHTML = PARTNERS.map((p) => {
    const mark = p.logo
      ? `<img src="${esc(p.logo)}" alt="${esc(p.name)}" class="max-h-9 w-auto max-w-[75%] opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0" />`
      : `<span class="font-display text-2xl font-semibold tracking-tight text-slate-500 transition group-hover:text-slate-950">${esc(p.name)}</span>`;
    return `
    <a href="${esc(p.page)}" aria-label="About ${esc(p.name)}"
       class="group relative grid h-32 w-[calc((100%-1rem)/2)] place-items-center rounded-2xl border border-slate-200 bg-white px-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60
              md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]">
      ${mark}
      <span class="absolute bottom-3 right-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        Learn more <span aria-hidden="true">→</span>
      </span>
    </a>`;
  }).join('');
}

(window.sectionsReady || Promise.resolve()).then(initPartners);
