/* ==========================================================================
   projects.js — single source of truth for project content, plus the
   modal system used to show each project's case study.
   Edit the `projects` array below to update content.

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
    tagline: 'Accessibility platform with live sign-language recognition.',
    description: 'A communication platform for the deaf and hard-of-hearing community: a Django portal paired with a live ISL (Indian Sign Language) interpreter that reads hand gestures through the camera in real time and speaks them back as text-to-speech.',
    tech: ['Django', 'Python', 'OpenCV', 'MediaPipe', 'scikit-learn', 'Angular', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/anandukrrishna/signbridge',
    liveDemo: '',
    case: {
      overview: 'SignBridge tackles two-way sign-language communication: a live camera interpreter that turns hand signs into spoken sentences, and a companion module that animates written text back into sign language.',
      features: 'Live MJPEG video interpreter with real-time hand-landmark tracking, debounced sign-to-letter recognition, automatic sentence-to-speech playback, an Angular-based text-to-sign animator, and a Django portal for user accounts, complaints and feedback.',
      role: 'Built the Django web platform end-to-end and integrated the live ISL recognition pipeline — wiring a Python/OpenCV/MediaPipe hand-tracking model into the app as a real-time camera feed.',
      problem: "Deaf and hard-of-hearing users need a way to communicate that doesn't depend on a human interpreter being available, and most sign-language tools online only translate in one direction.",
      solution: 'A Django MVT app with admin and user portals, plus a live camera-based interpreter that reads hand landmarks with MediaPipe, classifies them with a trained scikit-learn model, and reads the recognised sentence aloud. A companion Angular module handles the reverse direction, animating text into sign language.',
      challenges: "Making sign recognition feel reliable rather than flickery meant debouncing predictions across ~30 consecutive frames before committing a letter, and streaming the annotated camera feed back to the browser as MJPEG so the interpreter felt live instead of request/response.",
      result: 'A working end-to-end prototype: live camera sign recognition with spoken output on one side, and text-to-sign animation on the other, behind a shared authenticated portal.'
    }
  },
  {
    id: 'sharebite',
    number: '02',
    name: 'ShareBite',
    tagline: 'Full-stack donation platform connecting donors and recipients.',
    description: 'A three-role donation platform — admin, donor and recipient — that lets restaurants, hotels and individuals list surplus food and connects it with people who need it, with a request-and-approval workflow and role-based authentication.',
    tech: ['Django', 'Python', 'SQLite', 'Bootstrap', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/anandukrrishna/sharebite',
    liveDemo: '',
    case: {
      overview: 'ShareBite is a donation platform matching food donors with people in need, built around a stock-aware request-and-approval workflow so listings can never be over-committed.',
      features: 'Role-based authentication for admin, donor and recipient accounts; surplus-food listings with quantity and pickup details; a request → approve/reject flow with automatic stock decrement; bookmarking, complaints and star-rated feedback for every role; and an admin dashboard with platform-wide announcements.',
      role: 'Designed the data model and built the full-stack app with Django class-based views, covering all three roles and the request/approval workflow end-to-end.',
      problem: "Usable surplus food from restaurants, hotels and individual donors often goes to waste simply because there's no easy way to connect it with people nearby who need it.",
      solution: 'A platform where donors publish surplus food listings, recipients browse and request what they need, and donors approve or reject requests — with a stock guard that stops a listing from being claimed past its available quantity.',
      challenges: 'Keeping the approve/reject flow correct so a listing could never be over-committed, and designing complaints and feedback so either could point at a donor or at the platform itself without duplicating models for every target type.',
      result: 'A fully working donation platform with an automated test suite covering login and registration for all three roles, the request-to-approval flow with stock verification, and the complaints/feedback flows.'
    }
  },
  {
    id: 'skillhub',
    number: '03',
    name: 'SkillHub',
    tagline: 'Multi-role platform for students, staff and companies.',
    description: 'A four-role Django platform — student, staff, company and admin — covering the full lifecycle of a student project: submission, staff verification and credit scoring, company shortlisting, and conference invitations, backed by a parallel REST API for a companion mobile app.',
    tech: ['Django', 'Django REST Framework', 'Python', 'SQLite', 'HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/anandukrrishna/skillhub',
    liveDemo: '',
    case: {
      overview: 'A multi-role platform connecting students, companies and internal staff around project submissions, verification, shortlisting and feedback — with a shared, reusable front-end system across every role.',
      features: 'Project submission and staff verification with a 0–10 credit score, company browsing and shortlisting of verified projects, conference invitations with accept/reject responses, department-scoped staff views, and a parallel Django REST Framework API layer for a companion mobile client.',
      role: 'Modelled 10+ interlinked entities in Django ORM and built the full front end, plus the DRF API layer, unifying the interface with a reusable, responsive component system spanning 15+ templates.',
      problem: "Students, the staff supervising them, and companies scouting talent all needed one shared place to track project submissions and follow-up, instead of email threads and spreadsheets.",
      solution: 'A four-role portal: students submit projects, staff verify and score them, companies browse verified work and shortlist candidates, and shortlisted students can be invited to conferences — all on a Django MVT core with a matching REST API for mobile.',
      challenges: 'Keeping four different roles\u2019 permissions and views consistent as the data model grew, and building a REST API that mirrors the web app\u2019s behaviour closely enough to support a mobile client without duplicating business logic.',
      result: 'A complete multi-role portal covering the whole project lifecycle from submission to company shortlisting, with a working DRF API layer running alongside the server-rendered views.'
    }
  }
];

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------------------------------------------------------------- */
/* Rendering: project cards                                               */
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

/* ---------------------------------------------------------------------- */
/* Modal system                                                            */
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

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const overlay = document.getElementById('modal-overlay');
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  overlay?.addEventListener('mousedown', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
