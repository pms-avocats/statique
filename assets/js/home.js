document.addEventListener('DOMContentLoaded', function () {
  const carouselEl = document.getElementById('mainCarousel');
  if (!carouselEl) return;
  const captions = () => carouselEl.querySelectorAll('.carousel-caption');

  carouselEl.addEventListener('slide.bs.carousel', () => {
    captions().forEach(c => c.classList.remove('show-caption'));
  });
  carouselEl.addEventListener('slid.bs.carousel', () => {
    const active = carouselEl.querySelector('.carousel-item.active .carousel-caption');
    if (active) active.classList.add('show-caption');
  });

  const first = carouselEl.querySelector('.carousel-item.active .carousel-caption');
  if (first) first.classList.add('show-caption');
});

(function(){
  const carouselEl = document.getElementById('mainCarousel');
  if (!carouselEl) return;
  const bar = carouselEl.querySelector('.carousel-progress__bar');
  const bsCarousel = bootstrap.Carousel.getOrCreateInstance(carouselEl);
  let rafId = null;
  let startTime = null;
  let duration = 0;
  let paused = false;

  const getDefaultInterval = () => parseInt(carouselEl.getAttribute('data-bs-interval')) || 8000;
  const getActiveInterval = () => {
    const active = carouselEl.querySelector('.carousel-item.active');
    const custom = active ? active.getAttribute('data-bs-interval') : null;
    return custom ? parseInt(custom) : getDefaultInterval();
  };

  const cancel = () => { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } };
  const tick = (ts) => {
    if (paused) return;
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const pct = Math.min(100, (elapsed / duration) * 100);
    if (bar) bar.style.width = pct + '%';
    if (elapsed < duration) rafId = requestAnimationFrame(tick);
  };

  const restart = () => {
    cancel();
    startTime = null;
    duration = getActiveInterval();
    if (bar) bar.style.width = '0%';
    if (!document.hidden && !paused) rafId = requestAnimationFrame(tick);
  };

  carouselEl.addEventListener('slid.bs.carousel', restart);
  carouselEl.addEventListener('slide.bs.carousel', () => { if (bar) bar.style.width = '0%'; });

  // Onglet en arrière-plan => pause
  const pause = () => { paused = true; cancel(); };
  const resume = () => { paused = false; restart(); };
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else resume(); });

  // Démarre au premier rendu
  window.addEventListener('load', () => { restart(); });
})();

document.addEventListener('DOMContentLoaded', () => {
  const toReveal = document.querySelectorAll('.page-home .fade');
  if (!toReveal.length) return;

  // Lancement un peu en amont (+ léger décalage entre éléments)
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  toReveal.forEach((el, i) => {
    el.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
    io.observe(el);
  });
});
