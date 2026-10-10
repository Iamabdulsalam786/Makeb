/**
 * MAKCOMMs - Business Consulting, Technology & Professional Services
 * "Your Business Requirements. Our Tailored Solutions."
 * 
 * Modular Component-Based Architecture
 */

import { initTheme } from './components/theme.js';
import { initNavigation } from './components/navigation.js';
import { initSearch } from './components/search.js';
import { initHeroCanvas } from './components/hero.js';
import { initLanguageSwitcher } from './components/i18n.js';
import { initMakcomStepper } from './components/stepper.js';
import { initStatsCounter } from './components/stats.js';
import { initSolutionsFilter, initScopeEstimator } from './components/solutions.js';
import { initOfficeClocks } from './components/clocks.js';
import { initConsultationModal } from './components/modal.js';
import { initMakBotWidget } from './components/chatbot.js';
import { initTestimonialSlider } from './components/testimonials.js';
import { initAboutInteractions } from './components/about.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core Look & Feel & Navigation
  initTheme();
  initNavigation();
  initSearch();
  initHeroCanvas();

  // 2. Interactive Page Components
  initAboutInteractions();
  initLanguageSwitcher();
  initMakcomStepper();
  initStatsCounter();
  initSolutionsFilter();
  initScopeEstimator();
  initOfficeClocks();
  initTestimonialSlider();

  // 3. User Engagement Modals & AI Concierge
  initConsultationModal();
  initMakBotWidget();
});
