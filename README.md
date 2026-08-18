# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step.

## Latest pass — what changed

**Project cards are now text-only, by design**
- No screenshot, no video, no logo — nothing to fake. Since no real
  project media exists yet, the cards no longer pretend otherwise; they
  show only real information: project number, name, description, tech
  tags, and actions (GitHub / Live Demo / View Case Study).
- The old `video` / `image` / `logo` fields and the whole media-frame
  render path were removed from `js/projects.js` and `css/style.css`
  (`.project-media-wrap`, `.project-media-frame`, the placeholder glyph,
  etc. are all gone). The card body now has its own comfortable padding
  directly, with no wrapper above it.
- The old dummy preview SVGs (`assets/projects/*-preview.svg`) were
  removed for the same reason — nothing references them any more.
- The project case-study modal already showed no media (by design, in
  the previous pass) — that behaviour is unchanged.
- If you want to add real screenshots later, the clean way back in is to
  add an `image` field per project in `js/projects.js` and reintroduce a
  small `<img>` render inside `.project-body`, or ask for it to be added.

**Certifications are untouched** — they still use the shared dummy
certificate SVG (`assets/certs/dummy-certificate.svg`) in the modal,
since that wasn't part of this request.

## Other issues found and fixed in this pass

1. **Root-absolute asset paths would 404 off the domain root.**
   `index.html`, `404.html` and `site.webmanifest` referenced the
   favicon, manifest and OG/Twitter image with a leading `/`
   (`/assets/icons/favicon.svg`, `/site.webmanifest`, …). That only
   resolves correctly if the site is hosted at the very root of a
   domain. If it's ever hosted from a subpath (a GitHub Pages project
   site like `username.github.io/portfolio/`, a Netlify preview under a
   path, etc.) every one of those requests 404s. All such paths are now
   relative, matching the rest of the codebase (CSS/JS were already
   relative). `sitemap.xml`, `robots.txt` and the `<link rel="canonical">`
   correctly keep absolute URLs, since those are required to be absolute.

2. **`404.html` linked to `/`** for "Take me home" / "View projects",
   which has the same subpath problem. Changed to relative
   `index.html` / `index.html#projects`.

3. **Three orphaned, unused JavaScript files removed**: `js/cursor.js`
   (custom cursor), `js/three-scene.js` (3D hero wireframe) and
   `js/command-palette.js` (Cmd/Ctrl+K palette). None of these were ever
   `<script>`-included in `index.html`, and the HTML has no matching
   elements for them (`#hero-canvas`, `#cursor-dot`, `#cmdk-overlay`,
   etc.), so they were dead weight from an earlier iteration that could
   only confuse future edits. If you want any of these features back,
   they're easy to re-add properly (script tag + matching markup) —
   just ask.

4. **A few dead CSS rules removed**: `.contact-grid` (a selector with no
   matching element anywhere in the HTML) and a leftover
   `.project-card{grid-template-columns:1fr;}` rule at the 860px
   breakpoint (project cards are `display:flex`, not `display:grid`, so
   that rule never did anything).

5. **Responsiveness re-verified end-to-end** after removing the media
   frame, at 320–1920px including 340/360/375/390/414/430/480/768/820/
   860/1024/1200/1280/1440/1920. Every JS file passes a Node syntax
   check, every CSS file is brace-balanced, `sitemap.xml`/
   `site.webmanifest` are valid XML/JSON, and every asset the page
   references resolves locally (checked with a local static server).

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project GitHub repo URLs | `js/projects.js` → each project's `github` field (currently all point to your profile, not per-project repos) |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Case study details (features, role, problem, solution, challenges, result) | `js/projects.js` → each project's `case` object. Empty fields simply don't render — no placeholder text ships to visitors. |
| Certificate image | `js/projects.js` → each certification's `image` field. Ships pointed at the shared dummy `assets/certs/dummy-certificate.svg` — swap in a real scan/screenshot per certification whenever ready. |
| Certificate logo (optional) | `js/projects.js` → each certification's `logo` field |
| Certificate date (optional) | `js/projects.js` → each certification's `date` field |
| Certificate URL (optional) | `js/projects.js` → each certification's `certUrl` field — shows a "View Certificate" button when set |
| Profile photo | `assets/profile/dummy-profile.svg` is the placeholder shown in the navbar popover — replace the `src` in `index.html` (`#profile-popover`) with your real photo path whenever ready |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |

## Run locally

No build step is required. Serve the folder with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` (or whatever port your server prints).
A local server is required for the "View Resume" existence check (it uses
`fetch`, which is blocked by browsers under `file://`); if you open
`index.html` directly via `file://`, that one button falls back to simply
opening the PDF without the check.

## Structure

```
portfolio/
├── index.html            Main page
├── 404.html               Custom not-found page
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── css/
│   ├── style.css          Design tokens, layout, components
│   ├── responsive.css     Breakpoints + reduced-motion overrides
│   └── animations.css     Entrance + stagger transitions
├── js/
│   ├── navigation.js       Navbar state, compact mobile dropdown, profile popover, smooth scroll
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js         Project + certification data, rendering, and the shared modal
│   ├── resume.js            "View Resume" existence check + fallback notice
│   └── main.js             Loader, scroll progress bar, footer year
└── assets/
    ├── images/              General site imagery (add your own)
    ├── projects/             Reserved for future project screenshots — empty for now
    ├── certs/                Certificate images — ships with one shared
    │                         dummy SVG placeholder
    ├── profile/              Profile photo — ships with a dummy avatar SVG
    │                         used in the navbar profile popover
    ├── icons/                favicon.svg
    └── resume/               Anandukrishna_Python_Developer_Resume.pdf goes here
```

## Performance notes

- No external JS libraries — everything is vanilla, so there's nothing to
  fail-to-load and leave the page broken.
- The ambient background is CSS gradients only (no canvas, no WebGL,
  negligible cost on low-end mobile devices) and pauses under
  `prefers-reduced-motion`.
- `prefers-reduced-motion` disables all reveal/entrance/background motion.

## Deployment

This is a fully static site — host it on GitHub Pages, Netlify, Vercel, or
any static file host, including from a subpath (all internal asset
references are now relative, see "Other issues found and fixed" above).
No backend, database, or build step required.

© 2026 Anandukrishna. Built with HTML, CSS &amp; JavaScript.
#   p o r t f o l i o  
 