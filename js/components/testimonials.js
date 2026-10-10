/**
 * Component: TestimonialSlider
 * Controls the centered executive customer quotes carousel with autoplay,
 * dot indicators, keyboard accessibility, and mobile touch swiping.
 */

export function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('sliderPrevBtn') || document.getElementById('testPrevBtn');
  const nextBtn = document.getElementById('sliderNextBtn') || document.getElementById('testNextBtn');
  const dotsContainer = document.getElementById('sliderDots') || document.getElementById('testDots');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoplayTimer = null;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${i === 0 ? 'is-active' : ''}`;
      dot.setAttribute('role', 'button');
      dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function update() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
    }
  }

  function goToSlide(idx) {
    currentIndex = (idx + total) % total;
    update();
    resetAutoplay();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    });
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 6500);
  }
  resetAutoplay();

  const wrap = track.closest('.testimonial-slider-wrap') || track;
  wrap.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  wrap.addEventListener('mouseleave', resetAutoplay);

  // Keyboard navigation when slider is in viewport
  document.addEventListener('keydown', (e) => {
    const rect = wrap.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (isVisible) {
      if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    }
  });

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      goToSlide(currentIndex + 1); // Swiped Left -> Next
    } else if (touchEndX > touchStartX + threshold) {
      goToSlide(currentIndex - 1); // Swiped Right -> Prev
    }
  }
}
