/* ==========================================================================
   navigation.js — navbar scroll state, mobile menu, smooth scroll,
   active-section link highlighting, and the navbar name's profile popover.
   ========================================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('[data-nav]');
    const mobileLinks = document.querySelectorAll('[data-nav-mobile]');
    const mobileMenuAnyLink = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    const sections = document.querySelectorAll('main section[id]');

    // Navbar compact state on scroll
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile menu toggle — compact dropdown, closes on Escape, outside
    // click, link click, or viewport resize past the mobile breakpoint.
    function closeMobileMenu() {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    function openMobileMenu() {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    navToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeProfilePopover();
      mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
    // Any link inside the mobile menu (section links, socials, resume) closes it
    mobileMenuAnyLink.forEach(a => a.addEventListener('click', closeMobileMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
    });
    // Outside click closes the compact dropdown
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('open')) return;
      if (mobileMenu.contains(e.target) || navToggle.contains(e.target)) return;
      closeMobileMenu();
    });
    // Resizing past the mobile breakpoint (e.g. rotating a tablet) closes it
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && mobileMenu.classList.contains('open')) closeMobileMenu();
    });

    // Smooth scroll for in-page anchors (respects reduced motion via CSS scroll-behavior override)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });

    // Active link tracking (desktop + mobile)
    if ('IntersectionObserver' in window && sections.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
            mobileLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(s => observer.observe(s));
    }

    /* ---------------- Navbar name → small profile popover ---------------- */
    const profileTrigger = document.getElementById('profile-trigger');
    const profilePopover = document.getElementById('profile-popover');

    function openProfilePopover() {
      if (!profilePopover) return;
      closeMobileMenu();
      profilePopover.classList.add('open');
      profilePopover.setAttribute('aria-hidden', 'false');
      profileTrigger?.setAttribute('aria-expanded', 'true');
    }
    function closeProfilePopover() {
      if (!profilePopover || !profilePopover.classList.contains('open')) return;
      profilePopover.classList.remove('open');
      profilePopover.setAttribute('aria-hidden', 'true');
      profileTrigger?.setAttribute('aria-expanded', 'false');
    }
    profileTrigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      profilePopover?.classList.contains('open') ? closeProfilePopover() : openProfilePopover();
    });
    document.addEventListener('click', (e) => {
      if (!profilePopover || !profilePopover.classList.contains('open')) return;
      if (profilePopover.contains(e.target) || profileTrigger?.contains(e.target)) return;
      closeProfilePopover();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProfilePopover();
    });
  });
})();
