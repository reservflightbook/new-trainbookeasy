/**
 * Passenger Selector Component
 * 
 * Professional, modern travel-portal passenger selector:
 * - Crisp SVG passenger icon
 * - Interactive stepper (+ / -) & quick chip count selector
 * - Accessible keyboard & click-outside handling
 * - Clean mobile & desktop responsive design
 */

import { trackEvent } from "../../utils/analytics.js";

export function renderPassengerSelector(defaultCount = 1) {
  return `
    <div class="form-field-group passenger-field-group" id="passengerFieldGroup">
      <label for="passengerTriggerBtn" class="field-label">Passengers</label>
      
      <div class="field-input-box passenger-input-box" id="passengerTriggerBtn" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-label="Select number of passengers">
        <div class="field-prefix-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        
        <div class="passenger-current-value" id="passengerDisplayText">
          ${defaultCount} ${defaultCount === 1 ? 'Passenger' : 'Passengers'}
        </div>

        <div class="field-suffix-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <!-- Hidden accessible select for fallback / form serialization -->
      <select id="passengerSelectInput" class="sr-only" aria-hidden="true" tabindex="-1">
        ${[1, 2, 3, 4, 5, 6, 7, 8].map(num => `
          <option value="${num}" ${num === defaultCount ? 'selected' : ''}>
            ${num} ${num === 1 ? 'Passenger' : 'Passengers'}
          </option>
        `).join("")}
      </select>

      <!-- Professional Passenger Popover Dropdown -->
      <div class="passenger-popover" id="passengerPopover" role="dialog" aria-label="Select passengers modal">
        <div class="passenger-popover-header">
          <span class="passenger-popover-title">Passengers</span>
          <span class="passenger-popover-note">Max 8 per booking</span>
        </div>

        <div class="passenger-stepper-row">
          <div class="passenger-type-meta">
            <span class="passenger-type-label">Adults & Guests</span>
            <span class="passenger-type-sub">Age 2 and older</span>
          </div>
          
          <div class="stepper-controls">
            <button type="button" class="stepper-btn" id="passengerMinusBtn" aria-label="Decrease passenger count" ${defaultCount <= 1 ? 'disabled' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <span class="stepper-count-display" id="stepperCountDisplay">${defaultCount}</span>
            <button type="button" class="stepper-btn" id="passengerPlusBtn" aria-label="Increase passenger count" ${defaultCount >= 8 ? 'disabled' : ''}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick selection pills -->
        <div class="passenger-quick-chips">
          <span class="quick-chips-label">Quick select:</span>
          <div class="chips-list">
            ${[1, 2, 3, 4, 5, 6].map(n => `
              <button type="button" class="passenger-chip ${n === defaultCount ? 'active' : ''}" data-val="${n}">${n}</button>
            `).join("")}
          </div>
        </div>

        <div class="passenger-popover-footer">
          <button type="button" class="btn btn-primary passenger-done-btn" id="passengerDoneBtn">
            Done
          </button>
        </div>
      </div>
    </div>
  `;
}

export function initPassengerSelector(onCountChange) {
  const trigger = document.getElementById("passengerTriggerBtn");
  const popover = document.getElementById("passengerPopover");
  const displayText = document.getElementById("passengerDisplayText");
  const select = document.getElementById("passengerSelectInput");
  const minusBtn = document.getElementById("passengerMinusBtn");
  const plusBtn = document.getElementById("passengerPlusBtn");
  const countDisplay = document.getElementById("stepperCountDisplay");
  const doneBtn = document.getElementById("passengerDoneBtn");
  const chips = document.querySelectorAll(".passenger-chip");

  if (!trigger || !popover) return;

  let currentCount = parseInt(select ? select.value : "1", 10) || 1;

  function updateUi(val) {
    currentCount = Math.max(1, Math.min(8, val));
    
    // Update display label
    if (displayText) {
      displayText.textContent = `${currentCount} ${currentCount === 1 ? 'Passenger' : 'Passengers'}`;
    }
    
    // Update stepper display
    if (countDisplay) {
      countDisplay.textContent = currentCount;
    }

    // Update stepper buttons disabled state
    if (minusBtn) minusBtn.disabled = currentCount <= 1;
    if (plusBtn) plusBtn.disabled = currentCount >= 8;

    // Update fallback select
    if (select) {
      select.value = currentCount;
    }

    // Update chips
    chips.forEach(chip => {
      const v = parseInt(chip.dataset.val, 10);
      chip.classList.toggle("active", v === currentCount);
    });

    trackEvent("passenger_selected", { count: currentCount });
    if (onCountChange) onCountChange(currentCount);
  }

  function togglePopover(show) {
    const isVisible = show !== undefined ? show : !popover.classList.contains("open");
    popover.classList.toggle("open", isVisible);
    trigger.setAttribute("aria-expanded", isVisible ? "true" : "false");
  }

  // Trigger click
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });

  // Keyboard accessibility on trigger
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      togglePopover(true);
    } else if (e.key === "Escape") {
      togglePopover(false);
    }
  });

  // Minus button
  if (minusBtn) {
    minusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentCount > 1) {
        updateUi(currentCount - 1);
      }
    });
  }

  // Plus button
  if (plusBtn) {
    plusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentCount < 8) {
        updateUi(currentCount + 1);
      }
    });
  }

  // Quick Chips click
  chips.forEach(chip => {
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const val = parseInt(chip.dataset.val, 10);
      updateUi(val);
    });
  });

  // Done button
  if (doneBtn) {
    doneBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePopover(false);
    });
  }

  // Close on outside click
  document.addEventListener("click", (e) => {
    const group = document.getElementById("passengerFieldGroup");
    if (group && !group.contains(e.target)) {
      togglePopover(false);
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popover.classList.contains("open")) {
      togglePopover(false);
      trigger.focus();
    }
  });
}
