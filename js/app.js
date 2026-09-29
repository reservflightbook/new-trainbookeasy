// TrainBookEasy - High-Performance Interactive Application Engine

document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    theme: localStorage.getItem("tbe_theme") || "dark",
    currency: localStorage.getItem("tbe_currency") || "USD",
    currencyRates: { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.5 },
    currencySymbols: { USD: "$", EUR: "€", GBP: "£", INR: "₹" },
    activeTab: "book", // 'book', 'pnr', 'live', 'bookings'
    tripType: "one-way",
    quota: "General",
    searchQuery: {
      from: { code: "BOS", name: "Boston South", city: "Boston" },
      to: { code: "NYP", name: "New York Penn", city: "New York" },
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      passengersCount: 1,
      travelClass: "ALL"
    },
    filters: {
      timeSlot: "all", // 'morning', 'afternoon', 'evening', 'night'
      trainTypes: [],
      maxPrice: 250,
      availableOnly: false,
      sortBy: "fastest"
    },
    selectedTrain: null,
    selectedClass: null,
    selectedSeats: [],
    passengers: [{ name: "Alexander Wright", age: 32, gender: "Male", berth: "Window" }],
    selectedMeals: [],
    insuranceSelected: true,
    carbonOffset: false,
    appliedPromo: null,
    promoDiscount: 0,
    bookings: JSON.parse(localStorage.getItem("tbe_bookings")) || TRAIN_DATA.defaultBookings,
    activeLiveTrainId: "TR-101"
  };

  // DOM Elements Cache
  const els = {
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    currencySelect: document.getElementById("currencySelect"),
    navLinks: document.querySelectorAll(".nav-link"),
    tabPanels: document.querySelectorAll(".tab-content-panel"),
    originInput: document.getElementById("originInput"),
    destInput: document.getElementById("destInput"),
    originCode: document.getElementById("originCode"),
    destCode: document.getElementById("destCode"),
    originSub: document.getElementById("originSub"),
    destSub: document.getElementById("destSub"),
    originDropdown: document.getElementById("originDropdown"),
    destDropdown: document.getElementById("destDropdown"),
    swapBtn: document.getElementById("swapStationsBtn"),
    departDateInput: document.getElementById("departDateInput"),
    returnDateInput: document.getElementById("returnDateInput"),
    passengersSelect: document.getElementById("passengersSelect"),
    classFilterSelect: document.getElementById("classFilterSelect"),
    searchTrainsBtn: document.getElementById("searchTrainsBtn"),
    tripTypeBtns: document.querySelectorAll(".trip-btn"),
    quotaChips: document.querySelectorAll(".quota-chip"),
    returnDateBox: document.getElementById("returnDateBox"),
    // Results
    trainsListContainer: document.getElementById("trainsListContainer"),
    resultsRouteTitle: document.getElementById("resultsRouteTitle"),
    resultsDateSummary: document.getElementById("resultsDateSummary"),
    calendarRibbon: document.getElementById("calendarRibbon"),
    timeSlotBtns: document.querySelectorAll(".time-slot-btn"),
    typeCheckboxes: document.querySelectorAll(".train-type-checkbox"),
    priceRangeSlider: document.getElementById("priceRangeSlider"),
    priceValueLabel: document.getElementById("priceValueLabel"),
    availOnlyCheckbox: document.getElementById("availOnlyCheckbox"),
    sortSelect: document.getElementById("sortSelect"),
    resetFiltersBtn: document.getElementById("resetFiltersBtn"),
    // Seat Modal
    seatModal: document.getElementById("seatModal"),
    closeSeatModal: document.getElementById("closeSeatModal"),
    coachTabs: document.getElementById("coachTabs"),
    seatsGrid: document.getElementById("seatsGrid"),
    selectedSeatsList: document.getElementById("selectedSeatsList"),
    seatTotalPrice: document.getElementById("seatTotalPrice"),
    proceedToPassengerBtn: document.getElementById("proceedToPassengerBtn"),
    // Passenger Modal
    passengerModal: document.getElementById("passengerModal"),
    closePassengerModal: document.getElementById("closePassengerModal"),
    passengersFormsList: document.getElementById("passengersFormsList"),
    addPassengerBtn: document.getElementById("addPassengerBtn"),
    mealsGrid: document.getElementById("mealsGrid"),
    insuranceCheckbox: document.getElementById("insuranceCheckbox"),
    carbonCheckbox: document.getElementById("carbonCheckbox"),
    promoInput: document.getElementById("promoInput"),
    applyPromoBtn: document.getElementById("applyPromoBtn"),
    promoMessage: document.getElementById("promoMessage"),
    breakdownBaseFare: document.getElementById("breakdownBaseFare"),
    breakdownMeals: document.getElementById("breakdownMeals"),
    breakdownAddons: document.getElementById("breakdownAddons"),
    breakdownDiscountRow: document.getElementById("breakdownDiscountRow"),
    breakdownDiscount: document.getElementById("breakdownDiscount"),
    breakdownTotal: document.getElementById("breakdownTotal"),
    confirmBookingBtn: document.getElementById("confirmBookingBtn"),
    // Ticket Modal
    ticketModal: document.getElementById("ticketModal"),
    closeTicketModal: document.getElementById("closeTicketModal"),
    ticketCardContent: document.getElementById("ticketCardContent"),
    printTicketBtn: document.getElementById("printTicketBtn"),
    downloadTicketBtn: document.getElementById("downloadTicketBtn"),
    // PNR Checker
    pnrSearchInput: document.getElementById("pnrSearchInput"),
    searchPnrBtn: document.getElementById("searchPnrBtn"),
    pnrResultCard: document.getElementById("pnrResultCard"),
    samplePnrChips: document.querySelectorAll(".sample-pnr-chip"),
    // Live Tracker
    liveTrainSelect: document.getElementById("liveTrainSelect"),
    liveTrainDisplay: document.getElementById("liveTrainDisplay"),
    // My Bookings
    bookingsListGrid: document.getElementById("bookingsListGrid"),
    bookingsBadge: document.getElementById("bookingsBadge"),
    // Toast
    toastContainer: document.getElementById("toastContainer")
  };

  // Initialize
  function init() {
    applyTheme(state.theme);
    setupDatePickers();
    setupStationInputs();
    setupEventListeners();
    renderCalendarRibbon();
    renderTrainResults();
    renderMyBookings();
    renderLiveTrainStatus(state.activeLiveTrainId);
    updateBookingsBadge();
  }

  // Formatting & Currency Helper
  function formatMoney(amountInUSD) {
    const rate = state.currencyRates[state.currency] || 1;
    const sym = state.currencySymbols[state.currency] || "$";
    const converted = (amountInUSD * rate).toFixed(0);
    return `${sym}${converted}`;
  }

  // Toast Notification System
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "✓" : "ℹ";
    toast.innerHTML = `<span class="toast-icon" style="font-weight:bold; font-size:1.1rem;">${icon}</span> <span>${message}</span>`;
    els.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Theme Management
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    state.theme = theme;
    localStorage.setItem("tbe_theme", theme);
    if (els.themeToggleBtn) {
      els.themeToggleBtn.innerHTML = theme === "dark" 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // Date Defaults
  function setupDatePickers() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (d) => d.toISOString().split("T")[0];
    els.departDateInput.min = formatDate(today);
    els.departDateInput.value = formatDate(tomorrow);
    els.returnDateInput.min = formatDate(tomorrow);
    
    const returnDay = new Date(tomorrow);
    returnDay.setDate(returnDay.getDate() + 3);
    els.returnDateInput.value = formatDate(returnDay);
    
    state.searchQuery.date = els.departDateInput.value;
  }

  // Station Inputs & Dropdowns
  function setupStationInputs() {
    function populateSuggestions(dropdown, targetInput, isOrigin) {
      dropdown.innerHTML = "";
      TRAIN_DATA.stations.forEach(stn => {
        const item = document.createElement("div");
        item.className = "suggestion-item";
        item.innerHTML = `
          <div>
            <div class="sugg-name">${stn.name}</div>
            <div class="sugg-desc">${stn.city}, ${stn.state}</div>
          </div>
          <span class="station-code-badge">${stn.code}</span>
        `;
        item.addEventListener("click", () => {
          if (isOrigin) {
            state.searchQuery.from = { code: stn.code, name: stn.name, city: stn.city };
            els.originInput.value = stn.city;
            els.originCode.textContent = stn.code;
            els.originSub.textContent = stn.name;
          } else {
            state.searchQuery.to = { code: stn.code, name: stn.name, city: stn.city };
            els.destInput.value = stn.city;
            els.destCode.textContent = stn.code;
            els.destSub.textContent = stn.name;
          }
          dropdown.classList.remove("open");
        });
        dropdown.appendChild(item);
      });
    }

    populateSuggestions(els.originDropdown, els.originInput, true);
    populateSuggestions(els.destDropdown, els.destInput, false);

    els.originInput.addEventListener("focus", () => els.originDropdown.classList.add("open"));
    els.destInput.addEventListener("focus", () => els.destDropdown.classList.add("open"));

    document.addEventListener("click", (e) => {
      if (!els.originInput.contains(e.target) && !els.originDropdown.contains(e.target)) {
        els.originDropdown.classList.remove("open");
      }
      if (!els.destInput.contains(e.target) && !els.destDropdown.contains(e.target)) {
        els.destDropdown.classList.remove("open");
      }
    });

    // Station Swap
    els.swapBtn.addEventListener("click", () => {
      const temp = { ...state.searchQuery.from };
      state.searchQuery.from = { ...state.searchQuery.to };
      state.searchQuery.to = temp;

      els.originInput.value = state.searchQuery.from.city;
      els.originCode.textContent = state.searchQuery.from.code;
      els.originSub.textContent = state.searchQuery.from.name;

      els.destInput.value = state.searchQuery.to.city;
      els.destCode.textContent = state.searchQuery.to.code;
      els.destSub.textContent = state.searchQuery.to.name;

      showToast(`Swapped origin & destination`);
    });
  }

  // 7-Day Date Ribbon
  function renderCalendarRibbon() {
    els.calendarRibbon.innerHTML = "";
    const baseDate = new Date(els.departDateInput.value || Date.now());
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = -1; i <= 5; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      const isSelected = i === 0;

      const card = document.createElement("div");
      card.className = `cal-day-card ${isSelected ? "active" : ""}`;
      const dayName = days[d.getDay()];
      const dateNum = d.getDate();
      const monthName = months[d.getMonth()];
      const sampleFare = 35 + ((dateNum * 7) % 25);

      card.innerHTML = `
        <div class="cal-day-label">${dayName}, ${monthName}</div>
        <div class="cal-date-num">${dateNum}</div>
        <div class="cal-fare-tag">From ${formatMoney(sampleFare)}</div>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".cal-day-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        els.departDateInput.value = d.toISOString().split("T")[0];
        state.searchQuery.date = els.departDateInput.value;
        renderTrainResults();
      });

      els.calendarRibbon.appendChild(card);
    }
  }

  // Filter & Sort Logic
  function getFilteredTrains() {
    let list = [...TRAIN_DATA.trains];

    // Filter by Time slot
    if (state.filters.timeSlot !== "all") {
      list = list.filter(train => {
        const hour = parseInt(train.schedule.depTime.split(":")[0], 10);
        if (state.filters.timeSlot === "morning") return hour >= 6 && hour < 12;
        if (state.filters.timeSlot === "afternoon") return hour >= 12 && hour < 18;
        if (state.filters.timeSlot === "evening") return hour >= 18 && hour < 24;
        if (state.filters.timeSlot === "night") return hour >= 0 && hour < 6;
        return true;
      });
    }

    // Filter by Train Type
    if (state.filters.trainTypes.length > 0) {
      list = list.filter(train => state.filters.trainTypes.includes(train.type));
    }

    // Filter by Max Price
    list = list.filter(train => {
      const minClassPrice = Math.min(...Object.values(train.classes).map(c => c.price));
      return minClassPrice <= state.filters.maxPrice;
    });

    // Filter by Available Seats
    if (state.filters.availableOnly) {
      list = list.filter(train => {
        return Object.values(train.classes).some(c => c.available > 0);
      });
    }

    // Sort
    if (state.filters.sortBy === "fastest") {
      list.sort((a, b) => parseInt(a.schedule.duration) - parseInt(b.schedule.duration));
    } else if (state.filters.sortBy === "earliest") {
      list.sort((a, b) => a.schedule.depTime.localeCompare(b.schedule.depTime));
    } else if (state.filters.sortBy === "price-low") {
      list.sort((a, b) => {
        const minA = Math.min(...Object.values(a.classes).map(c => c.price));
        const minB = Math.min(...Object.values(b.classes).map(c => c.price));
        return minA - minB;
      });
    } else if (state.filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }

  // Render Train Results
  function renderTrainResults() {
    const filtered = getFilteredTrains();
    els.resultsRouteTitle.textContent = `${state.searchQuery.from.city} (${state.searchQuery.from.code}) ➔ ${state.searchQuery.to.city} (${state.searchQuery.to.code})`;
    els.resultsDateSummary.textContent = `${filtered.length} trains available • Date: ${state.searchQuery.date} • Quota: ${state.quota}`;

    if (filtered.length === 0) {
      els.trainsListContainer.innerHTML = `
        <div style="text-align:center; padding: 48px 24px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color);">
          <div style="font-size: 2.5rem; margin-bottom:12px;">🚆🔍</div>
          <h3>No Trains Matching Your Filters</h3>
          <p style="color:var(--text-muted); margin: 8px 0 20px;">Try adjusting your price range, departure time, or train category.</p>
          <button id="emptyResetBtn" class="btn-bookings-pill" style="margin:0 auto;">Reset All Filters</button>
        </div>
      `;
      const emptyReset = document.getElementById("emptyResetBtn");
      if (emptyReset) emptyReset.addEventListener("click", resetFilters);
      return;
    }

    els.trainsListContainer.innerHTML = "";

    filtered.forEach(train => {
      const card = document.createElement("div");
      card.className = "train-card";

      // Class Fares markup
      const classesHtml = Object.entries(train.classes).map(([code, c]) => {
        const isSelected = state.selectedTrain?.id === train.id && state.selectedClass === code;
        return `
          <div class="class-card-box ${isSelected ? "selected" : ""}" data-train-id="${train.id}" data-class-code="${code}">
            <div class="class-code-tag">
              <span>${code}</span>
              <span style="font-size:0.75rem; color:var(--text-dim);">${c.name.split(" ")[0]}</span>
            </div>
            <div class="class-fare-price">${formatMoney(c.price)}</div>
            <div class="class-seats-status ${c.available < 10 ? 'few' : ''}">
              ${c.available > 0 ? `AVL ${c.available}` : 'WL 12'}
            </div>
            <div class="class-features-hint">${c.features}</div>
          </div>
        `;
      }).join("");

      // Intermediate schedule rows
      const timetableRows = train.schedule.stops.map(stop => `
        <tr>
          <td><strong>${stop.station}</strong></td>
          <td>${stop.arr}</td>
          <td>${stop.dep}</td>
          <td>Platform ${stop.platform}</td>
          <td>${stop.dist}</td>
          <td class="${stop.status.includes('Delay') ? 'status-badge-delay' : 'status-badge-ontime'}">${stop.status}</td>
        </tr>
      `).join("");

      card.innerHTML = `
        <div class="train-card-header">
          <div class="train-identity">
            <span class="train-name">${train.name} <span class="train-number-tag">#${train.number}</span></span>
            <span class="train-type-badge">${train.type}</span>
            <span class="train-badge-highlight">${train.badge}</span>
          </div>
          <div class="train-runs-on">
            <span style="margin-right:6px; color:var(--text-dim);">Runs:</span>
            ${["M", "T", "W", "T", "F", "S", "S"].map(d => `<span class="run-day active">${d}</span>`).join("")}
          </div>
        </div>

        <div class="train-timeline-row">
          <div class="station-time-block">
            <div class="station-time-huge">${train.schedule.depTime}</div>
            <div class="station-code-huge">${train.schedule.departureStation}</div>
            <div class="station-name-sub">${state.searchQuery.from.name}</div>
          </div>

          <div class="journey-track-graphic">
            <div class="duration-tag">${train.schedule.duration}</div>
            <div class="track-line-wrapper">
              <div class="track-line"></div>
              <div class="track-bullet-train-icon">⚡</div>
            </div>
            <div class="stops-counter-badge">${train.schedule.stops.length - 2} Intermediate Stops • Non-Stop Maglev</div>
          </div>

          <div class="station-time-block dest">
            <div class="station-time-huge">${train.schedule.arrTime}</div>
            <div class="station-code-huge">${train.schedule.arrivalStation}</div>
            <div class="station-name-sub">${state.searchQuery.to.name}</div>
          </div>
        </div>

        <div class="classes-selection-strip">
          ${classesHtml}
        </div>

        <div class="train-card-footer">
          <div class="amenities-icons-list">
            ${train.amenities.map(a => `<span class="amenity-chip">✓ ${a}</span>`).join("")}
          </div>
          <div class="card-actions-group">
            <button class="btn-secondary-link toggle-route-btn" data-train-id="${train.id}">
              Route & Timetable ▾
            </button>
            <button class="btn-book-train select-seats-btn" data-train-id="${train.id}">
              Select Coach & Seats →
            </button>
          </div>
        </div>

        <div class="route-drawer-content" id="route-drawer-${train.id}">
          <table class="timetable-table">
            <thead>
              <tr>
                <th>Station</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Platform</th>
                <th>Distance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${timetableRows}
            </tbody>
          </table>
        </div>
      `;

      // Event handlers for class selection
      card.querySelectorAll(".class-card-box").forEach(box => {
        box.addEventListener("click", () => {
          const tId = box.dataset.trainId;
          const cCode = box.dataset.classCode;
          state.selectedTrain = TRAIN_DATA.trains.find(t => t.id === tId);
          state.selectedClass = cCode;
          card.querySelectorAll(".class-card-box").forEach(b => b.classList.remove("selected"));
          box.classList.add("selected");
          showToast(`Selected ${cCode} on ${state.selectedTrain.name}`);
        });
      });

      // Toggle Route Accordion
      const toggleBtn = card.querySelector(".toggle-route-btn");
      const drawer = card.querySelector(`#route-drawer-${train.id}`);
      toggleBtn.addEventListener("click", () => {
        const isOpen = drawer.classList.contains("open");
        drawer.classList.toggle("open", !isOpen);
        toggleBtn.textContent = isOpen ? "Route & Timetable ▾" : "Hide Timetable ▴";
      });

      // Book Train / Seat Selector
      const bookBtn = card.querySelector(".select-seats-btn");
      bookBtn.addEventListener("click", () => {
        state.selectedTrain = train;
        if (!state.selectedClass) {
          state.selectedClass = Object.keys(train.classes)[0];
        }
        openSeatSelectionModal();
      });

      els.trainsListContainer.appendChild(card);
    });
  }

  // Interactive Coach & Seat Map
  function openSeatSelectionModal() {
    if (!state.selectedTrain) return;
    state.selectedSeats = [];
    renderCoachSeats("A1");
    els.seatModal.classList.add("open");
  }

  function renderCoachSeats(coachCode) {
    els.seatsGrid.innerHTML = "";
    const seatRows = 12;
    const occupiedSeats = ["3A", "3B", "7C", "8A", "8B", "10D", "11A"];

    // Render seats
    for (let r = 1; r <= seatRows; r++) {
      ['A', 'B', 'C', 'D'].forEach(col => {
        const seatNum = `${r}${col}`;
        const isOccupied = occupiedSeats.includes(seatNum);
        const isSelected = state.selectedSeats.includes(seatNum);
        const isWindow = col === 'A' || col === 'D';

        const cell = document.createElement("div");
        cell.className = `seat-cell ${isOccupied ? "booked" : ""} ${isSelected ? "selected" : ""} ${isWindow ? "is-window" : ""}`;
        cell.dataset.seat = seatNum;
        cell.innerHTML = `<span>${seatNum}</span>`;

        if (!isOccupied) {
          cell.addEventListener("click", () => {
            const index = state.selectedSeats.indexOf(seatNum);
            const maxAllowed = parseInt(state.searchQuery.passengersCount, 10);

            if (index > -1) {
              state.selectedSeats.splice(index, 1);
              cell.classList.remove("selected");
            } else {
              if (state.selectedSeats.length >= maxAllowed) {
                showToast(`You have selected ${maxAllowed} passenger(s). Remove a seat first.`, "info");
                return;
              }
              state.selectedSeats.push(seatNum);
              cell.classList.add("selected");
            }
            updateSeatSummary();
          });
        }

        els.seatsGrid.appendChild(cell);
      });
    }

    updateSeatSummary();
  }

  function updateSeatSummary() {
    els.selectedSeatsList.innerHTML = "";
    if (state.selectedSeats.length === 0) {
      els.selectedSeatsList.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">No seats selected yet. Click on available green/neutral seats above.</span>`;
    } else {
      state.selectedSeats.forEach(s => {
        const tag = document.createElement("span");
        tag.className = "seat-tag";
        tag.textContent = `Coach A1 - ${s}`;
        els.selectedSeatsList.appendChild(tag);
      });
    }

    const classPrice = state.selectedTrain.classes[state.selectedClass]?.price || 50;
    const total = classPrice * Math.max(1, state.selectedSeats.length);
    els.seatTotalPrice.textContent = formatMoney(total);
  }

  // Passenger Details & Add-ons Checkout Flow
  function openPassengerModal() {
    els.seatModal.classList.remove("open");
    renderPassengerForms();
    renderMeals();
    updateCheckoutBreakdown();
    els.passengerModal.classList.add("open");
  }

  function renderPassengerForms() {
    els.passengersFormsList.innerHTML = "";
    const count = Math.max(state.selectedSeats.length, parseInt(state.searchQuery.passengersCount, 10));

    // Ensure passengers array matches count
    while (state.passengers.length < count) {
      state.passengers.push({ name: "", age: 30, gender: "Male", berth: "Window" });
    }
    if (state.passengers.length > count) {
      state.passengers = state.passengers.slice(0, count);
    }

    state.passengers.forEach((p, idx) => {
      const assignedSeat = state.selectedSeats[idx] ? `Seat: Coach A1 - ${state.selectedSeats[idx]}` : `Auto-assigned Seat`;
      const card = document.createElement("div");
      card.className = "passenger-card";
      card.innerHTML = `
        <div class="passenger-header">
          <span class="passenger-title">👤 Passenger ${idx + 1} <span style="font-size:0.8rem; color:var(--primary-light); font-weight:600;">(${assignedSeat})</span></span>
          ${idx > 0 ? `<button class="btn-remove-pax" data-idx="${idx}" style="color:var(--accent-rose); font-size:0.8rem;">Remove ✕</button>` : ''}
        </div>
        <div class="passenger-grid">
          <div>
            <label class="field-label">Full Name</label>
            <input type="text" class="field-input-box pax-name" data-idx="${idx}" value="${p.name}" placeholder="e.g. Johnathan Doe" required />
          </div>
          <div>
            <label class="field-label">Age</label>
            <input type="number" min="1" max="110" class="field-input-box pax-age" data-idx="${idx}" value="${p.age}" />
          </div>
          <div>
            <label class="field-label">Gender</label>
            <select class="field-input-box pax-gender" data-idx="${idx}">
              <option value="Male" ${p.gender === 'Male' ? 'selected' : ''}>Male</option>
              <option value="Female" ${p.gender === 'Female' ? 'selected' : ''}>Female</option>
              <option value="Other" ${p.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
          <div>
            <label class="field-label">Berth Preference</label>
            <select class="field-input-box pax-berth" data-idx="${idx}">
              <option value="Window" ${p.berth === 'Window' ? 'selected' : ''}>Window</option>
              <option value="Aisle" ${p.berth === 'Aisle' ? 'selected' : ''}>Aisle</option>
              <option value="No Preference" ${p.berth === 'No Preference' ? 'selected' : ''}>No Preference</option>
            </select>
          </div>
        </div>
      `;

      // Form bindings
      card.querySelector(".pax-name").addEventListener("input", (e) => state.passengers[idx].name = e.target.value);
      card.querySelector(".pax-age").addEventListener("change", (e) => state.passengers[idx].age = e.target.value);
      card.querySelector(".pax-gender").addEventListener("change", (e) => state.passengers[idx].gender = e.target.value);
      card.querySelector(".pax-berth").addEventListener("change", (e) => state.passengers[idx].berth = e.target.value);

      const removeBtn = card.querySelector(".btn-remove-pax");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          state.passengers.splice(idx, 1);
          state.searchQuery.passengersCount = state.passengers.length;
          renderPassengerForms();
          updateCheckoutBreakdown();
        });
      }

      els.passengersFormsList.appendChild(card);
    });
  }

  function renderMeals() {
    els.mealsGrid.innerHTML = "";
    TRAIN_DATA.meals.forEach(m => {
      const isSelected = state.selectedMeals.includes(m.id);
      const card = document.createElement("div");
      card.className = `meal-option-card ${isSelected ? 'selected' : ''}`;
      card.dataset.mealId = m.id;
      card.innerHTML = `
        <div class="meal-top">
          <span class="meal-icon-big">${m.icon}</span>
          <div>
            <div class="meal-name">${m.name}</div>
            <div class="meal-desc">${m.desc}</div>
          </div>
        </div>
        <div class="meal-bottom">
          <span style="font-size:0.75rem; color:var(--accent-orange); font-weight:700;">${m.tag}</span>
          <span class="meal-price">+${formatMoney(m.price)}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        const idx = state.selectedMeals.indexOf(m.id);
        if (idx > -1) {
          state.selectedMeals.splice(idx, 1);
          card.classList.remove("selected");
        } else {
          state.selectedMeals.push(m.id);
          card.classList.add("selected");
        }
        updateCheckoutBreakdown();
      });

      els.mealsGrid.appendChild(card);
    });
  }

  function updateCheckoutBreakdown() {
    if (!state.selectedTrain) return;
    const baseClassPrice = state.selectedTrain.classes[state.selectedClass]?.price || 50;
    const paxCount = state.passengers.length;
    const baseFareTotal = baseClassPrice * paxCount;

    // Meals calculation
    let mealsTotal = 0;
    state.selectedMeals.forEach(mId => {
      const meal = TRAIN_DATA.meals.find(m => m.id === mId);
      if (meal) mealsTotal += meal.price;
    });

    // Addons
    let addonsTotal = 0;
    if (state.insuranceSelected) addonsTotal += (2.50 * paxCount);
    if (state.carbonOffset) addonsTotal += (1.00 * paxCount);

    let grossTotal = baseFareTotal + mealsTotal + addonsTotal;
    let discount = 0;

    if (state.appliedPromo) {
      if (state.appliedPromo.discountPercent) {
        discount = Math.min((grossTotal * state.appliedPromo.discountPercent) / 100, state.appliedPromo.maxDiscount || 50);
      } else if (state.appliedPromo.discountAmount) {
        discount = state.appliedPromo.discountAmount;
      }
    }

    const netTotal = Math.max(10, grossTotal - discount);

    els.breakdownBaseFare.textContent = formatMoney(baseFareTotal);
    els.breakdownMeals.textContent = formatMoney(mealsTotal);
    els.breakdownAddons.textContent = formatMoney(addonsTotal);

    if (discount > 0) {
      els.breakdownDiscountRow.style.display = "table-row";
      els.breakdownDiscount.textContent = `-${formatMoney(discount)}`;
    } else {
      els.breakdownDiscountRow.style.display = "none";
    }

    els.breakdownTotal.textContent = formatMoney(netTotal);
    state.currentComputedTotal = netTotal;
  }

  // Complete Booking Action
  function confirmBooking() {
    // Check passenger names
    const emptyName = state.passengers.some(p => !p.name || p.name.trim() === "");
    if (emptyName) {
      showToast("Please enter names for all passengers.", "info");
      return;
    }

    els.confirmBookingBtn.disabled = true;
    els.confirmBookingBtn.innerHTML = `<span>Processing Secure Reservation...</span>`;

    setTimeout(() => {
      const randomPNR = `TRN-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const seatsAssigned = state.selectedSeats.length > 0 
        ? state.selectedSeats 
        : state.passengers.map((_, i) => `${10 + i}A`);

      const newBooking = {
        pnr: randomPNR,
        trainNumber: state.selectedTrain.number,
        trainName: state.selectedTrain.name,
        tripType: state.tripType === "one-way" ? "One Way" : "Round Trip",
        classCode: state.selectedClass,
        className: state.selectedTrain.classes[state.selectedClass]?.name || "First Class",
        from: { 
          code: state.searchQuery.from.code, 
          name: state.searchQuery.from.name, 
          time: state.selectedTrain.schedule.depTime 
        },
        to: { 
          code: state.searchQuery.to.code, 
          name: state.searchQuery.to.name, 
          time: state.selectedTrain.schedule.arrTime 
        },
        date: state.searchQuery.date,
        passengers: state.passengers.map((p, i) => ({
          name: p.name,
          age: p.age,
          gender: p.gender,
          seat: `Coach A1 - ${seatsAssigned[i] || '12A'}`
        })),
        coach: "A1",
        seats: seatsAssigned,
        totalFare: state.currentComputedTotal,
        status: "Confirmed",
        bookedAt: "Just now",
        platform: state.selectedTrain.schedule.stops[0].platform || "02",
        qrCodeData: `TICKET-${state.searchQuery.from.code}-${state.searchQuery.to.code}-${randomPNR}`
      };

      state.bookings.unshift(newBooking);
      localStorage.setItem("tbe_bookings", JSON.stringify(state.bookings));

      els.confirmBookingBtn.disabled = false;
      els.confirmBookingBtn.textContent = `Pay & Confirm Reservation →`;
      els.passengerModal.classList.remove("open");

      updateBookingsBadge();
      renderMyBookings();
      openTicketModal(newBooking);
      showToast(`Booking Confirmed! PNR: ${randomPNR}`);
    }, 1200);
  }

  // Digital Boarding Pass Ticket View
  function openTicketModal(booking) {
    const passengerRows = booking.passengers.map(p => `
      <div class="ticket-passenger-row">
        <span><strong>${p.name}</strong> (${p.age}y, ${p.gender})</span>
        <span style="color:var(--primary-light); font-weight:700;">${p.seat}</span>
      </div>
    `).join("");

    els.ticketCardContent.innerHTML = `
      <div class="ticket-boarding-pass printable-area">
        <div class="ticket-header-band">
          <div class="ticket-brand">
            <span>🚆 TrainBookEasy</span>
            <span style="font-size:0.75rem; background:rgba(255,255,255,0.2); padding:2px 8px; border-radius:4px;">E-TICKET / BOARDING PASS</span>
          </div>
          <div class="ticket-pnr-badge">PNR: ${booking.pnr}</div>
        </div>

        <div class="ticket-main-body">
          <div class="ticket-route-grid">
            <div class="ticket-time-col">
              <div class="ticket-time-big">${booking.from.time}</div>
              <div class="ticket-station-big">${booking.from.code}</div>
              <div style="font-size:0.85rem; color:var(--text-muted);">${booking.from.name}</div>
            </div>

            <div style="text-align:center;">
              <div style="font-size:0.8rem; color:var(--accent-emerald); font-weight:700; margin-bottom:4px;">● CONFIRMED</div>
              <div style="font-size:0.85rem; color:var(--text-dim);">─── 🚆 ───</div>
              <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Date: ${booking.date}</div>
            </div>

            <div class="ticket-time-col right">
              <div class="ticket-time-big">${booking.to.time}</div>
              <div class="ticket-station-big">${booking.to.code}</div>
              <div style="font-size:0.85rem; color:var(--text-muted);">${booking.to.name}</div>
            </div>
          </div>

          <div class="ticket-meta-grid">
            <div>
              <div class="ticket-meta-label">Train</div>
              <div class="ticket-meta-val">${booking.trainName} (#${booking.trainNumber})</div>
            </div>
            <div>
              <div class="ticket-meta-label">Class</div>
              <div class="ticket-meta-val">${booking.className}</div>
            </div>
            <div>
              <div class="ticket-meta-label">Coach / Platform</div>
              <div class="ticket-meta-val">Coach ${booking.coach} • Plat ${booking.platform}</div>
            </div>
            <div>
              <div class="ticket-meta-label">Total Fare Paid</div>
              <div class="ticket-meta-val" style="color:var(--accent-emerald); font-weight:800;">${formatMoney(booking.totalFare)}</div>
            </div>
          </div>

          <div class="ticket-passengers-list">
            <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-dim); margin-bottom:8px;">Passenger Allocation</div>
            ${passengerRows}
          </div>
        </div>

        <div class="ticket-footer-barcode-zone">
          <div style="display:flex; align-items:center; gap:16px;">
            <div class="qr-code-box">
              <svg width="68" height="68" viewBox="0 0 100 100" fill="#0f172a">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="#fff" />
                <rect x="10" y="10" width="10" height="10" />
                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="#fff" />
                <rect x="80" y="10" width="10" height="10" />
                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="#fff" />
                <rect x="10" y="80" width="10" height="10" />
                <rect x="36" y="10" width="10" height="20" />
                <rect x="52" y="30" width="15" height="15" />
                <rect x="36" y="60" width="25" height="10" />
                <rect x="70" y="70" width="25" height="25" />
              </svg>
            </div>
            <div>
              <div style="font-size:0.78rem; font-weight:700; color:var(--text-main);">Scan at Automatic Gate Turnstiles</div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">Government ID verification required during travel.</div>
            </div>
          </div>

          <svg class="barcode-svg-graphic" viewBox="0 0 200 40">
            <line x1="10" y1="0" x2="10" y2="40" stroke="currentColor" stroke-width="3" />
            <line x1="18" y1="0" x2="18" y2="40" stroke="currentColor" stroke-width="1.5" />
            <line x1="24" y1="0" x2="24" y2="40" stroke="currentColor" stroke-width="4" />
            <line x1="34" y1="0" x2="34" y2="40" stroke="currentColor" stroke-width="2" />
            <line x1="42" y1="0" x2="42" y2="40" stroke="currentColor" stroke-width="1" />
            <line x1="48" y1="0" x2="48" y2="40" stroke="currentColor" stroke-width="3" />
            <line x1="58" y1="0" x2="58" y2="40" stroke="currentColor" stroke-width="5" />
            <line x1="70" y1="0" x2="70" y2="40" stroke="currentColor" stroke-width="2" />
            <line x1="78" y1="0" x2="78" y2="40" stroke="currentColor" stroke-width="4" />
            <line x1="90" y1="0" x2="90" y2="40" stroke="currentColor" stroke-width="1.5" />
            <line x1="98" y1="0" x2="98" y2="40" stroke="currentColor" stroke-width="3" />
            <line x1="108" y1="0" x2="108" y2="40" stroke="currentColor" stroke-width="4" />
            <line x1="120" y1="0" x2="120" y2="40" stroke="currentColor" stroke-width="2" />
            <line x1="130" y1="0" x2="130" y2="40" stroke="currentColor" stroke-width="5" />
            <line x1="144" y1="0" x2="144" y2="40" stroke="currentColor" stroke-width="1" />
            <line x1="152" y1="0" x2="152" y2="40" stroke="currentColor" stroke-width="3" />
            <line x1="162" y1="0" x2="162" y2="40" stroke="currentColor" stroke-width="4" />
            <line x1="174" y1="0" x2="174" y2="40" stroke="currentColor" stroke-width="2" />
            <line x1="184" y1="0" x2="184" y2="40" stroke="currentColor" stroke-width="3" />
          </svg>
        </div>
      </div>
    `;

    els.ticketModal.classList.add("open");
  }

  // PNR Status Verification Engine
  function checkPnrStatus(pnrNumber) {
    pnrNumber = pnrNumber.trim().toUpperCase();
    if (!pnrNumber) {
      showToast("Please enter a valid 10-digit PNR number.", "info");
      return;
    }

    const found = state.bookings.find(b => b.pnr.toUpperCase() === pnrNumber);

    if (found) {
      els.pnrResultCard.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:14px;">
          <div>
            <span style="font-size:0.8rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">PNR Status</span>
            <div style="font-size:1.4rem; font-weight:800; color:var(--primary-light);">${found.pnr}</div>
          </div>
          <span style="background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald); font-weight:700; padding:6px 14px; border-radius:var(--radius-full); font-size:0.85rem; border:1px solid rgba(16, 185, 129, 0.3);">
            ● Chart Prepared / ${found.status}
          </span>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:16px; margin-bottom:20px;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Train</div>
            <div style="font-weight:700;">${found.trainName} (#${found.trainNumber})</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Date of Journey</div>
            <div style="font-weight:700;">${found.date}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Route</div>
            <div style="font-weight:700;">${found.from.code} ➔ ${found.to.code}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim);">Coach & Seats</div>
            <div style="font-weight:700; color:var(--accent-emerald);">Coach ${found.coach} (${found.seats.join(", ")})</div>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
          <div style="font-size:0.82rem; font-weight:700; margin-bottom:10px;">Passenger Confirmation Breakdown</div>
          ${found.passengers.map((p, i) => `
            <div style="display:flex; justify-content:space-between; font-size:0.88rem; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.04);">
              <span>Passenger ${i + 1}: <strong>${p.name}</strong></span>
              <span style="color:var(--accent-emerald); font-weight:600;">CNF / Coach ${found.coach} / ${found.seats[i] || 'Seat'}</span>
            </div>
          `).join("")}
        </div>

        <div style="margin-top:20px; text-align:right;">
          <button id="viewPnrBoardingPassBtn" class="btn-bookings-pill" style="display:inline-flex;">View Boarding Pass Ticket →</button>
        </div>
      `;

      const viewBtn = document.getElementById("viewPnrBoardingPassBtn");
      if (viewBtn) viewBtn.addEventListener("click", () => openTicketModal(found));
      showToast(`PNR details verified for ${found.pnr}`);
    } else {
      els.pnrResultCard.innerHTML = `
        <div style="text-align:center; padding:32px 16px;">
          <div style="font-size:2rem; margin-bottom:10px;">⚠️</div>
          <div style="font-size:1.1rem; font-weight:700;">PNR Not Found in System</div>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-top:6px;">Please check the 10-digit number. You can try demo PNR <code>TRN-9028143</code> or any ticket booked in this session.</p>
        </div>
      `;
    }
  }

  // Live Train Status Tracker
  function renderLiveTrainStatus(trainId) {
    const train = TRAIN_DATA.trains.find(t => t.id === trainId) || TRAIN_DATA.trains[0];
    const sched = train.schedule;

    const nodesHtml = sched.stops.map((stop, idx) => {
      let stateClass = "";
      if (idx < sched.currentStopIndex) stateClass = "passed";
      else if (idx === sched.currentStopIndex) stateClass = "current";

      return `
        <div class="timeline-station-node ${stateClass}">
          <div class="node-bullet">${idx < sched.currentStopIndex ? '✓' : ''}</div>
          <div class="node-content-row">
            <div>
              <div class="node-station-name">${stop.station}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">Platform ${stop.platform} • Distance ${stop.dist}</div>
            </div>
            <div class="node-times">
              <div>Arr: <strong>${stop.arr}</strong> | Dep: <strong>${stop.dep}</strong></div>
              <div style="text-align:right; font-size:0.75rem; color:${stop.status.includes('Delay') ? 'var(--accent-rose)' : 'var(--accent-emerald)'}; font-weight:700;">
                ${stop.status}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    els.liveTrainDisplay.innerHTML = `
      <div class="live-train-map-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; flex-wrap:wrap; gap:12px;">
          <div>
            <span style="font-size:0.8rem; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Live Satellite Telemetry</span>
            <div style="font-size:1.4rem; font-weight:800;">${train.name} <span class="train-number-tag">#${train.number}</span></div>
            <div style="font-size:0.85rem; color:var(--text-muted);">${sched.departureStation} ➔ ${sched.arrivalStation}</div>
          </div>
          <span style="background:rgba(56, 189, 248, 0.15); color:var(--primary-light); border:1px solid rgba(56, 189, 248, 0.3); padding:6px 14px; border-radius:var(--radius-full); font-size:0.85rem; font-weight:700;">
            ${train.type}
          </span>
        </div>

        <div class="live-train-speedo">
          <div>
            <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Current Velocity</div>
            <div class="speedo-unit">${train.speed}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700;">Live Condition</div>
            <div style="font-size:1rem; font-weight:700; color:var(--accent-emerald);">${sched.liveStatusText}</div>
          </div>
        </div>

        <div class="live-stations-timeline">
          ${nodesHtml}
        </div>
      </div>
    `;
  }

  // My Bookings Section
  function renderMyBookings() {
    if (state.bookings.length === 0) {
      els.bookingsListGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding:60px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--border-color);">
          <div style="font-size:3rem; margin-bottom:12px;">🎫</div>
          <h3>No Bookings Yet</h3>
          <p style="color:var(--text-muted); margin: 8px 0 20px;">Book your first train ticket now and travel hassle-free.</p>
          <button id="bookNowFromEmptyBtn" class="btn-search-trains" style="margin:0 auto; height:50px;">Book Tickets Now</button>
        </div>
      `;
      const btn = document.getElementById("bookNowFromEmptyBtn");
      if (btn) btn.addEventListener("click", () => switchTab("book"));
      return;
    }

    els.bookingsListGrid.innerHTML = "";

    state.bookings.forEach((b, idx) => {
      const card = document.createElement("div");
      card.className = "booking-history-card";
      card.innerHTML = `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--primary-light);">PNR: ${b.pnr}</span>
            <span style="font-size:0.75rem; font-weight:700; padding:3px 8px; border-radius:4px; background:rgba(16, 185, 129, 0.15); color:var(--accent-emerald);">
              ${b.status}
            </span>
          </div>

          <div style="font-size:1.15rem; font-weight:800; margin-bottom:6px;">${b.trainName}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">
            ${b.from.name} (${b.from.time}) ➔ ${b.to.name} (${b.to.time})
          </div>

          <div style="display:flex; gap:16px; font-size:0.8rem; color:var(--text-dim); margin-bottom:16px;">
            <span>📅 ${b.date}</span>
            <span>🛋 Coach ${b.coach} (${b.seats.join(", ")})</span>
            <span>👥 ${b.passengers.length} Pax</span>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:14px;">
          <span style="font-size:1.15rem; font-weight:800; color:var(--text-main);">${formatMoney(b.totalFare)}</span>
          <div style="display:flex; gap:8px;">
            <button class="btn-secondary-link cancel-booking-btn" data-idx="${idx}" style="font-size:0.78rem; color:var(--accent-rose);">Cancel</button>
            <button class="btn-bookings-pill view-ticket-btn" data-idx="${idx}" style="font-size:0.78rem; padding:6px 12px;">E-Ticket →</button>
          </div>
        </div>
      `;

      card.querySelector(".view-ticket-btn").addEventListener("click", () => openTicketModal(b));
      card.querySelector(".cancel-booking-btn").addEventListener("click", () => {
        if (confirm(`Are you sure you want to cancel PNR ${b.pnr}? Refund of ${formatMoney(b.totalFare * 0.9)} will be credited back.`)) {
          state.bookings.splice(idx, 1);
          localStorage.setItem("tbe_bookings", JSON.stringify(state.bookings));
          updateBookingsBadge();
          renderMyBookings();
          showToast(`Booking ${b.pnr} cancelled. Refund initiated!`);
        }
      });

      els.bookingsListGrid.appendChild(card);
    });
  }

  function updateBookingsBadge() {
    if (els.bookingsBadge) {
      els.bookingsBadge.textContent = state.bookings.length;
    }
  }

  // Tab Navigation Switching
  function switchTab(tabId) {
    state.activeTab = tabId;
    els.navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.tab === tabId);
    });
    els.tabPanels.forEach(panel => {
      panel.classList.toggle("active", panel.id === `tab-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Filter Reset
  function resetFilters() {
    state.filters.timeSlot = "all";
    state.filters.trainTypes = [];
    state.filters.maxPrice = 250;
    state.filters.availableOnly = false;
    state.filters.sortBy = "fastest";

    els.timeSlotBtns.forEach(b => b.classList.toggle("active", b.dataset.slot === "all"));
    els.typeCheckboxes.forEach(cb => cb.checked = false);
    els.priceRangeSlider.value = 250;
    els.priceValueLabel.textContent = formatMoney(250);
    els.availOnlyCheckbox.checked = false;
    els.sortSelect.value = "fastest";

    renderTrainResults();
    showToast("Filters reset to default.");
  }

  // Setup Event Listeners
  function setupEventListeners() {
    // Theme Switch
    if (els.themeToggleBtn) {
      els.themeToggleBtn.addEventListener("click", () => {
        const next = state.theme === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    }

    // Currency Switch
    if (els.currencySelect) {
      els.currencySelect.value = state.currency;
      els.currencySelect.addEventListener("change", (e) => {
        state.currency = e.target.value;
        localStorage.setItem("tbe_currency", state.currency);
        renderTrainResults();
        renderCalendarRibbon();
        renderMyBookings();
        els.priceValueLabel.textContent = formatMoney(state.filters.maxPrice);
        showToast(`Currency changed to ${state.currency}`);
      });
    }

    // Navigation Tabs
    els.navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = link.dataset.tab;
        if (tab) switchTab(tab);
      });
    });

    // Quick Bookings pill in navbar
    const navBookingsBtn = document.getElementById("navBookingsBtn");
    if (navBookingsBtn) {
      navBookingsBtn.addEventListener("click", () => switchTab("bookings"));
    }

    // Trip Type
    els.tripTypeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        els.tripTypeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.tripType = btn.dataset.type;
        els.returnDateBox.style.display = state.tripType === "round-trip" ? "block" : "none";
      });
    });

    // Quotas
    els.quotaChips.forEach(chip => {
      chip.addEventListener("click", () => {
        els.quotaChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        state.quota = chip.dataset.quota;
        renderTrainResults();
      });
    });

    // Date & Passenger Selectors
    els.departDateInput.addEventListener("change", (e) => {
      state.searchQuery.date = e.target.value;
      renderCalendarRibbon();
      renderTrainResults();
    });

    els.passengersSelect.addEventListener("change", (e) => {
      state.searchQuery.passengersCount = e.target.value;
    });

    els.classFilterSelect.addEventListener("change", (e) => {
      state.searchQuery.travelClass = e.target.value;
      renderTrainResults();
    });

    // Main Search Trains Button
    els.searchTrainsBtn.addEventListener("click", () => {
      switchTab("book");
      renderCalendarRibbon();
      renderTrainResults();
      const resultsSection = document.getElementById("searchResultsSection");
      if (resultsSection) resultsSection.scrollIntoView({ behavior: "smooth" });
      showToast(`Searching trains from ${state.searchQuery.from.city} to ${state.searchQuery.to.city}`);
    });

    // Filters: Time Slots
    els.timeSlotBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        els.timeSlotBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.filters.timeSlot = btn.dataset.slot;
        renderTrainResults();
      });
    });

    // Filters: Train Types
    els.typeCheckboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        const checked = Array.from(els.typeCheckboxes).filter(c => c.checked).map(c => c.value);
        state.filters.trainTypes = checked;
        renderTrainResults();
      });
    });

    // Filters: Price Slider
    els.priceRangeSlider.addEventListener("input", (e) => {
      state.filters.maxPrice = parseInt(e.target.value, 10);
      els.priceValueLabel.textContent = formatMoney(state.filters.maxPrice);
      renderTrainResults();
    });

    // Filters: Available Only
    els.availOnlyCheckbox.addEventListener("change", (e) => {
      state.filters.availableOnly = e.target.checked;
      renderTrainResults();
    });

    // Filters: Sort
    els.sortSelect.addEventListener("change", (e) => {
      state.filters.sortBy = e.target.value;
      renderTrainResults();
    });

    // Reset Filters
    els.resetFiltersBtn.addEventListener("click", resetFilters);

    // Coach Seat Selection
    els.coachTabs.querySelectorAll(".coach-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        els.coachTabs.querySelectorAll(".coach-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCoachSeats(btn.dataset.coach);
      });
    });

    els.closeSeatModal.addEventListener("click", () => els.seatModal.classList.remove("open"));
    els.proceedToPassengerBtn.addEventListener("click", () => {
      if (state.selectedSeats.length === 0) {
        showToast("Please choose your preferred seat(s) on the coach map.", "info");
        return;
      }
      openPassengerModal();
    });

    // Passenger Modal
    els.closePassengerModal.addEventListener("click", () => els.passengerModal.classList.remove("open"));
    els.addPassengerBtn.addEventListener("click", () => {
      state.passengers.push({ name: "", age: 30, gender: "Male", berth: "Window" });
      renderPassengerForms();
      updateCheckoutBreakdown();
    });

    els.insuranceCheckbox.addEventListener("change", (e) => {
      state.insuranceSelected = e.target.checked;
      updateCheckoutBreakdown();
    });

    els.carbonCheckbox.addEventListener("change", (e) => {
      state.carbonOffset = e.target.checked;
      updateCheckoutBreakdown();
    });

    // Promo Code Application
    els.applyPromoBtn.addEventListener("click", () => {
      const code = els.promoInput.value.trim().toUpperCase();
      if (!code) return;

      const promo = TRAIN_DATA.promoCodes[code];
      if (promo) {
        state.appliedPromo = promo;
        els.promoMessage.innerHTML = `<span style="color:var(--accent-emerald);">✓ Coupon applied! ${promo.desc}</span>`;
        updateCheckoutBreakdown();
        showToast(`Promo ${code} applied!`);
      } else {
        els.promoMessage.innerHTML = `<span style="color:var(--accent-rose);">✕ Invalid coupon code. Try RAILFIRST or SPEEDPASS</span>`;
      }
    });

    // Confirm Booking
    els.confirmBookingBtn.addEventListener("click", confirmBooking);

    // Ticket Modal Actions
    els.closeTicketModal.addEventListener("click", () => els.ticketModal.classList.remove("open"));
    els.printTicketBtn.addEventListener("click", () => window.print());
    els.downloadTicketBtn.addEventListener("click", () => {
      window.print();
    });

    // PNR Checker Events
    els.searchPnrBtn.addEventListener("click", () => checkPnrStatus(els.pnrSearchInput.value));
    els.pnrSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkPnrStatus(els.pnrSearchInput.value);
    });

    els.samplePnrChips.forEach(chip => {
      chip.addEventListener("click", () => {
        els.pnrSearchInput.value = chip.dataset.pnr;
        checkPnrStatus(chip.dataset.pnr);
      });
    });

    // Live Train Tracker Selector
    els.liveTrainSelect.addEventListener("change", (e) => {
      state.activeLiveTrainId = e.target.value;
      renderLiveTrainStatus(state.activeLiveTrainId);
    });
  }

  // Start the application
  init();
});
