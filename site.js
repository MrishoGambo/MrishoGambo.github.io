// Mrisho Gambo Secondary School — shared site behaviour
// Mobile nav toggle + gentle scroll-reveal for content sections + slideshow transitions.

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.main-nav ul');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal for sections/cards
  const revealTargets = document.querySelectorAll('main section, .card, .news-item, .teacher-card, .material-card, .dept-card, .person-card');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // Slideshow functionality
  const slideshows = document.querySelectorAll('.slideshow');
  
  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const indicatorsContainer = slideshow.querySelector('.slideshow-indicators');
    let currentSlide = 0;
    let slideshowInterval;

    if (slides.length === 0) return;

    // Create indicator buttons
    if (indicatorsContainer) {
      slides.forEach((_, index) => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `Go to slide ${index + 1}`);
        if (index === 0) button.classList.add('active');
        button.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(button);
      });
    }

    // Show initial slide
    slides[0].classList.add('active');

    // Go to specific slide
    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');

      // Update indicators
      if (indicatorsContainer) {
        indicatorsContainer.querySelectorAll('button').forEach((btn, i) => {
          btn.classList.toggle('active', i === currentSlide);
        });
      }

      // Restart auto-advance timer
      clearInterval(slideshowInterval);
      startAutoSlide();
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Auto-advance slideshow every 5 seconds
    function startAutoSlide() {
      slideshowInterval = setInterval(nextSlide, 5000);
    }

    // Pause on hover
    slideshow.addEventListener('mouseenter', () => {
      clearInterval(slideshowInterval);
    });

    slideshow.addEventListener('mouseleave', () => {
      startAutoSlide();
    });

    // Pause on touch for mobile
    slideshow.addEventListener('touchstart', () => {
      clearInterval(slideshowInterval);
    });

    slideshow.addEventListener('touchend', () => {
      startAutoSlide();
    });

    // Start auto-advance
    startAutoSlide();
  });
});
