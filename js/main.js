/* ==========================================================================
   main.js — page loader, scroll progress, footer year
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {

    /* ---------------- Footer year ---------------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------------- Page loader ---------------- */
    const loader = document.getElementById('loader');
    const loaderFill = document.getElementById('loader-fill');
    let progress = 0;
    const loaderInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) progress = 100;
      loaderFill.style.width = progress + '%';
      if (progress >= 100) clearInterval(loaderInterval);
    }, 70);

    function finishLoading() {
      loaderFill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        document.dispatchEvent(new CustomEvent('portfolio:loaded'));
      }, 220);
    }

    window.addEventListener('load', () => setTimeout(finishLoading, 220));
    // Fallback in case 'load' fires very late or never fires
    setTimeout(() => {
      if (!loader.classList.contains('hidden')) finishLoading();
    }, 1500);

    /* ---------------- Scroll progress bar ---------------- */
    const progressBar = document.getElementById('scroll-progress');
    function updateScrollProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
  });
})();
