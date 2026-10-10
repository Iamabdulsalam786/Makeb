/**
 * Component: SolutionsManager & Direct Consultation Form
 * File: js/components/solutions.js
 * Controls enterprise solution capabilities and the direct consultation inquiry form.
 */

export function initSolutionsFilter() {
  // Ensure all service cards are active and visible in the unified grid
  const cards = document.querySelectorAll('.service-card, .solution-card');
  cards.forEach(card => {
    card.style.display = 'flex';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

export function initScopeEstimator() {
  const estimatorSection = document.getElementById('scope-estimator');
  if (!estimatorSection) return;

  const consultForm = document.getElementById('simpleEstimatorForm');
  const successBox = document.getElementById('simpleEstSuccess');
  const successMsg = document.getElementById('successDetailMsg');
  const resetBtn = document.getElementById('resetEstFormBtn');
  const serviceSelect = document.getElementById('simpleEstService');

  const serviceLabels = {
    web: "Web Development & SaaS",
    app: "Mobile App Engineering",
    cyber: "Cybersecurity & Defense",
    ai: "Custom AI & Agentic Systems",
    erp: "Enterprise ERP Modernisation",
    it: "Cloud & IT Infrastructure",
    talent: "Engineering Talent Augmentation",
    bpo: "Turnkey Global BPO Desks"
  };

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('estContactName');
      const emailInput = document.getElementById('estContactEmail');
      const companyInput = document.getElementById('estContactCompany');

      const name = nameInput ? nameInput.value.trim() : 'Valued Client';
      const email = emailInput ? emailInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const serviceVal = serviceSelect ? serviceSelect.value : 'erp';
      const serviceName = serviceLabels[serviceVal] || "Enterprise Solutions";

      consultForm.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
      }

      if (successMsg) {
        successMsg.innerHTML = `Thank you, <strong>${name}</strong>${company ? ' from ' + company : ''}! We've received your inquiry regarding <strong>${serviceName}</strong>. Our senior practice directors will review your requirements and reach out directly at <strong>${email}</strong> within 24 business hours.`;
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (consultForm) {
        consultForm.reset();
        consultForm.style.display = 'flex';
      }
      if (successBox) {
        successBox.style.display = 'none';
      }
    });
  }
}
