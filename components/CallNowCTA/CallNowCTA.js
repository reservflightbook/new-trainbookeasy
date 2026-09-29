/**
 * Call Now CTA Component (Mid-Page & Banner)
 * 
 * Provides an honest, high-conversion call opportunity without fake urgency.
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export function renderCallNowSection() {
  return `
    <section class="call-now-section" id="callNowSection">
      <div class="call-now-content">
        <span class="call-now-badge">Direct Phone Assistance</span>
        
        <h2 class="call-now-title">Prefer to Speak With Someone?</h2>
        
        <p class="call-now-text">
          Need help with your train travel request? Our support team can assist with route information, station details, travel dates and booking questions.
        </p>

        <div class="call-now-buttons">
          <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call btn-call-large midpage-call-btn" id="midPageCallBtn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call Now: ${SITE_CONFIG.PHONE_NUMBER}</span>
          </a>

          <a href="#contact" class="btn btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; background: rgba(255,255,255,0.08);" data-route="contact">
            Contact Us Online
          </a>
        </div>

        <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 18px;">
          Support Hours: ${SITE_CONFIG.SUPPORT_HOURS}
        </div>
      </div>
    </section>
  `;
}

export function initCallNowSection() {
  const btn = document.getElementById("midPageCallBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      trackConversion("call_now", { location: "midpage_cta" });
    });
  }
}
