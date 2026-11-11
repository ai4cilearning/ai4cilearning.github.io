// The team. Add, remove or reorder people here and the cards update to match.
//   photo: path to their picture, e.g. 'assets/images/team/jane-doe.jpg'. Leave it as '' to show a grey placeholder.
//   website / linkedin: optional. Any you fill in appear as small icons when you hover over the card.
const TEAM = [
  { name: 'Prof. Team Member', area: 'Research area', org: 'Institution (PI)', photo: '', website: '#', linkedin: '#' },
  { name: 'Prof. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
  { name: 'Prof. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '' },
  { name: 'Prof. Team Member', area: 'Research area, second area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '', linkedin: '#' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
  { name: 'Dr. Team Member', area: 'Research area', org: 'Institution', photo: '', website: '#', linkedin: '#' },
];

const ICONS = {
  website: '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7.5"/><path d="M2.5 10h15M10 2.5c2 2.1 3 4.6 3 7.5s-1 5.4-3 7.5c-2-2.1-3-4.6-3-7.5s1-5.4 3-7.5z"/></svg>',
  linkedin: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76v5.69h-4v-5.04c0-1.2-.02-2.75-1.73-2.75-1.73 0-2 1.3-2 2.66v5.13h-4z"/></svg>',
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function photoHtml(m) {
  if (m.photo) {
    return `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />`;
  }
  // No photo yet, so show a plain outline of a person
  return `<div class="grid h-full w-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200" role="img" aria-label="Photo placeholder">
    <svg class="h-1/2 w-1/2 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4.5"/><path d="M3 21c.8-4.4 4.4-7 9-7s8.2 2.6 9 7z"/></svg>
  </div>`;
}

function linkHtml(href, kind, label) {
  if (!href) return '';
  return `<a href="${esc(href)}" target="_blank" rel="noopener" aria-label="${label}"
    class="grid h-8 w-8 place-items-center rounded-lg sm:h-9 sm:w-9 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:text-brand-700">${ICONS[kind]}</a>`;
}

function initTeam() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;
  grid.innerHTML = TEAM.map((m) => {
    const links = linkHtml(m.website, 'website', `${m.name}’s website`) + linkHtml(m.linkedin, 'linkedin', `${m.name} on LinkedIn`);
    return `
    <article class="group flex w-[calc((100%-1rem)/2)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60
                    md:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-4.5rem)/4)]">
      <div class="relative aspect-square overflow-hidden">
        ${photoHtml(m)}
        ${links ? `<div class="absolute inset-x-0 bottom-3 flex justify-center gap-2 transition lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">${links}</div>` : ''}
      </div>
      <div class="flex-1 p-4 sm:p-5">
        <h3 class="font-display text-base font-semibold leading-snug sm:text-lg tracking-tight text-slate-950">${esc(m.name)}</h3>
        <p class="mt-1.5 text-sm text-slate-500">${esc(m.area)}</p>
        <p class="text-sm text-slate-400">${esc(m.org)}</p>
      </div>
    </article>`;
  }).join('');
}

(window.sectionsReady || Promise.resolve()).then(initTeam);
