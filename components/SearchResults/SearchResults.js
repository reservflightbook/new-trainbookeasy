/**
 * Search Results Component (Available State)
 * 
 * Displays verified results returned by an authorized API data source.
 * Strict policy compliance: Only displays fields returned by the actual data source.
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export function renderSearchResults(data) {
  const { originStation, destinationStation, departureDate, results = [] } = data;

  const resultCards = results.map((t, idx) => `
    <div class="result-train-card" style="background:#ffffff; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:24px; margin-bottom:16px; box-shadow:var(--shadow-sm); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div>
        <div style="font-size:1.15rem; font-weight:700; color:var(--text-main); margin-bottom:4px;">
          ${t.serviceName || t.trainNumber || "Scheduled Passenger Rail Service"}
        </div>
        <div style="font-size:0.9rem; color:var(--text-secondary); display:flex; gap:16px;">
          ${t.departureTime ? `<span>Dep: <strong>${t.departureTime}</strong></span>` : ''}
          ${t.arrivalTime ? `<span>Arr: <strong>${t.arrivalTime}</strong></span>` : ''}
          ${t.duration ? `<span>Duration: <strong>${t.duration}</strong></span>` : ''}
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:12px;">
        <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call result-call-cta" data-idx="${idx}">
          Get Booking Assistance
        </a>
      </div>
    </div>
  `).join("");

  return `
    <div class="search-results-container" style="max-width:880px; margin:36px auto 0;">
      <div style="background:var(--bg-subtle); border-radius:var(--radius-md); padding:20px 24px; margin-bottom:24px; border:1px solid var(--border-light);">
        <div style="font-size:0.75rem; font-weight:700; text-transform:uppercase; color:var(--text-muted); letter-spacing:0.05em;">YOUR ROUTE</div>
        <div style="font-size:1.3rem; font-weight:800; color:var(--text-main); margin:4px 0;">
          ${originStation?.stop_name || 'Origin'} ➔ ${destinationStation?.stop_name || 'Destination'}
        </div>
        <div style="font-size:0.88rem; color:var(--text-secondary);">
          TRAVEL DATE: <strong>${departureDate}</strong>
        </div>
      </div>

      <div>
        ${resultCards}
      </div>
    </div>
  `;
}

export function initSearchResults() {
  document.querySelectorAll(".result-call-cta").forEach(btn => {
    btn.addEventListener("click", () => {
      trackConversion("call_now", { location: "search_results_card" });
    });
  });
}
