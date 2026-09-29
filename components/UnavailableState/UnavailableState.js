/**
 * Unavailable State Component (Creative Animated Train Popup Modal)
 * 
 * Includes:
 * - Animated moving high-speed train on railway tracks at top
 * - "Compare & Book Train Deals" / "Book Your Dream Vacation With Us"
 * - "Book Your Train Journey" / "Fast • Secure • Best Fare"
 * - "✅ Booking Is In the Queue — Our rail expert will contact you shortly."
 * - Lady customer support specialist photo
 * - Prominent TFN: 1-888-821-6270 & Alt: +1-877-486-9036
 */

import { SITE_CONFIG } from "../../config/site.js";
import { trackConversion } from "../../utils/analytics.js";

export function renderUnavailableState(data = {}) {
  const originName = data.originName || "Departure Station";
  const destName = data.destName || "Destination Station";
  const dateFormatted = data.departureDate || "Selected Date";

  return `
    <div class="booking-modal-backdrop" id="bookingModalBackdrop">
      <div class="booking-modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTrainHeading">
        
        <!-- Dismiss Close (X) Button -->
        <button type="button" class="modal-close-btn" id="modalCloseBtn" aria-label="Close dialog">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <!-- 1. Creative Animated Moving Train Scene -->
        <div class="modal-train-scene">
          <div class="train-sky-backdrop">
            <div class="train-cloud cloud-1"></div>
            <div class="train-cloud cloud-2"></div>
            <div class="deal-live-badge">
              <span class="live-dot-pulse"></span>
              <span>Fast • Secure • Best Fare</span>
            </div>
          </div>

          <!-- Railway Tracks -->
          <div class="train-track-strip">
            <div class="track-rail"></div>
            <div class="track-sleepers"></div>
          </div>

          <!-- Animated Speeding Train -->
          <div class="train-moving-vehicle" aria-hidden="true">
            <svg class="speed-train-svg" viewBox="0 0 240 70" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Wind/Speed streaks -->
              <line x1="10" y1="28" x2="45" y2="28" stroke="#177FA6" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
              <line x1="5" y1="38" x2="35" y2="38" stroke="#177FA6" stroke-width="2.5" stroke-linecap="round" opacity="0.4"/>
              <line x1="20" y1="48" x2="55" y2="48" stroke="#177FA6" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
              
              <!-- Train Engine Nose & Body -->
              <path d="M45 48 C45 32 60 20 85 18 L190 18 C205 18 220 28 230 38 C238 46 235 52 225 52 L55 52 C48 52 45 50 45 48 Z" fill="#177FA6"/>
              <!-- Front Aerodynamic Nose highlight -->
              <path d="M190 22 C202 22 215 30 224 40 C215 44 200 45 185 45 L110 45 C105 45 105 42 110 42 L180 42 C195 42 205 38 212 32 C205 26 195 23 185 23 Z" fill="#ffffff" opacity="0.9"/>
              <!-- Train Windows -->
              <rect x="75" y="26" width="16" height="10" rx="2" fill="#ffffff" opacity="0.95"/>
              <rect x="98" y="26" width="18" height="10" rx="2" fill="#ffffff" opacity="0.95"/>
              <rect x="123" y="26" width="18" height="10" rx="2" fill="#ffffff" opacity="0.95"/>
              <rect x="148" y="26" width="18" height="10" rx="2" fill="#ffffff" opacity="0.95"/>
              <!-- Cockpit Window -->
              <path d="M185 26 L205 26 C214 32 218 36 216 38 L185 38 Z" fill="#0f172a" opacity="0.85"/>
              <!-- Lower Underbody / Wheels cover -->
              <rect x="52" y="50" width="174" height="6" rx="2" fill="#0f172a"/>
              <circle cx="80" cy="54" r="3" fill="#cbd5e1"/>
              <circle cx="120" cy="54" r="3" fill="#cbd5e1"/>
              <circle cx="160" cy="54" r="3" fill="#cbd5e1"/>
              <circle cx="200" cy="54" r="3" fill="#cbd5e1"/>
              <!-- Front Headlight Beam -->
              <polygon points="228,44 240,40 240,48" fill="#fef08a" opacity="0.9"/>
            </svg>
          </div>
        </div>

        <div class="modal-body-content">
          <!-- 2. Compare & Book Train Deals -->
          <div class="modal-deals-header">
            <span class="deals-highlight-pill">Compare & Book Train Deals</span>
            <div class="dream-vacation-title">Book Your Dream Vacation With Us</div>
          </div>

          <!-- 3. Book Your Train Journey & Route Summary -->
          <div class="modal-journey-summary">
            <h3 class="modal-journey-title" id="modalTrainHeading">Book Your Train Journey</h3>
            <div class="modal-route-chip">
              <span class="route-stop-name">${originName}</span>
              <span class="route-sep-arrow">➔</span>
              <span class="route-stop-name">${destName}</span>
            </div>
            <div class="modal-route-date-line">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#177FA6" stroke-width="2.3">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Travel Date: <strong>${dateFormatted}</strong></span>
            </div>
          </div>

          <!-- 4. Booking In The Queue Notice -->
          <div class="modal-queue-box">
            <div class="queue-check-badge">✅</div>
            <div class="queue-copy-wrap">
              <div class="queue-main-text">Booking Is In the Queue</div>
              <div class="queue-sub-text">Our rail expert will contact you shortly.</div>
            </div>
          </div>

          <!-- 5. Lady Customer Care Representative & High-Conversion CTA Card -->
          <div class="modal-agent-cta-card">
            <div class="agent-cta-row">
              <div class="agent-avatar-wrap">
                <img src="assets/images/support-agent.jpg" alt="Rail Travel Expert Specialist" class="agent-avatar-img">
                <span class="agent-live-dot" title="Specialist Available Now"></span>
              </div>
              <div class="agent-pitch-wrap">
                <div class="agent-priority-tag">Instant Seat Confirmation</div>
                <p class="agent-pitch-text">
                  Skip the queue! Call our specialist now for direct schedule lookup and instant phone ticketing.
                </p>
              </div>
            </div>

            <!-- Primary High-Impact CTA Button (TFN: 1-888-821-6270) -->
            <a href="tel:18888216270" class="btn modal-tfn-btn" id="unavailableCallBtn">
              <div class="btn-phone-ring">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="btn-label-wrap">
                <span class="btn-label-call">CALL TOLL-FREE NOW</span>
                <span class="btn-label-phone">1-888-821-6270</span>
              </div>
            </a>

            <!-- Subtext & Alt Contact -->
            <div class="modal-tfn-submeta">
              <span class="tfn-badge">Toll-Free • 24/7 Available</span>
              <span class="tfn-contact-alt">Contact Us: <a href="tel:18774869036">+1-877-486-9036</a></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

export function initUnavailableState(onClose) {
  const callBtn = document.getElementById("unavailableCallBtn");
  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = document.getElementById("bookingModalBackdrop");

  function closeModal() {
    if (backdrop) {
      backdrop.classList.add("closing");
      setTimeout(() => {
        backdrop.remove();
        if (onClose) onClose();
      }, 180);
    }
  }

  if (callBtn) {
    callBtn.addEventListener("click", () => {
      trackConversion("call_now", { location: "search_animated_popup_modal" });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escHandler);
    }
  });
}
