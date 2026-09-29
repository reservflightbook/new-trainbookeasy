/**
 * Train Search Form Component
 * 
 * Primary booking assistance search widget:
 * - Station autocomplete for FROM and TO inputs
 * - Date picker preventing past dates
 * - Passenger count selector
 * - Inline validation (Never aggressive popups)
 * - Secondary Call Now conversion CTA
 */

import { StationAutocomplete } from "../StationAutocomplete/StationAutocomplete.js";
import { renderPassengerSelector, initPassengerSelector } from "../PassengerSelector/PassengerSelector.js";
import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion, trackEvent } from "../../utils/analytics.js";
import { getStationById } from "../../services/stationSearch.js";

export class TrainSearchForm {
  /**
   * @param {HTMLElement} containerEl
   * @param {Function} onSearchSubmit - Callback ({ originStation, destinationStation, departureDate, passengers })
   */
  constructor(containerEl, onSearchSubmit) {
    this.container = containerEl;
    this.onSearchSubmit = onSearchSubmit;

    this.originStation = null;
    this.destinationStation = null;
    this.departureDate = "";
    this.passengers = 1;

    this.fromAutocomplete = null;
    this.toAutocomplete = null;

    this.init();
  }

  init() {
    this.render();
    this.setupDateDefaults();
    this.initAutocompletes();
    this.initEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="search-card-container" id="trainSearchCard">
        <!-- Professional Search Card Header -->
        <div class="search-card-header">
          <div class="search-header-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
              <rect x="4" y="3" width="16" height="16" rx="2"></rect>
              <path d="M4 11h16"></path>
              <path d="M12 3v8"></path>
              <path d="m8 19-2 3"></path>
              <path d="m16 19 2 3"></path>
            </svg>
            <span>Train Travel Information & Booking Assistance</span>
          </div>
          <h2 class="search-card-title">Book Your Train Journey</h2>
          <p class="search-card-subtitle">Search real-time stations, travel routes, schedules & get dedicated live phone support</p>
        </div>

        <form id="mainSearchForm" class="search-form-grid" novalidate onsubmit="event.preventDefault();">
          <!-- FROM Station Field -->
          <div class="form-field-group">
            <label for="fromStationInput" class="field-label">From</label>
            <div class="field-input-box">
              <div class="field-prefix-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3"></path>
                </svg>
              </div>
              <input type="text" id="fromStationInput" placeholder="Departure station or city" aria-label="Departure station or city" required autocomplete="off">
            </div>
            <div class="autocomplete-dropdown" id="fromStationDropdown"></div>
            <div class="validation-error-msg" id="fromErrorMsg">Please select a departure station</div>
          </div>

          <!-- TO Station Field -->
          <div class="form-field-group">
            <label for="toStationInput" class="field-label">To</label>
            <div class="field-input-box">
              <div class="field-prefix-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <input type="text" id="toStationInput" placeholder="Destination station or city" aria-label="Destination station or city" required autocomplete="off">
            </div>
            <div class="autocomplete-dropdown" id="toStationDropdown"></div>
            <div class="validation-error-msg" id="toErrorMsg">Please select a destination station</div>
          </div>

          <!-- DEPARTURE Date Field -->
          <div class="form-field-group">
            <label for="departDateInput" class="field-label">Departure Date</label>
            <div class="field-input-box">
              <div class="field-prefix-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <input type="date" id="departDateInput" aria-label="Departure travel date" required>
            </div>
            <div class="validation-error-msg" id="dateErrorMsg">Please select a future travel date</div>
          </div>

          <!-- PASSENGERS Selector Field -->
          ${renderPassengerSelector(1)}

          <!-- Primary Submit Button -->
          <button type="submit" id="searchSubmitBtn" class="btn btn-primary btn-search-submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search Trains</span>
          </button>
        </form>

        <!-- Secondary Assistance Bar -->
        <div class="search-assistance-bar">
          <div class="assistance-info-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Need assistance with station connections, timetables or group tickets?</span>
          </div>
          <div class="assistance-cta-wrap">
            <span class="assistance-agent-tag">Live Agent Available:</span>
            <a href="${SITE_CONFIG.PHONE_HREF}" class="assistance-call-link" id="formAssistanceCallBtn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>Call Now: ${SITE_CONFIG.PHONE_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  setupDateDefaults() {
    const dateInput = this.container.querySelector("#departDateInput");
    if (!dateInput) return;

    // Prevent past dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const pad = (n) => String(n).padStart(2, '0');
    const minStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    const defaultStr = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;

    dateInput.min = minStr;
    dateInput.value = defaultStr;
    this.departureDate = defaultStr;

    dateInput.addEventListener("change", (e) => {
      this.departureDate = e.target.value;
      this.clearDateError();
      trackEvent("date_selected", { date: this.departureDate });
    });
  }

  initAutocompletes() {
    const fromInput = this.container.querySelector("#fromStationInput");
    const fromDropdown = this.container.querySelector("#fromStationDropdown");
    const fromError = this.container.querySelector("#fromErrorMsg");

    const toInput = this.container.querySelector("#toStationInput");
    const toDropdown = this.container.querySelector("#toStationDropdown");
    const toError = this.container.querySelector("#toErrorMsg");

    this.fromAutocomplete = new StationAutocomplete({
      inputEl: fromInput,
      dropdownEl: fromDropdown,
      errorEl: fromError,
      type: "from",
      onSelect: (stn) => {
        this.originStation = stn;
      },
      getOppositeStation: () => this.destinationStation
    });

    this.toAutocomplete = new StationAutocomplete({
      inputEl: toInput,
      dropdownEl: toDropdown,
      errorEl: toError,
      type: "to",
      onSelect: (stn) => {
        this.destinationStation = stn;
      },
      getOppositeStation: () => this.originStation
    });

    initPassengerSelector((count) => {
      this.passengers = count;
    });
  }

  initEventListeners() {
    const form = this.container.querySelector("#mainSearchForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    const callBtn = this.container.querySelector("#formAssistanceCallBtn");
    if (callBtn) {
      callBtn.addEventListener("click", () => {
        trackConversion("call_now", { location: "search_form_secondary" });
      });
    }

    trackEvent("search_form_viewed");
  }

  setRoute(fromStationId, toStationId) {
    const fromStn = getStationById(fromStationId);
    const toStn = getStationById(toStationId);

    if (fromStn && this.fromAutocomplete) {
      this.fromAutocomplete.setStation(fromStn);
      this.originStation = fromStn;
    }
    if (toStn && this.toAutocomplete) {
      this.toAutocomplete.setStation(toStn);
      this.destinationStation = toStn;
    }

    this.container.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  validate() {
    let isValid = true;

    // Validate Origin
    if (!this.originStation) {
      this.fromAutocomplete.showError("Please enter and select a departure station from the list");
      isValid = false;
    } else {
      this.fromAutocomplete.clearError();
    }

    // Validate Destination
    if (!this.destinationStation) {
      this.toAutocomplete.showError("Please enter and select a destination station from the list");
      isValid = false;
    } else {
      this.toAutocomplete.clearError();
    }

    // Validate FROM != TO
    if (this.originStation && this.destinationStation && this.originStation.stop_id === this.destinationStation.stop_id) {
      this.toAutocomplete.showError("Please select a different departure and destination station.");
      isValid = false;
    }

    // Validate Date
    const dateInput = this.container.querySelector("#departDateInput");
    const dateVal = dateInput.value;
    if (!dateVal) {
      this.showDateError("Please select your travel date");
      isValid = false;
    } else {
      const selected = new Date(dateVal);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        this.showDateError("Travel date cannot be in the past");
        isValid = false;
      } else {
        this.clearDateError();
      }
    }

    return isValid;
  }

  showDateError(msg) {
    const err = this.container.querySelector("#dateErrorMsg");
    if (err) {
      err.textContent = msg;
      err.classList.add("visible");
    }
  }

  clearDateError() {
    const err = this.container.querySelector("#dateErrorMsg");
    if (err) {
      err.textContent = "";
      err.classList.remove("visible");
    }
  }

  handleSubmit() {
    if (!this.validate()) return;

    trackConversion("search_submitted", {
      origin_id: this.originStation.stop_id,
      dest_id: this.destinationStation.stop_id,
      date: this.departureDate,
      passengers: this.passengers
    });

    if (this.onSearchSubmit) {
      this.onSearchSubmit({
        originStation: this.originStation,
        destinationStation: this.destinationStation,
        departureDate: this.departureDate,
        passengers: this.passengers
      });
    }
  }
}
