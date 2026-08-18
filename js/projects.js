/* ==========================================================================
   projects.js — single source of truth for project + certification content,
   plus the shared modal system used by both.
   Edit the `projects` / `certifications` arrays below to update content.

   Notes on design intent:
   - Project cards are intentionally information-only: no screenshot, no
     video, no logo. There is no preview media of any kind — just the
     project number, name, description, tech tags and actions. This keeps
     the card honest (no placeholder imagery pretending to be a real
     screenshot) and means nothing needs to change here once real project
     media exists later — media can be reintroduced by adding an `image`/
     `video` field and a small render helper if/when it's wanted.
   - The case-study modal is likewise information-only — no media, no
     logo. Only fields that actually have content render; nothing is
     invented.
   ========================================================================== */

const projects = [
  {
    id: 'signbridge',
    number: '01',
    name: 'SignBridge',
    tagline: 'Accessibility-focused communication platform.',
    description: 'An accessibility-focused communication platform with a responsive, mobile-first CSS interface and dynamic form handling, built using Django MVT architecture.',
    tech: ['Django', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '',
    case: {
      overview: 'A communication platform designed with accessibility as the central constraint.',
      features: 'Mobile-first responsive UI, dynamic form handling, MVT architecture.',
      role: '',
      problem: '',
      solution: '',
      challenges: '',
      result: ''
    }
  },
  {
    id: 'food-waste-reducer',
    number: '02',
    name: 'Food Waste Reducer',
    tagline: 'Full-stack food donation platform connecting donors and recipients.',
    description: 'A full-stack food donation platform connecting donors and recipients, with role-based authentication and CRUD operations built using Django.',
    tech: ['Django', 'Python', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '',
    case: {
      overview: 'A donation platform matching food donors with recipients in need.',
      features: 'Role-based authentication, donor/recipient CRUD workflows.',
      role: '',
      problem: '',
      solution: '',
      challenges: '',
      result: ''
    }
  },
  {
    id: 'skillhub',
    number: '03',
    name: 'SkillHub',
    tagline: 'Multi-role Django platform for students, companies and staff.',
    description: 'Built a multi-role Django platform for students, companies and staff with project listings, shortlisting and feedback workflows, modelling 10+ interlinked entities using Django ORM. Unified the front-end with a reusable CSS-based system spanning responsive tables and form components across 15+ templates.',
    tech: ['Django', 'Python', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/anandukrishna-git', // placeholder — replace with exact repo URL
    liveDemo: '', // placeholder — leave empty until a live URL is provided
    case: {
      overview: 'A multi-role platform connecting students, companies and internal staff around project listings, applications and feedback.',
      features: 'Project listings, shortlisting workflow, feedback system, 10+ interlinked Django ORM models.',
      role: '',
      problem: '',
      solution: '',
      challenges: '',
      result: ''
    }
  }
];

/* Dummy certificate image used as a placeholder for every certification
   until real certificate scans/screenshots are supplied. Replace any
   `image` field below with a real path under assets/certs/ — layout and
   code never need to change. (Certifications keep their image/logo
   affordances — only project cards were simplified to text-only.) */
const DUMMY_CERT_IMAGE = 'assets/certs/dummy-certificate.svg';

const certifications = [
  {
    issuer: 'Infosys Springboard',
    title: 'Python Fundamentals',
    description: 'Core Python: syntax, data structures, control flow and problem solving.',
    date: '',
    logo: '',
    image: DUMMY_CERT_IMAGE,
    certUrl: ''
  },
  {
    issuer: 'Udemy',
    title: 'Python Certification',
    description: 'Applied Python programming across scripting and application-building exercises.',
    date: '',
    logo: '',
    image: DUMMY_CERT_IMAGE,
    certUrl: ''
  },
  {
    issuer: 'AWS Aspire',
    title: 'Generative AI Revolution',
    description: 'Foundations of generative AI concepts and their practical applications.',
    date: '',
    logo: '',
    image: DUMMY_CERT_IMAGE,
    certUrl: ''
  },
  {
    issuer: 'NPTEL',
    title: 'Introduction to IoT 4.0',
    description: 'Fundamentals of IoT architecture, connected devices and Industry 4.0 concepts.',
    date: '',
    logo: '',
    image: DUMMY_CERT_IMAGE,
    certUrl: ''
  }
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------------------- */
/* Rendering: project cards + certification cards                         */
/* Project cards are text-only by design (see header note) — number,      */
/* name, description, tech tags, actions. The case-study modal is         */
/* likewise information-only (see openProjectModal).                      */
/* ---------------------------------------------------------------------- */
function renderProjects() {
  const list = document.getElementById('project-list');
  if (!list) return;
  list.innerHTML = projects.map(p => `
    <article class="project-card reveal" data-project="${p.id}" tabindex="0" role="button" aria-label="View case study for ${escapeHtml(p.name)}">
      <div class="project-body">
        <div class="project-info">
          <span class="project-num mono">${p.number}</span>
          <h3 class="project-name">${escapeHtml(p.name)}</h3>
          <p class="project-desc">${escapeHtml(p.description)}</p>
          <div class="project-tags">${p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
          <div class="project-actions">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline" data-stop>GitHub ↗</a>` : ''}
            ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" rel="noopener" class="btn btn-outline" data-stop>Live Demo ↗</a>` : ''}
            <button class="btn btn-ghost" data-stop type="button">View Case Study →</button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Stop propagation on inner interactive elements so the card click handler
  // (which also opens the modal) doesn't double-fire.
  list.querySelectorAll('[data-stop]').forEach(el => {
    el.addEventListener('click', e => {
      if (el.tagName === 'BUTTON') { openProjectModal(el.closest('.project-card').dataset.project, el); }
      else { e.stopPropagation(); }
    });
  });

  list.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project, card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal(card.dataset.project, card); }
    });
  });
}

function renderCertifications() {
  const grid = document.getElementById('cert-grid');
  if (!grid) return;
  grid.innerHTML = certifications.map((c, i) => `
    <button class="glass cert-card reveal" type="button" data-cert-index="${i}" aria-haspopup="dialog">
      ${c.logo
        ? `<span class="cert-logo" aria-hidden="true"><img src="${c.logo}" alt="${escapeHtml(c.issuer)} logo" loading="lazy"></span>`
        : `<span class="cert-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"/><path d="M8.5 13.5 7 22l5-2.6L17 22l-1.5-8.5"/>
            </svg>
          </span>`}
      <span>
        <span class="cert-issuer mono">${escapeHtml(c.issuer)}</span>
        <h5>${escapeHtml(c.title)}</h5>
        ${c.date ? `<span class="cert-date mono">${escapeHtml(c.date)}</span>` : ''}
      </span>
    </button>
  `).join('');

  grid.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => openCertModal(Number(card.dataset.certIndex), card));
  });
}

/* ---------------------------------------------------------------------- */
/* Shared modal system                                                     */
/* ---------------------------------------------------------------------- */
let lastFocusedEl = null;

function openModal(bodyHtml, triggerEl) {
  const overlay = document.getElementById('modal-overlay');
  const body = document.getElementById('modal-body');
  if (!overlay || !body) return;

  lastFocusedEl = triggerEl || document.activeElement;
  body.innerHTML = bodyHtml;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeBtn = document.getElementById('modal-close');
  closeBtn?.focus();
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
}

/* Project modal — information-only case study. Never shows media or a
   logo. Only fields with real content are rendered: overview/features/
   role/problem/solution/challenges/result, tech tags, and real links. */
function openProjectModal(id, triggerEl) {
  const p = projects.find(pr => pr.id === id);
  if (!p) return;

  const blocks = [
    ['Overview', p.case.overview],
    ['Key Features', p.case.features],
    ['My Role', p.case.role],
    ['Problem', p.case.problem],
    ['Solution', p.case.solution],
    ['Challenges', p.case.challenges],
    ['Result', p.case.result]
  ].filter(([, text]) => text && text.trim().length > 0);

  const hasLinks = p.github || p.liveDemo;

  const html = `
    <div class="modal-body-inner">
      <span class="eyebrow modal-eyebrow">Project ${p.number}</span>
      <div class="modal-header-row">
        <h3 class="modal-title" id="modal-title">${escapeHtml(p.name)}</h3>
      </div>
      <p class="modal-tagline">${escapeHtml(p.tagline)}</p>
      <div class="modal-tags">${p.tech.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
      ${blocks.map(([label, text]) => `
        <div class="modal-block">
          <h5>${escapeHtml(label)}</h5>
          <p>${escapeHtml(text)}</p>
        </div>
      `).join('')}
      ${hasLinks ? `
        <div class="modal-actions">
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline">GitHub ↗</a>` : ''}
          ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" rel="noopener" class="btn btn-primary">Live Demo ↗</a>` : ''}
        </div>` : ''}
    </div>
  `;
  openModal(html, triggerEl);
}

/* Certification modal — compact, no unnecessary scrolling. Shows the
   certificate image (dummy placeholder until a real one is supplied) and
   minimal issuer information only. Independent of the project cards'
   text-only treatment above. */
function openCertModal(index, triggerEl) {
  const c = certifications[index];
  if (!c) return;

  const html = `
    <div class="modal-body-inner">
      <span class="eyebrow modal-eyebrow">Certification</span>
      <div class="modal-header-row">
        ${c.logo ? `<span class="modal-logo"><img src="${c.logo}" alt="${escapeHtml(c.issuer)} logo"></span>` : ''}
        <h3 class="modal-title" id="modal-title">${escapeHtml(c.title)}</h3>
      </div>
      ${c.image
        ? `<div class="modal-cert-image"><img src="${c.image}" alt="${escapeHtml(c.title)} certificate"></div>`
        : (!c.logo ? `<span class="modal-cert-mark" aria-hidden="true">${escapeHtml(c.issuer.slice(0, 2).toUpperCase())}</span>` : '')}
      <div class="modal-meta">
        <div><span>Issuer</span><strong>${escapeHtml(c.issuer)}</strong></div>
        ${c.date ? `<div><span>Date</span><strong>${escapeHtml(c.date)}</strong></div>` : ''}
      </div>
      ${c.description ? `
        <div class="modal-block">
          <h5>About</h5>
          <p>${escapeHtml(c.description)}</p>
        </div>` : ''}
      ${c.certUrl ? `
        <div class="modal-actions">
          <a href="${c.certUrl}" target="_blank" rel="noopener" class="btn btn-primary">View Certificate ↗</a>
        </div>` : ''}
    </div>
  `;
  openModal(html, triggerEl);
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderCertifications();

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  overlay?.addEventListener('mousedown', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
