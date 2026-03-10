/* ============================================================
   TEAM.JS — Team Filter Functionality
   ============================================================ */

(function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.filter-btn');
  const memberCards = document.querySelectorAll('.member-card');
  const leadershipGrid = document.getElementById('leadership-grid');
  const membersGrid = document.getElementById('members-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      memberCards.forEach((card, i) => {
        const dept = card.dataset.dept;
        const match = filter === 'all' || dept === filter;

        if (match) {
          card.classList.remove('hidden');
          // Stagger entrance
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = `opacity 0.4s ease ${i * 50}ms, transform 0.4s ease ${i * 50}ms`;
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide leadership section header
      if (leadershipGrid) {
        const showLeadership = filter === 'all' || filter === 'leadership';
        leadershipGrid.style.display = showLeadership ? 'grid' : 'none';
      }
    });
  });

})();
