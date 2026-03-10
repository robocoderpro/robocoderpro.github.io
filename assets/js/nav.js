/* ============================================================
   NAV.JS — Shared Navigation Logic
   ============================================================ */

(function () {
  'use strict';

  // ── Scroll Progress Bar ──
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // ── Nav Scroll Effect ──
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Active Link Highlight ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html') ||
        (currentPath === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Mobile Hamburger ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Loading Screen ──
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 1200);
    });
  }

  // ── Keyboard Easter Egg: "SPARK" ──
  let typed = '';
  const TARGET = 'SPARK';
  const easterEgg = document.getElementById('spark-easter-egg');

  if (easterEgg) {
    document.addEventListener('keydown', (e) => {
      typed += e.key.toUpperCase();
      if (typed.includes(TARGET)) {
        typed = '';
        triggerRobotWalk();
      }
      if (typed.length > 10) {
        typed = typed.slice(-10);
      }
    });
  }

  function triggerRobotWalk() {
    if (!easterEgg) return;
    easterEgg.classList.add('active');
    easterEgg.style.animation = 'none';
    void easterEgg.offsetWidth; // reflow
    easterEgg.style.animation = '';
    setTimeout(() => {
      easterEgg.classList.remove('active');
    }, 4000);
  }

  // ── Intersection Observer for Fallback Animations ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.agDelay || (i * 100);
        setTimeout(() => {
          entry.target.classList.add('ag-visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-ag-fade-up], [data-ag-stagger], [data-ag-slide-left], [data-ag-slide-right]').forEach((el, i) => {
    if (el.dataset.agStagger !== undefined) {
      el.dataset.agDelay = i * 80;
    }
    observer.observe(el);
  });

})();
