/**
 * Component: PreloaderManager
 * File: js/components/preloader.js
 * Executive brand preloader that smoothly transitions out upon page asset completion.
 */

export function initPreloader() {
  const preloader = document.getElementById('sitePreloader');
  if (!preloader) return;

  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;

    preloader.classList.add('is-loaded');

    setTimeout(() => {
      preloader.style.display = 'none';
    }, 550);
  }

  // Dismiss on window load
  if (document.readyState === 'complete') {
    setTimeout(dismiss, 150);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismiss, 200);
    });
  }

  // Safety fallback timeout: never block user for more than 900ms
  setTimeout(dismiss, 900);
}
