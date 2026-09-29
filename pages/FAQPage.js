/**
 * FAQ Page Component
 * 
 * Standalone dedicated FAQ page providing comprehensive travel answers.
 */

import { renderFAQ, initFAQ } from "../components/FAQ/FAQ.js";
import { SITE_CONFIG } from "../config/site.js";

export function renderFAQPage() {
  return `
    <div class="page-faq">
      ${renderFAQ()}
      
      <div class="container" style="max-width: 820px; margin-bottom: 64px;">
        <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 24px; border: 1px solid var(--border-light); text-align: center;">
          <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Still have questions?</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 18px;">
            Our travel assistance representatives are ready to help with route queries and booking support.
          </p>
          <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call" style="display: inline-flex;">
            Call Support: ${SITE_CONFIG.PHONE_NUMBER}
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initFAQPage() {
  initFAQ();
}
