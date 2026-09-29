/**
 * Popular Routes Component
 * 
 * Displays 4 featured high-traffic passenger rail corridors with photographic
 * imagery, prominent CTA action buttons, and direct phone conversion links.
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export const FEATURED_ROUTES_DATA = [
  {
    fromId: "WAS",
    fromName: "Washington, DC",
    toId: "NYP",
    toName: "New York, NY",
    corridor: "Northeast Corridor",
    image: "assets/images/route-1.jpg",
    highlight: "High-Frequency Express",
    desc: "Fast downtown-to-downtown transit connecting Washington Union Station and NY Moynihan Train Hall."
  },
  {
    fromId: "LAX",
    fromName: "Los Angeles, CA",
    toId: "SAN",
    toName: "San Diego, CA",
    corridor: "Pacific Surfliner",
    image: "assets/images/route-2.jpg",
    highlight: "Scenic Ocean Views",
    desc: "Iconic coastal rail line traveling alongside Southern California beaches and coastal cliffs."
  },
  {
    fromId: "CHI",
    fromName: "Chicago, IL",
    toId: "DEN",
    toName: "Denver, CO",
    corridor: "California Zephyr",
    image: "assets/images/route-3.jpg",
    highlight: "Great Plains & Rockies",
    desc: "Legendary long-distance rail experience crossing Midwestern farmlands towards the Rocky Mountains."
  }
];

export const POPULAR_ROUTES_DATA = FEATURED_ROUTES_DATA;

export function renderPopularRoutes() {
  const cardsHtml = FEATURED_ROUTES_DATA.map(r => `
    <div class="featured-route-card">
      <div class="featured-route-img-wrap">
        <img src="${r.image}" alt="${r.fromName} to ${r.toName} train route" class="featured-route-img" loading="lazy">
        <span class="route-corridor-badge">${r.corridor}</span>
        <span class="route-highlight-badge">${r.highlight}</span>
      </div>

      <div class="featured-route-body">
        <div class="featured-route-title">
          <span>${r.fromName}</span>
          <span class="route-arrow-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
          <span>${r.toName}</span>
        </div>

        <p class="featured-route-desc">${r.desc}</p>

        <div class="featured-route-actions">
          <button type="button" class="btn btn-primary route-cta-btn" data-from-id="${r.fromId}" data-to-id="${r.toId}">
            <span>Book This Route</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call route-call-mini-btn" title="Call to book ${r.fromName} to ${r.toName}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>Call</span>
          </a>
        </div>
      </div>
    </div>
  `).join("");

  return `
    <section class="section-wrapper" id="popularRoutesSection">
      <div class="container">
        <div class="section-head">
          <div class="hero-transparent-badge" style="margin-bottom: 8px;">Featured Passenger Routes</div>
          <h2>Popular Train Routes</h2>
          <p>Explore frequently traveled passenger rail corridors across the national network. Click to pre-fill your journey details or call for live assistance.</p>
        </div>

        <div class="featured-routes-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initPopularRoutes(onRouteSelect) {
  document.querySelectorAll(".route-cta-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const fromId = btn.dataset.fromId;
      const toId = btn.dataset.toId;
      if (onRouteSelect) {
        onRouteSelect(fromId, toId);
      }
    });
  });

  document.querySelectorAll(".route-call-mini-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      trackConversion("call_now", { location: "popular_routes_card" });
    });
  });
}
