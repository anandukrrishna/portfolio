# Anandukrishna — Developer Portfolio

A static, dependency-free developer portfolio built with plain HTML5, CSS3
and vanilla JavaScript. No external JS libraries, no CDN dependency beyond
Google Fonts, no build step. Extract the zip and open `index.html` — that's
the whole setup.

## What's in this update

**Certifications section removed.** The whole certifications block —
the grid on the Education page, the certificate modal, the dummy
certificate artwork, and every line of supporting code — has been taken
out. Education now shows just your degree and school results.

**Navbar name popover removed.** Clicking your name used to pop open a
small profile card with an avatar and location. That's gone — the name
is now a plain link back to the top of the page, and the mobile menu no
longer has to account for closing a popover when it opens.

**Real project links wired in.** Each project card and its case-study
modal now point at your actual repos:

| Project | Repo |
|---|---|
| SignBridge | https://github.com/anandukrrishna/signbridge |
| ShareBite (formerly listed as "Food Waste Reducer") | https://github.com/anandukrrishna/sharebite |
| SkillHub | https://github.com/anandukrrishna/skillhub |

**GitHub profile link corrected.** Every GitHub link across the site —
hero socials, mobile menu, footer, contact section, and the structured
data in `<head>` — now points to your real profile,
`https://github.com/anandukrrishna`, instead of the old placeholder
handle.

**Email and WhatsApp** were already correct (`anandukrrishna@gmail.com`
and `https://wa.me/918921303751`) and are unchanged.

## Things to fill in before shipping

Everything below is intentionally left as a clearly marked placeholder —
nothing was invented as fact. Update these in one place each:

| What | Where |
|---|---|
| Resume PDF | Drop the file into `assets/resume/` with the exact filename `Anandukrishna_Python_Developer_Resume.pdf` |
| Project live demo URLs | `js/projects.js` → each project's `liveDemo` field (leave `''` to hide the button) |
| Case study details | `js/projects.js` → each project's `case` object already has real write-ups; tweak wording any time |
| "Currently exploring" tags | `index.html` → `.learning-tags` in the Skills section |
| Canonical domain, OG image, sitemap URL | `index.html` `<head>`, `sitemap.xml`, `robots.txt` |

## Run locally

No build step is required. Just extract the zip and open `index.html`
in a browser — the whole site works straight off disk.

If you want the "View Resume" existence check to work (it uses `fetch`,
which browsers block under `file://`), serve the folder instead:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`. Without a server, that one button
still works — it just skips the check and opens the PDF directly.

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
│   ├── navigation.js       Navbar scroll state, mobile dropdown, smooth scroll
│   ├── animations.js       Scroll-reveal (IntersectionObserver) + hero entrance
│   ├── projects.js         Project data, rendering, and the case-study modal
│   ├── resume.js            "View Resume" existence check + fallback notice
│   └── main.js             Loader, scroll progress bar, footer year
└── assets/
    ├── images/              General site imagery (add your own)
    ├── projects/             Reserved for future project screenshots — empty for now
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
references are relative). No backend, database, or build step required.

© 2026 Anandukrishna. Built with HTML, CSS &amp; JavaScript.
