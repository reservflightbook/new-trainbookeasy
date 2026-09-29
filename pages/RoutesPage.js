/**
 * Routes Page Component
 * 
 * Explore Train Routes page allowing users to filter and browse major rail corridors,
 * with click-to-prefill returning to the main search form.
 */

import { POPULAR_ROUTES_DATA } from "../components/PopularRoutes/PopularRoutes.js";
import { SITE_CONFIG } from "../config/site.js";
import { trackConversion } from "../utils/analytics.js";

export function renderRoutesPage() {
  const routesList = [
    ...POPULAR_ROUTES_DATA,
    { fromId: "SEA", fromName: "Seattle, WA", toId: "PDX", toName: "Portland, OR", corridor: "Cascades Corridor" },
    { fromId: "CHI", fromName: "Chicago, IL", toId: "STL", toName: "St. Louis, MO", corridor: "Lincoln Service" },
    { fromId: "ALB", fromName: "Albany, NY", toId: "NYP", toName: "New York, NY", corridor: "Empire Service" },
    { fromId: "DEN", fromName: "Denver, CO", toId: "CHI", toName: "Chicago, IL", corridor: "California Zephyr" }
  ];

  const cardsHtml = routesList.map(r => `
    <div class="route-card page-route-item" data-from-id="${r.fromId}" data-to-id="${r.toId}">
      <div>
        <div class="route-stations">
          <span>${r.fromName}</span>
          <span class="route-arrow">➔</span>
          <span>${r.toName}</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
          Station Codes: ${r.fromId} to ${r.toId}
        </div>
      </div>
      <div style="text-align: right;">
        <span class="route-tag">${r.corridor}</span>
        <div style="margin-top: 8px;">
          <span style="color: var(--primary); font-size: 0.85rem; font-weight: 700;">Search Route →</span>
        </div>
      </div>
    </div>
  `).join("");

  return `
    <div class="page-routes">
      <div class="container section-wrapper">
        <div class="section-head" style="text-align: left; max-width: 100%;">
          <h2>Explore Train Routes</h2>
          <p>Discover major regional corridors, long-distance routes, and cross-country train journeys. Select any route to search travel dates.</p>
        </div>

        <!-- Filter bar -->
        <div style="background: var(--bg-surface); padding: 18px 24px; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
          <div style="font-weight: 600; color: var(--text-secondary);">
            Need a custom route or multi-segment itinerary?
          </div>
          <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call" id="routesCallBtn">
            Call Route Assistance: ${SITE_CONFIG.PHONE_NUMBER}
          </a>
        </div>

        <div class="routes-grid">
          ${cardsHtml}
        </div>
      </div>
    </div>
  `;
}

export function initRoutesPage(onRouteSelect) {
  document.querySelectorAll(".page-route-item").forEach(card => {
    card.addEventListener("click", () => {
      const fromId = card.dataset.fromId;
      const toId = card.dataset.toId;
      if (onRouteSelect) {
        onRouteSelect(fromId, toId);
      }
    });
  });

  const callBtn = document.getElementById("routesCallBtn");
  if (callBtn) {
    callBtn.addEventListener("click", () => {
      trackConversion("call_now", { location: "routes_page" });
    });
  }
}
