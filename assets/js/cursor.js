/* ============================================================
   CURSOR.JS — Custom Glowing Crosshair Cursor with Trail
   ============================================================ */

(function () {
  'use strict';

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // Smooth follower state
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  let mouseX = 0, mouseY = 0;
  let isHovering = false;

  // Trail dots
  const TRAIL_COUNT = 6;
  const trails = [];
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = String(((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.4);
    trail.style.width = trail.style.height = `${Math.max(2, 4 - i)}px`;
    document.body.appendChild(trail);
    trails.push({ el: trail, x: 0, y: 0 });
  }

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Hide on mouse leave
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    trails.forEach(t => { t.el.style.opacity = '0'; });
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    ring.style.transform = 'translate(-50%, -50%) scale(1.4)';
  });

  document.addEventListener('mouseup', () => {
    dot.style.transform = isHovering
      ? 'translate(-50%, -50%) scale(1.5)'
      : 'translate(-50%, -50%) scale(1)';
    ring.style.transform = isHovering
      ? 'translate(-50%, -50%) scale(1.5)'
      : 'translate(-50%, -50%) scale(1)';
  });

  // Hover state for interactive elements
  const interactive = 'a, button, [data-cursor-hover], input, textarea, select, label';

  document.addEventListener('mouseover', (e) => {
    if (e.target.matches(interactive)) {
      isHovering = true;
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(255, 107, 0, 0.8)';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.matches(interactive)) {
      isHovering = false;
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.width = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(0, 245, 255, 0.6)';
    }
  });

  // Animation loop
  function animateCursor() {
    // Dot: directly follows mouse
    dotX = mouseX;
    dotY = mouseY;
    dot.style.left = `${dotX}px`;
    dot.style.top  = `${dotY}px`;

    // Ring: smooth lag
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top  = `${ringY}px`;

    // Trail: each follows the previous
    let prevX = dotX, prevY = dotY;
    for (let i = 0; i < trails.length; i++) {
      trails[i].x += (prevX - trails[i].x) * 0.4;
      trails[i].y += (prevY - trails[i].y) * 0.4;
      trails[i].el.style.left = `${trails[i].x}px`;
      trails[i].el.style.top  = `${trails[i].y}px`;
      trails[i].el.style.opacity = String(((TRAIL_COUNT - i) / TRAIL_COUNT) * 0.35);
      prevX = trails[i].x;
      prevY = trails[i].y;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();
