/**
 * Footer Component
 * 
 * Comprehensive 4-column footer with legal disclaimers, services directory,
 * contact info, support channels, and compliance notices.
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <!-- Transparent Legal Notice Banner -->
        <div class="footer-disclaimer-box">
          <strong>Transparency Notice:</strong> ${SITE_CONFIG.DISCLAIMER}
        </div>

        <div class="footer-grid">
          <!-- Col 1: Brand Info -->
          <div class="footer-col">
            <div class="footer-logo-wrap">
              <img src="assets/images/logo.png" alt="${SITE_CONFIG.BRAND_NAME} - Book Travel Repeat" class="footer-logo-img">
            </div>
            <div class="footer-brand-name">${SITE_CONFIG.BRAND_NAME}</div>
            <p style="color: #94a3b8; font-size: 0.92rem; line-height: 1.6; margin-bottom: 16px;">
              ${SITE_CONFIG.TAGLINE}
            </p>
            <div style="font-size: 0.88rem; color: #94a3b8; line-height: 1.6;">
              <div><strong>Phone:</strong> <a href="${SITE_CONFIG.PHONE_HREF}" class="footer-call-link" style="color: #2dd4bf; font-weight: 700;">${SITE_CONFIG.PHONE_NUMBER}</a></div>
              <div><strong>Email:</strong> <a href="mailto:${SITE_CONFIG.EMAIL}" style="color: #94a3b8;">${SITE_CONFIG.EMAIL}</a></div>
              <div><strong>Hours:</strong> ${SITE_CONFIG.SUPPORT_HOURS}</div>
            </div>
          </div>

          <!-- Col 2: Services -->
          <div class="footer-col">
            <h4>Services</h4>
            <ul class="footer-links">
              <li><a href="#home" data-route="home">Train Search</a></li>
              <li><a href="#routes" data-route="routes">Train Routes</a></li>
              <li><a href="#stations" data-route="stations">Station Information</a></li>
              <li><a href="${SITE_CONFIG.PHONE_HREF}" class="footer-call-link">Booking Assistance</a></li>
            </ul>
          </div>

          <!-- Col 3: Support -->
          <div class="footer-col">
            <h4>Support</h4>
            <ul class="footer-links">
              <li><a href="#contact" data-route="contact">Contact Us</a></li>
              <li><a href="#faq" data-route="faq">FAQs</a></li>
              <li><a href="${SITE_CONFIG.PHONE_HREF}" class="footer-call-link">Call Support</a></li>
              <li><a href="#how-it-works" data-route="how-it-works">How It Works</a></li>
              <li><a href="#about" data-route="about">About Us</a></li>
            </ul>
          </div>

          <!-- Col 4: Legal -->
          <div class="footer-col">
            <h4>Legal</h4>
            <ul class="footer-links">
              <li><a href="#privacy-policy" data-route="privacy-policy">Privacy Policy</a></li>
              <li><a href="#terms-and-conditions" data-route="terms-and-conditions">Terms & Conditions</a></li>
              <li><a href="#refund-cancellation" data-route="refund-cancellation">Refund / Cancellation</a></li>
              <li><a href="#disclaimer" data-route="disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <div>
            <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong> • ${SITE_CONFIG.BUSINESS_ADDRESS.formatted}
          </div>
          <div>
            © 2026 ${SITE_CONFIG.BRAND_NAME}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter() {
  document.querySelectorAll(".footer-call-link").forEach(link => {
    link.addEventListener("click", () => {
      trackConversion("call_now", { location: "footer" });
    });
  });
}
