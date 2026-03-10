/* ============================================================
   INDEX.JS — Hero Page Logic
   ============================================================ */

(function () {
  'use strict';

  // ── Typewriter Effect ──
  const taglineEl = document.getElementById('hero-tagline');
  if (taglineEl) {
    const words = ['INNOVATE, BUILD, COMPETE.', 'DESIGN. AUTOMATE. WIN.', 'FROM CAMPUS TO ABU ROBOCON.'];
    let wordIndex = 0, charIndex = 0, deleting = false;
    const cursor = taglineEl.querySelector('.typewriter-cursor');

    function type() {
      const current = words[wordIndex];
      const textNode = taglineEl.firstChild;
      if (!textNode) return;

      if (!deleting) {
        textNode.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        textNode.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 500);
          return;
        }
      }
      setTimeout(type, deleting ? 40 : 80);
    }

    // Initialize
    taglineEl.innerHTML = '';
    const text = document.createTextNode('');
    taglineEl.appendChild(text);
    const cur = document.createElement('span');
    cur.className = 'typewriter-cursor';
    taglineEl.appendChild(cur);
    setTimeout(type, 1500);
  }

  // ── Glitch on hover ──
  const glitchEl = document.querySelector('.glitch');
  if (glitchEl) {
    glitchEl.addEventListener('mouseenter', () => {
      glitchEl.style.animation = 'none';
      void glitchEl.offsetWidth;
      glitchEl.style.animation = '';
    });
  }

  // ── Coordinate HUD Readout ──
  const coordEl = document.getElementById('coord-readout');
  if (coordEl) {
    document.addEventListener('mousemove', (e) => {
      const x = ((e.clientX / window.innerWidth) * 100).toFixed(2);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(2);
      coordEl.textContent = `LAT: ${x}° | LON: ${y}°`;
    });
  }

  // ── Timestamp HUD ──
  const timeHud = document.getElementById('hud-time');
  if (timeHud) {
    function updateTime() {
      const now = new Date();
      const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
      timeHud.textContent = `SYS: ${formatted} UTC`;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ── CountUp Animation ──
  function animateCountUp(el, target, suffix = '', duration = 2000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ── Trigger CountUp on scroll ──
  const statsEl = document.querySelector('.stats-section');
  if (statsEl) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('[data-countup]').forEach(el => {
          const target = parseInt(el.dataset.countup, 10);
          const suffix = el.dataset.suffix || '';
          animateCountUp(el, target, suffix, 2000);
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(statsEl);
  }

})();
