// Mrisho Gambo Secondary School — Modal behaviour (News page)
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  const openLinks = document.querySelectorAll('.openModal');

  openLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) modal.style.display = 'block';
    });

    // Also allow Enter/Space activation for accessibility
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = link.getAttribute('data-modal');
        const modal = document.getElementById(id);
        if (modal) modal.style.display = 'block';
      }
    });
  });

  modals.forEach(modal => {
    const btn = modal.querySelector('.close-btn');
    if (btn) btn.addEventListener('click', () => { modal.style.display = 'none'; });
  });

  window.addEventListener('click', e => {
    modals.forEach(m => { if (e.target === m) m.style.display = 'none'; });
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') modals.forEach(m => { m.style.display = 'none'; });
  });
});
