// Swaps each <div data-include="file.html"> for the contents of that file.
// Other scripts can wait on window.sectionsReady to know when everything has loaded.
// This only works when the site is served (GitHub Pages, or `python3 -m http.server` locally),
// not when you open index.html straight from your computer.
window.sectionsReady = (async () => {
  const slots = [...document.querySelectorAll('[data-include]')];
  const html = await Promise.all(
    slots.map(async (slot) => {
      const url = slot.dataset.include;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return await res.text();
      } catch (err) {
        console.error(`include.js: could not load ${url}`, err);
        return `<!-- failed to load ${url} -->`;
      }
    })
  );
  slots.forEach((slot, i) => (slot.outerHTML = html[i]));

  // If the link had a #section in it, the browser tried to jump there before the sections existed.
  // Jump again now. The short wait lets the team and partner cards appear first so we land in the right spot.
  if (location.hash) {
    setTimeout(() => {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
    }, 0);
  }
})();
