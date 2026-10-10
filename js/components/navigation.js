/**
 * Component: NavigationManager
 * File: js/components/navigation.js
 * Controls sticky header, mega-menu tab switching, and the mobile sidebar/drawer with smooth gestures.
 */

export function initNavigation() {
  const header = document.querySelector('.main-header') || document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 25) {
            header.classList.add('is-scrolled');
          } else {
            header.classList.remove('is-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Mega menu tab switcher (Desktop)
  const tabLinks = document.querySelectorAll('.tab-buttons .tab-link');
  tabLinks.forEach(btn => {
    const activate = () => {
      const targetId = btn.getAttribute('data-tab');
      const container = btn.closest('.mega-menu-content');
      if (!container) return;

      container.querySelectorAll('.tab-buttons .tab-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      container.querySelectorAll('.tab-contents .tab-content').forEach(p => p.classList.remove('active'));
      const targetPanel = container.querySelector(`#${targetId}`);
      if (targetPanel) targetPanel.classList.add('active');
    };

    btn.addEventListener('mouseenter', activate);
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activate();
    });
  });

  // Mobile Drawer Manager
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerCloseBtn');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerSearchTrigger = document.getElementById('drawerSearchTrigger');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDrawer();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Accordion toggles inside mobile drawer
  if (mobileDrawer) {
    const accordionBtns = mobileDrawer.querySelectorAll('.drawer-accordion-btn');
    accordionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = btn.closest('.has-accordion');
        if (!parent) return;

        const isExpanded = parent.classList.contains('is-active');
        // Close siblings for clean accordion behavior
        mobileDrawer.querySelectorAll('.has-accordion').forEach(item => {
          if (item !== parent) {
            item.classList.remove('is-active');
            const otherBtn = item.querySelector('.drawer-accordion-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isExpanded) {
          parent.classList.remove('is-active');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          parent.classList.add('is-active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close drawer when any internal link is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('a[href^="#"]');
    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        closeDrawer();

        if (href === '#consultModal' || link.classList.contains('open-consult-modal')) {
          const modal = document.getElementById('consultModal');
          if (modal) {
            modal.classList.add('is-open', 'is-active');
          }
        }
      });
    });

    // Mobile Drawer Search Trigger connects directly to functional search
    if (drawerSearchTrigger) {
      drawerSearchTrigger.addEventListener('click', () => {
        closeDrawer();
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
          searchBtn.click();
        }
      });
    }
  }
}
