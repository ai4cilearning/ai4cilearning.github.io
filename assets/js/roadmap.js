// Colours the roadmap steps based on data-current in sections/roadmap.html.
// Earlier WPs are marked Completed, the current one In progress, and later ones Upcoming.
// The lines between steps turn blue up to where we are now.
function initRoadmap() {
  const root = document.getElementById('roadmap');
  if (!root) return;
  const total = 3;
  // 1, 2 or 3 is the WP in progress. 4 means all of them are finished.
  const current = Math.min(Math.max(Number(root.dataset.current) || 1, 1), total + 1);
  const check = '<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z" clip-rule="evenodd"/></svg>';
  const states = {
    done: { dot: 'border-brand-600 bg-brand-600 text-white', status: 'bg-slate-100 text-slate-600', label: 'Completed' },
    current: { dot: 'border-brand-600 bg-white text-brand-700 ring-4 ring-brand-100', status: 'bg-brand-50 text-brand-700', label: 'In progress' },
    upcoming: { dot: 'border-slate-200 bg-white text-slate-400', status: 'text-slate-400', label: 'Upcoming' },
  };

  // Phones: fill the line across the top
  const fill = root.querySelector('[data-fill]');
  if (fill) fill.style.width = `${Math.min((current - 1) / (total - 1), 1) * 100}%`;

  // Desktop: colour each line that leads out of a finished WP
  root.querySelectorAll('[data-line]').forEach((line) => {
    if (Number(line.dataset.line) < current) line.classList.replace('bg-slate-200', 'bg-brand-600');
  });

  root.querySelectorAll('[data-step]').forEach((a) => {
    const n = Number(a.dataset.step);
    const key = n < current ? 'done' : n === current ? 'current' : 'upcoming';
    const st = states[key];
    const dot = a.querySelector('[data-dot]');
    dot.className += ' ' + st.dot;
    dot.innerHTML = key === 'done' ? check : n;
    const status = a.querySelector('[data-status]');
    status.className += ' ' + st.status;
    status.textContent = st.label;
    if (key === 'current') a.setAttribute('aria-current', 'step');
  });
}

// The roadmap is loaded in by include.js, so wait until it's on the page.
(window.sectionsReady || Promise.resolve()).then(initRoadmap);
