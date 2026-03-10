/* ============================================================
   ACHIEVEMENTS.JS — Sortable Table, CountUp, Quote Carousel, Particles
   ============================================================ */

(function () {
  'use strict';

  // ── CountUp ──
  function animateCountUp(el, target, suffix = '', duration = 2000) {
    const startTime = performance.now();
    function update(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statsEl = document.querySelector('.achieve-stats');
  if (statsEl) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('[data-countup]').forEach(el => {
          animateCountUp(el, parseInt(el.dataset.countup), el.dataset.suffix || '', 2000);
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(statsEl);
  }

  // ── Sortable Table ──
  const table = document.getElementById('achievements-table');
  if (table) {
    const headers = table.querySelectorAll('th.sortable');
    const tbody = table.querySelector('tbody');

    headers.forEach(th => {
      th.style.cursor = 'none';
      th.addEventListener('click', () => {
        const col = parseInt(th.dataset.col);
        const isAsc = th.classList.contains('sort-asc');

        // Reset all
        headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
        th.classList.add(isAsc ? 'sort-desc' : 'sort-asc');

        const rows = Array.from(tbody.querySelectorAll('tr'));
        rows.sort((a, b) => {
          const aVal = a.cells[col].textContent.trim();
          const bVal = b.cells[col].textContent.trim();
          const result = aVal.localeCompare(bVal, undefined, { numeric: true });
          return isAsc ? -result : result;
        });

        rows.forEach(r => tbody.appendChild(r));
      });
    });
  }

  // ── Quote Carousel ──
  const slides = document.querySelectorAll('.quote-slide');
  const dots   = document.querySelectorAll('.quote-dot');
  let current = 0;
  let carouselInterval;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  if (slides.length) {
    carouselInterval = setInterval(nextSlide, 4000);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(carouselInterval);
        goToSlide(i);
        carouselInterval = setInterval(nextSlide, 4000);
      });
    });
  }

  // ── Particle Field ──
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x  = Math.random() * canvas.width;
      this.y  = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r  = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - dist / 120) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  animate();

})();
