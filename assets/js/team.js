// The team, in groups. Add, remove or reorder people here and the cards update to match.
//   title: the small heading above a group. Leave it as '' for no heading.
//   role: shown under the organisation. Leave it as '' to show nothing.
//   photo: path to their picture, e.g. P + 'Jane_Doe.jpg' (P is the assets/images/team/ folder). Leave it as '' to show a grey placeholder.
//   website / linkedin: optional. Any you fill in appear as small icons on the card.
const P = 'assets/images/team/';
const TEAM = [
  {
    title: '',
    people: [
      { name: 'Dr Zheng Yuan', role: 'Project lead', org: 'The University of Sheffield', photo: P + 'Zheng_Yuan.jpeg', website: 'https://www.cl.cam.ac.uk/~zy249/', linkedin: 'https://linkedin.com/in/zheng-yuan-a0979738' },
      { name: 'Dr Bei Peng', role: 'Project co-lead', org: 'The University of Sheffield', photo: P + 'Bei_Peng.png', website: 'https://beipeng.github.io/', linkedin: 'https://uk.linkedin.com/in/bei-peng-5b08b992' },
    ],
  },
  {
    title: 'Project Partners',
    people: [
      { name: 'Professor Li Yuan', role: '', org: 'University of Cambridge', photo: P + 'Li_Yuan.png', website: '', linkedin: 'https://www.linkedin.com/in/li-yuan-39921661/' },
      { name: 'Dr Imogen Casebourne', role: '', org: 'University of Cambridge', photo: P + 'Imogen_Casebourne.jpg', website: '', linkedin: 'https://uk.linkedin.com/in/imogen-c-6170111' },
      { name: 'Dr Luning Sun', role: '', org: 'University of Cambridge', photo: P + 'luning_sun.jpg', website: '', linkedin: 'https://www.linkedin.com/in/sunluning' },
      { name: 'Nora Petrova', role: '', org: 'Prolific', photo: P + 'Nora_Petrova.webp', website: '', linkedin: 'https://uk.linkedin.com/in/nora-petrova' },
      { name: 'Dr John Burden', role: '', org: 'Prolific', photo: P + 'John-Burden.jpg', website: 'https://johnburden.co.uk/', linkedin: 'https://uk.linkedin.com/in/john-burden-10966b358' },
      { name: 'Chengyu Huang', role: '', org: 'NetMind.AI', photo: P + 'Chengyu_Huang.jpeg', website: '', linkedin: 'https://www.linkedin.com/in/chengyu-huang-39373671' },
      { name: 'Xiangpeng Wan', role: '', org: 'NetMind.AI', photo: P + 'xiangpeng_wan.jpeg', website: '', linkedin: 'https://uk.linkedin.com/in/xiangpeng-wan-a26305107' },
      { name: 'Hongyi Gu', role: '', org: 'NetMind.AI', photo: '', website: '', linkedin: '' },
    ],
  },
  {
    title: 'Researchers',
    people: [
      { name: 'Supatat Chanwuttinant', role: '', org: 'The University of Sheffield', photo: P + 'Supatat_Chanwuttinant.jpg', website: '', linkedin: 'https://www.linkedin.com/in/supatat-chanwuttinant/' },
      { name: 'Haoming Sun', role: '', org: 'The University of Sheffield', photo: P + 'Haoming_Sun.jpeg', website: '', linkedin: 'https://uk.linkedin.com/in/haoming-sun-bb6a182ab' },
      { name: 'Kai Qian', role: '', org: 'The University of Sheffield', photo: P + 'Kai_Qian.jpeg', website: '', linkedin: 'https://www.linkedin.com/in/kai-qian/' },
    ],
  },
];

const ICONS = {
  website: '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7.5"/><path d="M2.5 10h15M10 2.5c2 2.1 3 4.6 3 7.5s-1 5.4-3 7.5c-2-2.1-3-4.6-3-7.5s1-5.4 3-7.5z"/></svg>',
  linkedin: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.77 2.5 4.77 5.76v5.69h-4v-5.04c0-1.2-.02-2.75-1.73-2.75-1.73 0-2 1.3-2 2.66v5.13h-4z"/></svg>',
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function photoHtml(m) {
  if (m.photo) {
    return `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy" class="h-full w-full object-cover object-[center_25%] transition duration-500 group-hover:scale-[1.03]" />`;
  }
  // No photo yet, so show a plain outline of a person
  return `<div class="grid h-full w-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200" role="img" aria-label="Photo placeholder">
    <svg class="h-1/2 w-1/2 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8.5" r="4.5"/><path d="M3 21c.8-4.4 4.4-7 9-7s8.2 2.6 9 7z"/></svg>
  </div>`;
}

// onPhoto: the desktop icons that sit over the photo. Otherwise the small icons at the bottom of the card on phones and tablets.
function linkHtml(href, kind, label, onPhoto) {
  if (!href) return '';
  const look = onPhoto
    ? 'h-8 w-8 bg-white/90 text-slate-700 shadow-sm backdrop-blur hover:bg-white'
    : 'h-7 w-7 bg-slate-100 text-slate-600 hover:bg-brand-50';
  return `<a href="${esc(href)}" target="_blank" rel="noopener" aria-label="${label}"
    class="grid place-items-center rounded-lg transition hover:text-brand-700 ${look}">${ICONS[kind]}</a>`;
}

function cardHtml(m) {
  const links = (onPhoto) =>
    linkHtml(m.website, 'website', `${m.name}’s website`, onPhoto) + linkHtml(m.linkedin, 'linkedin', `${m.name} on LinkedIn`, onPhoto);
  const hasLinks = m.website || m.linkedin;
  return `
    <article class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
      <div class="relative aspect-square overflow-hidden">
        ${photoHtml(m)}
        ${hasLinks ? `<div class="absolute inset-x-0 bottom-2 hidden translate-y-2 justify-center gap-1.5 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:flex">${links(true)}</div>` : ''}
      </div>
      <div class="flex flex-1 flex-col p-3 sm:p-4">
        <h4 class="font-display text-sm font-semibold leading-snug tracking-tight text-slate-950 sm:text-base">${esc(m.name)}</h4>
        <p class="mt-1 text-xs text-slate-500 sm:text-[0.8125rem]">${esc(m.org)}</p>
        ${m.role ? `<p class="text-xs text-slate-400 sm:text-[0.8125rem]">${esc(m.role)}</p>` : ''}
        ${hasLinks ? `<div class="mt-auto flex gap-1.5 pt-3 lg:hidden">${links(false)}</div>` : ''}
      </div>
    </article>`;
}

function initTeam() {
  const wrap = document.getElementById('team-groups');
  if (!wrap) return;
  wrap.innerHTML = TEAM.map(({ title, people }) => `
    <div>
      ${title ? `<h3 class="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">${esc(title)}</h3>` : ''}
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">${people.map(cardHtml).join('')}</div>
    </div>`).join('');
}

(window.sectionsReady || Promise.resolve()).then(initTeam);
