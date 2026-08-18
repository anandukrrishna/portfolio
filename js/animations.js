/* ==========================================================================
   animations.js — lightweight vanilla-JS motion (no external dependencies)
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------- Reveal-on-scroll ---------------- */
    const revealEls = document.querySelectorAll('.reveal');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      // No animation support / preference: just show everything immediately.
      revealEls.forEach(el => el.classList.add('in-view'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach(el => observer.observe(el));
    }

    /* ---------------- Hero entrance ---------------- */
    const hero = document.getElementById('hero');
    function showHero() {
      hero?.classList.add('in');
    }
    if (prefersReducedMotion) {
      showHero();
    } else {
      document.addEventListener('portfolio:loaded', showHero, { once: true });
      // Fallback in case the loader event never fires (e.g. loader markup missing)
      setTimeout(showHero, 2000);
    }

    /* ---------------- Timeline progress line ---------------- */
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.getElementById('timeline-progress');
    if (timeline && timelineProgress) {
      function updateTimelineProgress() {
        const rect = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const start = vh * 0.75;
        const end = vh * 0.25;
        const total = rect.height + (start - end);
        const traveled = start - rect.top;
        const pct = Math.max(0, Math.min(1, traveled / total));
        timelineProgress.style.height = (pct * 100) + '%';
      }
      window.addEventListener('scroll', updateTimelineProgress, { passive: true });
      window.addEventListener('resize', updateTimelineProgress);
      updateTimelineProgress();
    }
  });
})();
