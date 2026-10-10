/**
 * Component: OfficeClocksManager
 * Manages live global timezone clocks for US, UK, and Domestic delivery centers.
 */

export function initOfficeClocks() {
  const clocks = document.querySelectorAll('[data-timezone]');
  if (!clocks.length) return;

  function tick() {
    const now = new Date();
    clocks.forEach(el => {
      const tz = el.getAttribute('data-timezone');
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        el.textContent = timeStr;
      } catch (e) {
        el.textContent = '--:--:--';
      }
    });
  }

  tick();
  setInterval(tick, 1000);
}
