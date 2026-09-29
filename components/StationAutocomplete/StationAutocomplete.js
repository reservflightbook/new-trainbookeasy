/**
 * Station Autocomplete Component
 * 
 * Provides an accessible, responsive, keyboard-navigable autocomplete input
 * powered by the local Amtrak GTFS dataset.
 */

import { searchStations } from "../../services/stationSearch.js";
import { trackEvent } from "../../utils/analytics.js";

export class StationAutocomplete {
  /**
   * @param {Object} options
   * @param {HTMLElement} options.inputEl - The input element
   * @param {HTMLElement} options.dropdownEl - Container for suggestions list
   * @param {HTMLElement} options.errorEl - Container for validation errors
   * @param {string} options.type - 'from' | 'to'
   * @param {Function} options.onSelect - Callback when station is selected
   * @param {Function} options.getOppositeStation - Returns current opposite station object to validate FROM != TO
   */
  constructor(options) {
    this.input = options.inputEl;
    this.dropdown = options.dropdownEl;
    this.errorEl = options.errorEl;
    this.type = options.type;
    this.onSelect = options.onSelect;
    this.getOppositeStation = options.getOppositeStation;

    this.selectedStation = null;
    this.highlightedIndex = -1;
    this.currentSuggestions = [];

    this.init();
  }

  init() {
    this.input.setAttribute("autocomplete", "off");
    this.input.setAttribute("aria-autocomplete", "list");
    this.input.setAttribute("role", "combobox");
    this.input.setAttribute("aria-expanded", "false");

    // Input typing event
    this.input.addEventListener("input", (e) => {
      this.handleInput(e.target.value);
    });

    // Focus event
    this.input.addEventListener("focus", () => {
      trackEvent(`${this.type}_station_started`);
      if (this.input.value.trim().length > 0) {
        this.handleInput(this.input.value);
      }
    });

    // Keyboard navigation
    this.input.addEventListener("keydown", (e) => {
      this.handleKeyDown(e);
    });

    // Outside click closes dropdown
    document.addEventListener("click", (e) => {
      if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  handleInput(query) {
    this.clearError();
    const clean = query.trim();

    if (clean.length === 0) {
      this.selectedStation = null;
      this.closeDropdown();
      if (this.onSelect) this.onSelect(null);
      return;
    }

    const results = searchStations(clean, 8);
    this.currentSuggestions = results;
    this.highlightedIndex = -1;

    if (results.length === 0) {
      this.dropdown.innerHTML = `
        <div style="padding: 12px 16px; font-size: 0.85rem; color: var(--text-muted);">
          No matching station found. Try searching by city name (e.g. Washington, Boston, New York) or state code.
        </div>
      `;
      this.openDropdown();
      return;
    }

    this.renderSuggestions(results);
    this.openDropdown();
  }

  renderSuggestions(stations) {
    this.dropdown.innerHTML = "";

    stations.forEach((stn, index) => {
      const item = document.createElement("div");
      item.className = "autocomplete-item";
      item.setAttribute("role", "option");
      item.setAttribute("id", `${this.type}-sugg-${stn.stop_id}`);
      
      const locText = [stn.city, stn.state].filter(Boolean).join(", ");

      item.innerHTML = `
        <div>
          <div class="autocomplete-station-name">${stn.stop_name}</div>
          <div class="autocomplete-station-location">${locText || 'Amtrak Rail Station'}</div>
        </div>
        <span class="station-code-pill">${stn.stop_id}</span>
      `;

      item.addEventListener("mousedown", (e) => {
        e.preventDefault(); // Prevent blur before click
        this.selectStation(stn);
      });

      this.dropdown.appendChild(item);
    });
  }

  handleKeyDown(e) {
    if (!this.dropdown.classList.contains("open") || this.currentSuggestions.length === 0) {
      return;
    }

    const items = this.dropdown.querySelectorAll(".autocomplete-item");

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.highlightedIndex = (this.highlightedIndex + 1) % items.length;
      this.updateHighlight(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.highlightedIndex = (this.highlightedIndex - 1 + items.length) % items.length;
      this.updateHighlight(items);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (this.highlightedIndex >= 0 && this.highlightedIndex < this.currentSuggestions.length) {
        this.selectStation(this.currentSuggestions[this.highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      this.closeDropdown();
    }
  }

  updateHighlight(items) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === this.highlightedIndex);
      if (idx === this.highlightedIndex) {
        item.scrollIntoView({ block: "nearest" });
      }
    });
  }

  selectStation(station) {
    // Validate FROM != TO
    const opposite = this.getOppositeStation ? this.getOppositeStation() : null;

    if (opposite && opposite.stop_id === station.stop_id) {
      this.showError("Please select a different departure and destination station.");
      return;
    }

    this.selectedStation = station;
    const locText = [station.city, station.state].filter(Boolean).join(", ");
    this.input.value = `${station.stop_name} (${station.stop_id})`;

    this.clearError();
    this.closeDropdown();

    trackEvent(`${this.type}_station_selected`, {
      stop_id: station.stop_id,
      station_name: station.stop_name,
      city: station.city,
      state: station.state
    });

    if (this.onSelect) {
      this.onSelect(station);
    }
  }

  setStation(station) {
    if (!station) {
      this.selectedStation = null;
      this.input.value = "";
      return;
    }
    this.selectedStation = station;
    this.input.value = `${station.stop_name} (${station.stop_id})`;
    this.clearError();
    if (this.onSelect) {
      this.onSelect(station);
    }
  }

  showError(msg) {
    if (this.errorEl) {
      this.errorEl.textContent = msg;
      this.errorEl.classList.add("visible");
    }
  }

  clearError() {
    if (this.errorEl) {
      this.errorEl.textContent = "";
      this.errorEl.classList.remove("visible");
    }
  }

  openDropdown() {
    this.dropdown.classList.add("open");
    this.input.setAttribute("aria-expanded", "true");
  }

  closeDropdown() {
    this.dropdown.classList.remove("open");
    this.input.setAttribute("aria-expanded", "false");
    this.highlightedIndex = -1;
  }

  getSelectedStation() {
    return this.selectedStation;
  }
}
