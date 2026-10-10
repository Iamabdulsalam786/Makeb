/**
 * Component: LanguageManager
 * Multilingual engine supporting English and German localization.
 */

const dictionary = {
  English: {
    heroTitlePrefix: "Your Business",
    heroTitleReq: "Requirements.",
    heroTitleOur: "Our",
    heroTitleTailored: "Tailored",
    heroTitleSol: "Solutions.",
    heroSubtitle: "We listen to your challenges, understand your business problems, and implement the right technology, people, and processes to drive real growth — across domestic and international markets.",
    exploreSolutions: "Explore Solutions",
    configureScope: "Estimate Solution Scope",
    scheduleConsult: "Schedule Discovery Session"
  },
  German: {
    heroTitlePrefix: "Ihre Business-",
    heroTitleReq: "Anforderungen.",
    heroTitleOur: "Unsere",
    heroTitleTailored: "Maßgeschneiderten",
    heroTitleSol: "Lösungen.",
    heroSubtitle: "Wir analysieren Ihre geschäftlichen Herausforderungen und implementieren passgenaue Technologien, Fachkräfte und Prozesse für nachhaltiges Wachstum — über nationale und internationale Märkte hinweg.",
    exploreSolutions: "Lösungen Entdecken",
    configureScope: "Lösungsumfang Berechnen",
    scheduleConsult: "Erstgespräch Vereinbaren"
  }
};

export function initLanguageSwitcher() {
  const langSelect = document.getElementById('langSelect');
  if (!langSelect) return;

  langSelect.addEventListener('change', (e) => {
    const lang = e.target.value;
    applyLanguage(lang);
  });
}

export function applyLanguage(lang) {
  const texts = dictionary[lang] || dictionary.English;
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) {
      el.textContent = texts[key];
    }
  });
}
