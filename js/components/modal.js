/**
 * Component: ConsultationModal
 * Controls the Executive Discovery Session booking dialog, outside clicks,
 * ESC keys, automatic service pre-selection, and form submission.
 */

export function initConsultationModal() {
  const modal = document.getElementById('consultModal');
  const openBtns = document.querySelectorAll('.open-consult-modal');
  const closeBtn = document.getElementById('closeConsultModal') || document.getElementById('modalCloseBtn');
  const form = document.getElementById('consultForm');
  const statusMsg = document.getElementById('consultStatus') || document.getElementById('consultSuccessMsg');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.classList.remove('is-active');
  };

  openBtns.forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-open');
      modal.classList.add('is-active');
      const targetService = b.getAttribute('data-service');
      if (targetService) {
        const checkboxes = modal.querySelectorAll('input[name="services"]');
        checkboxes.forEach(cb => {
          cb.checked = (cb.value === targetService);
        });
        const notes = document.getElementById('clientNotes');
        if (notes) {
          const card = b.closest('.service-card');
          const title = card ? card.querySelector('.service-title')?.textContent.trim() : null;
          const label = title || b.textContent.trim().replace(/[→\s]+$/, '');
          notes.placeholder = `Focus: ${label} — describe your requirements, tech stack, or expected timeline...`;
        }
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (modal.classList.contains('is-open') || modal.classList.contains('is-active'))) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (statusMsg) {
        statusMsg.style.display = 'block';
      }
      form.style.display = 'none';
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          form.reset();
          form.style.display = 'block';
          if (statusMsg) statusMsg.style.display = 'none';
        }, 400);
      }, 3500);
    });
  }
}
