document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.custom-navbar');
  if (!navbar) return;

  if (!document.body.classList.contains('page-home')) {
    navbar.classList.add('scrolled');
    return;
  }

  const onScroll = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initialisation
});

document.addEventListener('DOMContentLoaded', () => {
  const navbarCollapse = document.getElementById('navbarNav');
  const overlay = document.querySelector('.menu-overlay');
  
  if (!navbarCollapse || !overlay) return;

  navbarCollapse.addEventListener('show.bs.collapse', () => {
    overlay.classList.add('active');
  });

  navbarCollapse.addEventListener('hidden.bs.collapse', () => {
    overlay.classList.remove('active');
  });

  document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (collapse) collapse.hide();
    });
  });
});