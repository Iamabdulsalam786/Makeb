/**
 * Component: SearchManager
 * File: js/components/search.js
 * Instant live enterprise capability search with category filters, highlighting, and direct navigation.
 */

const SEARCH_DATABASE = [
  {
    id: "erp",
    category: "erp",
    categoryLabel: "Enterprise ERP",
    icon: "🏢",
    title: "Enterprise ERP Implementation & 24/7 SLA Support",
    desc: "End-to-end ERP rollouts, custom modules, financial and supply-chain automation across SAP, Oracle, NetSuite.",
    target: "#solutions",
    serviceCode: "erp",
    isModal: false
  },
  {
    id: "ai",
    category: "ai",
    categoryLabel: "Custom AI & Automation",
    icon: "🤖",
    title: "Agentic AI Workflows & Enterprise RAG Pipelines",
    desc: "Autonomous multi-agent task orchestration, LLM document parsing, and predictive business intelligence tailored to proprietary data.",
    target: "#solutions",
    serviceCode: "ai",
    isModal: false
  },
  {
    id: "web",
    category: "web",
    categoryLabel: "Web & SaaS",
    icon: "🌐",
    title: "High-Scale Web Platforms & Mission-Critical SaaS",
    desc: "Cloud-native web architectures, microservices APIs, and sub-second web applications with design systems.",
    target: "#solutions",
    serviceCode: "web",
    isModal: false
  },
  {
    id: "mobile",
    category: "web",
    categoryLabel: "Mobile Engineering",
    icon: "📱",
    title: "Native iOS, Android & Flutter Mobile Applications",
    desc: "High-performance consumer and enterprise mobile software engineered for scale, reliability, and security.",
    target: "#solutions",
    serviceCode: "app",
    isModal: false
  },
  {
    id: "cyber",
    category: "cyber",
    categoryLabel: "Cybersecurity",
    icon: "🛡️",
    title: "Zero-Trust Architecture & Red-Team Penetration Defense",
    desc: "Continuous SIEM threat monitoring, compliance audits (ISO/SOC2), and military-grade ransomware defense.",
    target: "#solutions",
    serviceCode: "cyber",
    isModal: false
  },
  {
    id: "cloud",
    category: "cloud",
    categoryLabel: "Managed IT & Cloud",
    icon: "☁️",
    title: "Multi-Region Cloud (AWS/Azure/GCP) & 24/7 SRE Desks",
    desc: "99.99% high-availability systems, automated disaster recovery, enterprise networking, and cloud cost optimization.",
    target: "#solutions",
    serviceCode: "it",
    isModal: false
  },
  {
    id: "talent",
    category: "talent",
    categoryLabel: "Talent Augmentation",
    icon: "👥",
    title: "Dedicated Engineering Pods & Senior Technical Talent",
    desc: "Pre-vetted senior software engineers, DevOps leads, QA squads, and architects ready to integrate into your sprints.",
    target: "#solutions",
    serviceCode: "talent",
    isModal: false
  },
  {
    id: "bpo",
    category: "talent",
    categoryLabel: "Global BPO",
    icon: "🎧",
    title: "HIPAA-Compliant Medical Billing & Turnkey Contact Centers",
    desc: "24/7 cross-timezone operational processing squads, multilingual customer care desks, and back-office administration.",
    target: "#solutions",
    serviceCode: "bpo",
    isModal: false
  },
  {
    id: "methodology",
    category: "about",
    categoryLabel: "Methodology",
    icon: "⚡",
    title: "AIT Delivery Execution (Analyse • Integrate • Transform)",
    desc: "Our proprietary 3-stage strategic framework: comprehensive operational discovery, flawless integration, and sustained value transformation.",
    target: "#thepath",
    isModal: false
  },
  {
    id: "metrics",
    category: "about",
    categoryLabel: "Scale & Impact",
    icon: "📊",
    title: "Enterprise Scale Metrics & 99.8% Client Retention",
    desc: "Over 140+ enterprise deployments, 24/7 active mission-critical support windows, and proven global ROI.",
    target: "#growth",
    isModal: false
  },
  {
    id: "consultation",
    category: "consulting",
    categoryLabel: "Consultation Form",
    icon: "📝",
    title: "Direct Strategic Project Inquiry & Estimation",
    desc: "Connect directly with senior practice directors. Guaranteed response and tailored proposal within 24 business hours.",
    target: "#scope-estimator",
    isModal: false
  },
  {
    id: "locations",
    category: "about",
    categoryLabel: "Global Presence",
    icon: "🌍",
    title: "International Delivery Hubs & Live Office Timezones",
    desc: "Operational coverage across United States (EST/CST/PST), United Kingdom, Europe, UAE, and Asia-Pacific.",
    target: "#locations",
    isModal: false
  },
  {
    id: "schedule-modal",
    category: "consulting",
    categoryLabel: "Direct Schedule",
    icon: "📅",
    title: "Book Strategic Discovery Session (Consultation Modal)",
    desc: "Open direct scheduling dialog with capability selection and NDA-protected intake.",
    target: "#consultModal",
    isModal: true
  }
];

export function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchFull = document.getElementById('searchFull');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchChips = document.getElementById('searchChips');
  const resultsContainer = document.getElementById('searchResultsList');
  const resultsCount = document.getElementById('searchResultsCount');

  if (!searchFull || !searchInput) return;

  let activeCategory = 'all';

  function openSearch() {
    searchFull.classList.add('is-open');
    searchFull.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      searchInput.focus();
    }, 120);
    renderResults(searchInput.value.trim());
  }

  function closeSearch() {
    searchFull.classList.remove('is-open');
    searchFull.setAttribute('aria-hidden', 'true');
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (searchFull.classList.contains('is-open')) {
        closeSearch();
      } else {
        openSearch();
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }

  // Clear button
  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchClearBtn.style.display = 'none';
      searchInput.focus();
      renderResults('');
    });
  }

  // Input typing listener
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (searchClearBtn) {
      searchClearBtn.style.display = query.length > 0 ? 'inline-flex' : 'none';
    }
    renderResults(query);
  });

  // Filter chips
  if (searchChips) {
    searchChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.search-chip');
      if (!chip) return;
      searchChips.querySelectorAll('.search-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter') || 'all';
      renderResults(searchInput.value.trim());
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (searchFull.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closeSearch();
      } else if (e.key === 'Enter' && resultsContainer) {
        const firstItem = resultsContainer.querySelector('.search-result-card');
        if (firstItem) {
          firstItem.click();
        }
      }
    }
  });

  // Filter and highlight logic
  function filterItems(query) {
    let items = SEARCH_DATABASE;

    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    if (!query) {
      return items.slice(0, 6);
    }

    const q = query.toLowerCase();
    return items.filter(item => {
      return item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        (item.serviceCode && item.serviceCode.toLowerCase().includes(q));
    });
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function renderResults(query) {
    if (!resultsContainer) return;

    const matched = filterItems(query);

    if (resultsCount) {
      if (!query) {
        resultsCount.textContent = activeCategory === 'all' 
          ? 'Featured Capabilities & Quick Links' 
          : `Capabilities (${matched.length})`;
      } else {
        resultsCount.textContent = `Found ${matched.length} result${matched.length === 1 ? '' : 's'} for "${query}"`;
      }
    }

    if (matched.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <div class="no-results-icon">🔍</div>
          <h4>No direct match for "${query}"</h4>
          <p>Looking for a custom enterprise engagement? Connect with our AI concierge or submit an architecture review request.</p>
          <div class="no-results-actions">
            <button type="button" class="btn-search-help open-consult-modal" id="searchFallbackConsult">Request Discovery Session</button>
            <button type="button" class="btn-search-help btn-ghost-search" id="searchFallbackChat">Ask MakBot Concierge</button>
          </div>
        </div>
      `;

      const fallbackConsult = document.getElementById('searchFallbackConsult');
      if (fallbackConsult) {
        fallbackConsult.addEventListener('click', () => {
          closeSearch();
        });
      }

      const fallbackChat = document.getElementById('searchFallbackChat');
      if (fallbackChat) {
        fallbackChat.addEventListener('click', () => {
          closeSearch();
          const chatFab = document.getElementById('chatTrigger') || document.getElementById('chatWidgetFab');
          if (chatFab) chatFab.click();
        });
      }
      return;
    }

    resultsContainer.innerHTML = matched.map(item => `
      <div class="search-result-card" data-target="${item.target}" data-service="${item.serviceCode || ''}" data-is-modal="${item.isModal}">
        <div class="result-icon-badge">${item.icon}</div>
        <div class="result-body">
          <div class="result-meta">
            <span class="result-category-tag">${item.categoryLabel}</span>
          </div>
          <h4 class="result-title">${highlightMatch(item.title, query)}</h4>
          <p class="result-desc">${highlightMatch(item.desc, query)}</p>
        </div>
        <div class="result-arrow">
          <span>Go</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    `).join('');

    // Attach click listeners to result cards
    resultsContainer.querySelectorAll('.search-result-card').forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        const serviceCode = card.getAttribute('data-service');
        const isModal = card.getAttribute('data-is-modal') === 'true';

        closeSearch();

        if (isModal || target === '#consultModal') {
          const modal = document.getElementById('consultModal');
          if (modal) {
            modal.classList.add('is-open', 'is-active');
            if (serviceCode) {
              const radio = modal.querySelector(`input[name="services"][value="${serviceCode}"]`);
              if (radio) radio.checked = true;
            }
          }
        } else if (target) {
          const elem = document.querySelector(target);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Pre-render initial results
  renderResults('');
}
