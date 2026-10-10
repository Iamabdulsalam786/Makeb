/**
 * Component: AboutInteractions
 * Purpose: Subtle viewport reveal for the editorial About Us section
 * Respects accessibility and prefers-reduced-motion preferences
 */

export function initAboutInteractions() {
  const revealElements = document.querySelectorAll('.about-section [data-reveal]');
  if (!revealElements.length) return;

  // If user prefers reduced motion, reveal immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }
}
