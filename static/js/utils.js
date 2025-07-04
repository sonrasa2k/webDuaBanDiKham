// utils.js
export function setupScrollEffects() {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.querySelector('.navbar').classList.add('scrolled');
    } else {
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  });
}

export function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

export function setupAnimations() {
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-up');
    const screenPosition = window.innerHeight / 1.3;

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;

      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('load', animateOnScroll);
}