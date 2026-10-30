/**
 * Trainbookeasy — Greyhound Bus Travel & Reservation Assistance
 * Modern Interactive Scripts & Conversion Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initFAQAccordion();
  initModals();
  initCallTracking();
  initHeaderScroll();
});

// 1. Frequently Asked Questions Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Collapse other open items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// 2. Interactive Modal Windows (Privacy Policy, Terms, Cancellation)
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(overlay => {
        if (overlay.classList.contains('active')) {
          closeModal(overlay);
        }
      });
    }
  });
}

// 3. Click-to-Call Conversion Event Tracking
function initCallTracking() {
  const callLinks = document.querySelectorAll('a[href^="tel:"]');
  callLinks.forEach(link => {
    link.addEventListener('click', () => {
      const label = link.innerText.trim() || link.getAttribute('aria-label') || 'Call Button';
      console.log('Conversion Call Clicked:', label);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'call_click',
        phone: '+1-888-716-8933',
        cta_label: label
      });
    });
  });
}

// 4. Sticky Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)';
    }
  });
}
