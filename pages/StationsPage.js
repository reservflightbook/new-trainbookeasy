/**
 * Stations Page Component
 * 
 * Standalone stations directory page featuring:
 * - Real-time keyword search
 * - State filter dropdown
 * - Alphabetical browsing bar (A-Z)
 * - Paginated station cards
 */

import { getAllStations } from "../services/stationSearch.js";
import { StationDirectory } from "../components/StationDirectory/StationDirectory.js";

export function renderStationsPage() {
  const allStns = getAllStations();
  const statesSet = new Set();
  allStns.forEach(s => { if (s.state) statesSet.add(s.state); });
  const sortedStates = Array.from(statesSet).sort();

  const stateOptions = sortedStates.map(st => `<option value="${st}">${st}</option>`).join("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const alphabetButtons = alphabet.map(letter => `
    <button type="button" class="btn btn-outline alpha-filter-btn" data-letter="${letter}" style="padding: 4px 10px; font-size: 0.82rem; min-width: 32px;">
      ${letter}
    </button>
  `).join("");

  return `
    <div class="page-stations">
      <div class="container section-wrapper">
        <div class="section-head" style="text-align: left; max-width: 100%;">
          <h2>National Train Station Directory</h2>
          <p>Browse official passenger rail stations by city, state, or alphabetical index.</p>
        </div>

        <!-- Filter Controls Bar -->
        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 20px; margin-bottom: 28px; display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <label style="font-weight: 700; font-size: 0.9rem; color: var(--text-secondary);">Filter by State:</label>
            <select id="stateFilterSelect" style="padding: 8px 14px; font-weight: 600; min-width: 160px;">
              <option value="ALL">All States (USA & Canada)</option>
              ${stateOptions}
            </select>
            <button type="button" class="btn btn-outline" id="resetStationsFilterBtn" style="font-size: 0.85rem; padding: 7px 14px;">
              Reset Filter
            </button>
          </div>

          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">
              Browse Alphabetically:
            </div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;" id="alphabetBar">
              ${alphabetButtons}
            </div>
          </div>
        </div>

        <!-- Mounted Directory -->
        <div id="fullStationDirectoryMount"></div>
      </div>
    </div>
  `;
}

export function initStationsPage(onSelectStation) {
  const mount = document.getElementById("fullStationDirectoryMount");
  if (!mount) return;

  const directoryInstance = new StationDirectory(mount, onSelectStation);

  // State Filter
  const stateSelect = document.getElementById("stateFilterSelect");
  if (stateSelect) {
    stateSelect.addEventListener("change", (e) => {
      const selectedState = e.target.value;
      const all = getAllStations();
      if (selectedState === "ALL") {
        directoryInstance.setStations(all);
      } else {
        const filtered = all.filter(s => s.state === selectedState);
        directoryInstance.setStations(filtered);
      }
    });
  }

  // Alphabetical Filter
  document.querySelectorAll(".alpha-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const letter = btn.dataset.letter;
      const all = getAllStations();
      const filtered = all.filter(s => (s.stop_name || "").toUpperCase().startsWith(letter) || (s.city || "").toUpperCase().startsWith(letter));
      directoryInstance.setStations(filtered);
    });
  });

  // Reset
  const resetBtn = document.getElementById("resetStationsFilterBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (stateSelect) stateSelect.value = "ALL";
      directoryInstance.setStations(getAllStations());
    });
  }
}
