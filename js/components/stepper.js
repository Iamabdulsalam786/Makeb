/**
 * Component: StepperManager
 * Controls the 3-Step MAKCOM Execution Pathway tabs (Listen -> Architect -> Deploy).
 */

export function initMakcomStepper() {
  const stepButtons = document.querySelectorAll('.ait-step-btn');
  const panels = document.querySelectorAll('.ait-tab-panel');
  if (!stepButtons.length) return;

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = btn.getAttribute('data-step');
      
      stepButtons.forEach(b => b.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      btn.classList.add('is-active');
      const targetPanel = document.getElementById(`step-panel-${targetStep}`);
      if (targetPanel) {
        targetPanel.classList.add('is-active');
      }
    });
  });
}
