/* ============================================================
   PROJECTS.JS — Tab Toggle
   ============================================================ */

(function () {
  'use strict';

  const tabBtns   = document.querySelectorAll('.tab-btn');
  const panelActive   = document.getElementById('panel-active');
  const panelArchived = document.getElementById('panel-archived');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      if (tab === 'active') {
        panelActive.style.display = 'block';
        panelArchived.style.display = 'none';
      } else {
        panelActive.style.display = 'none';
        panelArchived.style.display = 'block';
      }
    });
  });

})();
