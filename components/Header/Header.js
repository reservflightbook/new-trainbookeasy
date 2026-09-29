/**
 * Header Component
 * 
 * Clean, professional, and high-converting sticky navigation:
 * - Desktop: Logo, navigation links, and vibrant Call Now CTA button with phone number
 * - Mobile: NO hamburger menu (clean layout with Logo + high-priority Call Now CTA)
 * - Professional SVG icons throughout
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export function renderHeader() {
  return `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        <!-- Brand Logo & Name -->
        <a href="#home" class="header-brand" data-route="home">
          <img src="assets/images/logo.png" alt="Train Book Easy - Book Travel Repeat" class="header-logo-img">
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="header-nav" id="headerNav" aria-label="Main Navigation">
          <a href="#home" class="nav-link active" data-route="home">Train Search</a>
          <a href="#routes" class="nav-link" data-route="routes">Routes</a>
          <a href="#stations" class="nav-link" data-route="stations">Stations</a>
          <a href="#how-it-works" class="nav-link" data-route="how-it-works">How It Works</a>
          <a href="#support" class="nav-link" data-route="support">Support</a>
        </nav>

        <!-- Right Side Header CTA (Optimized for both Desktop & Mobile - No Hamburger Menu) -->
        <div class="header-actions">
          <a href="${SITE_CONFIG.PHONE_HREF}" class="btn-header-call" id="headerCallBtn" title="Call ${SITE_CONFIG.PHONE_NUMBER}">
            <div class="header-call-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="header-call-text-box">
              <span class="header-call-label">Call Now</span>
              <span class="header-call-number">${SITE_CONFIG.PHONE_NUMBER}</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  `;
}

export function initHeader() {
  const callBtn = document.getElementById("headerCallBtn");
  if (callBtn) {
    callBtn.addEventListener("click", () => {
      trackConversion("call_now", { location: "header_cta" });
    });
  }
}
