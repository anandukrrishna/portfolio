/* ==========================================================================
   resume.js — makes the hero "View Resume" button work reliably.
   The navbar/mobile-menu "Download Resume" buttons are untouched — they
   already work via the native `download` attribute.
   Before opening a new tab, this does a lightweight HEAD check so a
   missing PDF shows a small inline notice instead of a broken/blank tab.
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const viewBtn = document.getElementById('view-resume');
    if (!viewBtn) return;

    const href = viewBtn.getAttribute('href');
    let checked = null; // null = unknown, true = exists, false = missing

    function showNotice(msg) {
      let note = document.getElementById('resume-notice');
      if (!note) {
        note = document.createElement('div');
        note.id = 'resume-notice';
        note.className = 'resume-notice';
        note.setAttribute('role', 'status');
        viewBtn.insertAdjacentElement('afterend', note);
      }
      note.textContent = msg;
      note.classList.add('show');
      clearTimeout(note._hideTimer);
      note._hideTimer = setTimeout(() => note.classList.remove('show'), 3200);
    }

    viewBtn.addEventListener('click', (e) => {
      // Already confirmed missing on a previous click — just show the notice again.
      if (checked === false) {
        e.preventDefault();
        showNotice("Resume PDF isn't added yet — check back soon.");
        return;
      }
      // Already confirmed present — let the native link behaviour proceed.
      if (checked === true) return;

      // First click: verify before opening, so we never open a broken tab.
      e.preventDefault();
      fetch(href, { method: 'HEAD' })
        .then((res) => {
          checked = res.ok;
          if (res.ok) {
            window.open(href, '_blank', 'noopener');
          } else {
            showNotice("Resume PDF isn't added yet — check back soon.");
          }
        })
        .catch(() => {
          // Network/CORS issue (e.g. opening via file://) — fall back to
          // just trying to open it directly rather than blocking the user.
          window.open(href, '_blank', 'noopener');
        });
    });
  });
})();
