/**
 * Search Loading State Component
 * 
 * Displays an honest, clean UX loading transition during request evaluation:
 * - "Checking your travel request..."
 * - Shows verified departure station, destination, and travel date
 * - Does NOT display deceptive diagnostic/scanning progress
 */

export function renderSearchLoading(params = {}) {
  const originName = params.originName || "Departure Station";
  const destName = params.destName || "Destination Station";
  const dateFormatted = params.departureDate || "Selected Date";

  return `
    <div class="search-loading-container" id="searchLoadingComponent" role="status" aria-live="polite">
      <div class="loading-spinner"></div>
      <h3 class="loading-heading">Checking your travel request...</h3>
      
      <div class="loading-steps-list">
        <div class="loading-step-item">
          <span class="loading-step-check">✓</span>
          <span>Departure: <strong>${originName}</strong></span>
        </div>
        <div class="loading-step-item">
          <span class="loading-step-check">✓</span>
          <span>Destination: <strong>${destName}</strong></span>
        </div>
        <div class="loading-step-item">
          <span class="loading-step-check">✓</span>
          <span>Travel Date: <strong>${dateFormatted}</strong></span>
        </div>
      </div>

      <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 18px;">
        Checking available travel information...
      </p>
    </div>
  `;
}
