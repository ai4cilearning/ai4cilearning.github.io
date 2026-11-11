# Learning Together

Website for **Learning Together: Designing Inclusive Human-AI Teams for Collective Decision-Making**,
a project funded by AI4CI and UKRI EPSRC.

Live at **https://ai4cilearning.github.io**

The site is plain HTML and JavaScript, styled with Tailwind CSS loaded from a CDN. There's nothing to install
and no build step: edit a file, refresh the browser, push to publish.

## What's where

The home page is one long scrolling page. Each part of it lives in its own file in `sections/`, so you can
edit one section without wading through the rest.

```
index.html                  Home page. Loads the sections below, in this order
sections/
  hero.html                 Title, short description and funder logos
  about-project.html        About the project
  research.html             Research questions and benchmark tasks
  roadmap.html              The three work packages and the progress steps
  team.html                 Team (the people are listed in assets/js/team.js)
  partners.html             Partners (the list is in assets/js/partners.js)
partners/
  prolific.html             A page for each partner
  netmind.html
publication.html            Publications (says "In progress" for now; linked from the hero)
404.html                    Shown when someone visits a page that doesn't exist

assets/
  css/styles.css            A few hand-written styles (hero grid, floating icons, smooth scrolling)
  images/                   Funder logos (AI4CI, UKRI EPSRC)
  images/partners/          Partner logos
  js/main.js                Header, footer, mobile menu and nav links
  js/include.js             Loads the section files into the home page
  js/roadmap.js             Colours the roadmap steps
  js/team.js                The list of team members
  js/partners.js            The list of partners
  js/tailwind-config.js     Site colours and fonts

serve.py                    Preview the site on your computer (see below)
.nojekyll                   Tells GitHub Pages to serve the files as they are
```

## Common edits

### Update roadmap progress

In `sections/roadmap.html`, change `data-current` on the `<section id="roadmap">` line:

- `1`, `2` or `3`: that work package is **In progress**. Earlier ones show as **Completed**, later ones as **Upcoming**.
- `4`: all three are **Completed**.

The text for each work package is further down the same file, inside the matching card.

### Add or change team members

Edit the `TEAM` list at the top of `assets/js/team.js`. Each person looks like this:

```js
{ name: 'Dr. Jane Doe', area: 'Research area', org: 'University', photo: 'assets/images/team/jane-doe.jpg', website: 'https://…', linkedin: 'https://…' },
```

- **photo**: put the picture in `assets/images/team/`. Leave it as `''` to show a grey placeholder.
- **website / linkedin**: optional. Leave either as `''` and its icon won't show.

People appear in the same order as the list.

### Add a partner

1. Copy `partners/prolific.html` to `partners/<name>.html`, then change the name, logo, About text and
   "In this project" box.
2. Put their logo in `assets/images/partners/`.
3. Add them to the `PARTNERS` list in `assets/js/partners.js`:
   `{ name: '…', page: 'partners/<name>', logo: 'assets/images/partners/<file>' }`

### Change the navigation

The links in the header and footer come from `NAV_LINKS` in `assets/js/main.js`. Each link is
`{ id: '…', label: '…' }`, where `id` is the `id` of a section on the home page. Clicking a link scrolls to
that section. On partner pages, the same links take you back to the home page at that section. The link for
whichever section you're looking at is highlighted as you scroll.

### Add a new section to the home page

1. Create `sections/my-section.html`. Start it with
   `<section id="my-section" class="scroll-mt-20 …">`. The `scroll-mt-20` class stops the sticky header
   covering the section's title when you jump to it.
2. In `index.html`, add `<div data-include="sections/my-section.html"></div>` inside `<main>`, in the
   position you want it.
3. To list it in the nav, add `{ id: 'my-section', label: '…' }` to `NAV_LINKS`.

`<script>` tags inside a section file won't run. Put any JavaScript in `assets/js/`, load it from
`index.html`, and wait for the sections to load first. `roadmap.js` shows how.

## Preview on your computer

```sh
python3 serve.py
```

Then open http://localhost:8000. Stop it with Ctrl+C.

Use this rather than double-clicking `index.html`. The sections are loaded in by the browser, and that only
works through a server. Opened straight from your computer, the home page shows up blank.

`python3 -m http.server` also works, but `serve.py` behaves more like the live site: addresses without
`.html` work (`/publication` opens `publication.html`), and missing pages show our own `404.html`.

Link to pages without `.html` (e.g. `href="publication"`), so the address bar shows `/publication`.

## Publish

Push to `main`, and GitHub Pages updates the live site within a minute or two.

One-time setup: in the repo's **Settings → Pages**, set Source to *Deploy from a branch*, branch `main`,
folder `/ (root)`.
