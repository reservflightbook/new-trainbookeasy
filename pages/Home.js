/**
 * Home Page Component
 * 
 * Complies strictly with Google Ads landing page guidelines, Section 43 (Desktop layout),
 * Section 44 (Mobile layout), and Truth-in-Advertising policies.
 * Uses 100% professional SVG icons throughout.
 */

import { SITE_CONFIG } from "../config/site.js";
import { renderCallNowSection } from "../components/CallNowCTA/CallNowCTA.js";
import { renderPopularRoutes } from "../components/PopularRoutes/PopularRoutes.js";
import { renderFAQ } from "../components/FAQ/FAQ.js";

export function renderHomePage() {
  return `
    <div class="page-home" id="pageHome">
      <!-- 1. Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="hero-header">
            <div class="hero-transparent-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <rect x="4" y="3" width="16" height="16" rx="2"></rect>
                <path d="M4 11h16"></path>
                <path d="M12 3v8"></path>
                <path d="m8 19-2 3"></path>
                <path d="m16 19 2 3"></path>
              </svg>
              <span>Train Travel Information & Booking Assistance</span>
            </div>
            <h1 class="hero-title">Book Your Train Journey</h1>
            <p class="hero-subtitle">
              Instant station searches, passenger route guidance & 24/7 dedicated live telephone booking assistance.
            </p>
          </div>

          <!-- Train Search Card Container -->
          <div id="heroSearchMount"></div>

          <!-- Search Loading Mount -->
          <div id="searchLoadingMount"></div>

          <!-- Search Results / Unavailable State Mount -->
          <div id="searchResultsMount"></div>
        </div>
      </section>

      <!-- 2. Trust Section (Travel Information Made Simple - Professional SVG Icons) -->
      <section class="section-wrapper" id="trustSection">
        <div class="container">
          <div class="section-head">
            <h2>Travel Information Made Simple</h2>
            <p>Reliable station directory, route lookups, and direct telephone travel assistance.</p>
          </div>

          <div class="trust-grid">
            <div class="trust-card">
              <div class="trust-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 class="trust-card-title">Clear Information</h3>
              <p class="trust-card-text">
                Find relevant station and route information across the national rail network in one place.
              </p>
            </div>

            <div class="trust-card">
              <div class="trust-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 class="trust-card-title">Booking Assistance</h3>
              <p class="trust-card-text">
                Speak directly with our dedicated phone support team when you need personalized help.
              </p>
            </div>

            <div class="trust-card">
              <div class="trust-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 class="trust-card-title">Transparent Service</h3>
              <p class="trust-card-text">
                Service terms, applicable assistance fees, and booking conditions are clearly communicated.
              </p>
            </div>

            <div class="trust-card">
              <div class="trust-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 class="trust-card-title">Secure Experience</h3>
              <p class="trust-card-text">
                Your travel inquiries and contact data are strictly handled according to modern privacy practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. How It Works (3 Steps) -->
      <section class="section-wrapper section-alt" id="howItWorksSection">
        <div class="container">
          <div class="section-head">
            <h2>How It Works</h2>
            <p>Simple three-step approach to research and book your passenger rail travel.</p>
          </div>

          <div class="steps-grid">
            <div class="step-card">
              <div class="step-icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <div class="step-number">01</div>
              <h3 class="step-title">SEARCH</h3>
              <p class="step-desc">
                Enter your departure station, destination city, and preferred travel date in our search console.
              </p>
            </div>

            <div class="step-card">
              <div class="step-icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <div class="step-number">02</div>
              <h3 class="step-title">CHECK</h3>
              <p class="step-desc">
                Review available station details, route connections, and travel options for your request.
              </p>
            </div>

            <div class="step-card">
              <div class="step-icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="step-number">03</div>
              <h3 class="step-title">GET ASSISTANCE</h3>
              <p class="step-desc">
                Contact our customer support team directly at <strong>${SITE_CONFIG.PHONE_NUMBER}</strong> for personalized booking support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Featured Popular Routes (3-4 with Images & CTAs) -->
      ${renderPopularRoutes()}

      <!-- 5. Station Directory Section -->
      <section class="section-wrapper section-alt" id="stationDirectorySection">
        <div class="container">
          <div class="section-head">
            <h2>Find a Train Station</h2>
            <p>Explore over 640 verified passenger rail stations across the United States.</p>
          </div>

          <div id="homeStationDirectoryMount"></div>
        </div>
      </section>

      <!-- 6. Mid-Page Call Now CTA Section -->
      <div class="container">
        ${renderCallNowSection()}
      </div>

      <!-- 7. FAQ Section -->
      ${renderFAQ()}
    </div>
  `;
}
