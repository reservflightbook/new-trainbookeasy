/**
 * Station Directory Component
 * 
 * Interactive station directory with real-time text filter and pagination.
 * Allows quick browsing of the 645 verified Amtrak rail stations.
 */

import { getAllStations } from "../../services/stationSearch.js";

export class StationDirectory {
  constructor(containerEl, onSelectStation) {
    this.container = containerEl;
    this.onSelectStation = onSelectStation;
    this.allStations = [];
    this.filteredStations = [];
    this.currentPage = 1;
    this.pageSize = 12;

    this.init();
  }

  init() {
    this.allStations = getAllStations();
    this.filteredStations = [...this.allStations];
    this.render();
  }

  setStations(stations) {
    this.allStations = stations;
    this.filteredStations = [...stations];
    this.currentPage = 1;
    this.render();
  }

  filterStations(query) {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      this.filteredStations = [...this.allStations];
    } else {
      this.filteredStations = this.allStations.filter(s => {
        const name = (s.stop_name || "").toLowerCase();
        const city = (s.city || "").toLowerCase();
        const state = (s.state || "").toLowerCase();
        const code = (s.stop_id || "").toLowerCase();
        return name.includes(clean) || city.includes(clean) || state.includes(clean) || code === clean;
      });
    }
    this.currentPage = 1;
    this.renderCards();
    this.renderPagination();
  }

  render() {
    this.container.innerHTML = `
      <div class="stations-directory-component">
        <div class="stations-search-box">
          <div class="field-input-box" style="height: 48px;">
            <input type="text" id="directorySearchInput" placeholder="Search by station, city or state (e.g. Philadelphia, California, BOS)..." aria-label="Search station directory">
          </div>
        </div>

        <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px; text-align: right;">
          Showing <span id="directoryCountLabel">${this.filteredStations.length}</span> stations
        </div>

        <div class="stations-cards-grid" id="directoryCardsGrid"></div>
        <div class="pagination-controls" id="directoryPagination"></div>
      </div>
    `;

    const searchInput = this.container.querySelector("#directorySearchInput");
    searchInput.addEventListener("input", (e) => this.filterStations(e.target.value));

    this.renderCards();
    this.renderPagination();
  }

  renderCards() {
    const grid = this.container.querySelector("#directoryCardsGrid");
    const countLabel = this.container.querySelector("#directoryCountLabel");
    if (countLabel) countLabel.textContent = this.filteredStations.length;

    if (this.filteredStations.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 16px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border-light);">
          <div style="font-size: 2rem; margin-bottom: 8px;">🚉</div>
          <h4>No stations match your search</h4>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">Try searching by state abbreviation (e.g. "NY", "IL") or major city name.</p>
        </div>
      `;
      return;
    }

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    const pageSlice = this.filteredStations.slice(startIdx, endIdx);

    grid.innerHTML = pageSlice.map(stn => {
      const locText = [stn.city, stn.state].filter(Boolean).join(", ");
      return `
        <div class="station-card">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <span class="station-card-name">${stn.stop_name}</span>
              <span class="station-code-pill">${stn.stop_id}</span>
            </div>
            <div class="station-card-loc">${locText || 'United States Rail Network'}</div>
          </div>

          <div class="station-card-bottom">
            <span style="font-size: 0.76rem; color: var(--text-subtle);">
              ${stn.latitude ? `${stn.latitude.toFixed(3)}°N, ${Math.abs(stn.longitude).toFixed(3)}°W` : 'GPS Verified'}
            </span>
            <button type="button" class="btn btn-outline select-from-dir-btn" data-stop-id="${stn.stop_id}" style="padding: 4px 10px; font-size: 0.78rem;">
              Set Departure →
            </button>
          </div>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".select-from-dir-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.stopId;
        const found = this.allStations.find(s => s.stop_id === id);
        if (found && this.onSelectStation) {
          this.onSelectStation(found);
        }
      });
    });
  }

  renderPagination() {
    const controls = this.container.querySelector("#directoryPagination");
    const totalPages = Math.ceil(this.filteredStations.length / this.pageSize);

    if (totalPages <= 1) {
      controls.innerHTML = "";
      return;
    }

    let buttons = [];

    // Prev
    buttons.push(`
      <button class="pagination-btn" data-page="${this.currentPage - 1}" ${this.currentPage === 1 ? 'disabled' : ''}>
        ← Prev
      </button>
    `);

    // Page numbers with ellipsis
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let p = startPage; p <= endPage; p++) {
      buttons.push(`
        <button class="pagination-btn ${p === this.currentPage ? 'active' : ''}" data-page="${p}">
          ${p}
        </button>
      `);
    }

    // Next
    buttons.push(`
      <button class="pagination-btn" data-page="${this.currentPage + 1}" ${this.currentPage === totalPages ? 'disabled' : ''}>
        Next →
      </button>
    `);

    controls.innerHTML = buttons.join("");

    controls.querySelectorAll(".pagination-btn").forEach(b => {
      b.addEventListener("click", () => {
        const page = parseInt(b.dataset.page, 10);
        if (page >= 1 && page <= totalPages && page !== this.currentPage) {
          this.currentPage = page;
          this.renderCards();
          this.renderPagination();
          this.container.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }
}
