/**
 * Contact Page Component
 * 
 * Accessible contact inquiry form with inline validation, privacy agreement checkbox,
 * tracked submission, and instant success / error states.
 */

import { SITE_CONFIG } from "../config/site.js";
import { trackConversion, trackEvent } from "../utils/analytics.js";

export function renderContactPage() {
  return `
    <div class="page-contact">
      <div class="container section-wrapper" style="max-width: 760px;">
        <div class="section-head" style="text-align: left;">
          <h2>Contact Travel Support</h2>
          <p>Have questions about your train travel request or station connections? Reach out to our customer support team.</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 36px; box-shadow: var(--shadow-sm);">
          
          <!-- Direct Call Box -->
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 18px 22px; margin-bottom: 28px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="font-weight: 700; color: #166534; font-size: 1rem;">Need Immediate Assistance?</div>
              <div style="font-size: 0.88rem; color: #15803d;">Call our reservation support desk directly</div>
            </div>
            <a href="${SITE_CONFIG.PHONE_HREF}" class="btn btn-call" id="contactCallBtn">
              Call ${SITE_CONFIG.PHONE_NUMBER}
            </a>
          </div>

          <!-- Success Alert Mount -->
          <div id="contactSuccessMsg" style="display: none; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-sm); padding: 20px; color: #065f46; margin-bottom: 24px;">
            <div style="font-weight: 800; font-size: 1.1rem; margin-bottom: 4px;">✓ Travel Request Submitted</div>
            <p style="font-size: 0.92rem; line-height: 1.5;">
              Thank you. Your inquiry has been received. A travel assistance specialist will review your details and respond promptly via email or phone.
            </p>
          </div>

          <!-- Error Alert Mount -->
          <div id="contactErrorMsg" style="display: none; background: #fef2f2; border: 1px solid #fecaca; border-radius: var(--radius-sm); padding: 16px; color: #991b1b; margin-bottom: 24px; font-size: 0.92rem;">
            Please ensure all required fields are filled out and the privacy policy agreement is checked.
          </div>

          <!-- Inquiry Form -->
          <form id="contactInquiryForm" novalidate onsubmit="event.preventDefault();">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
              <div>
                <label for="contactName" class="field-label">Your Full Name *</label>
                <div class="field-input-box" style="height: 48px;">
                  <input type="text" id="contactName" placeholder="e.g. Eleanor Vance" required>
                </div>
              </div>
              <div>
                <label for="contactEmail" class="field-label">Email Address *</label>
                <div class="field-input-box" style="height: 48px;">
                  <input type="email" id="contactEmail" placeholder="e.g. eleanor@example.com" required>
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
              <div>
                <label for="contactPhone" class="field-label">Phone Number *</label>
                <div class="field-input-box" style="height: 48px;">
                  <input type="tel" id="contactPhone" placeholder="e.g. (555) 123-4567" required>
                </div>
              </div>
              <div>
                <label for="contactTravelRequest" class="field-label">Travel Route / Request</label>
                <div class="field-input-box" style="height: 48px;">
                  <input type="text" id="contactTravelRequest" placeholder="e.g. Washington to New York next week">
                </div>
              </div>
            </div>

            <div style="margin-bottom: 20px;">
              <label for="contactMessage" class="field-label">Detailed Inquiry or Question *</label>
              <textarea id="contactMessage" rows="4" style="width: 100%; padding: 12px 16px; font-size: 0.95rem; resize: vertical;" placeholder="Please describe how we can assist with your train travel..." required></textarea>
            </div>

            <div style="margin-bottom: 24px;">
              <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: var(--text-secondary); cursor: pointer;">
                <input type="checkbox" id="contactPrivacyAgree" style="margin-top: 3px; accent-color: var(--primary);" required>
                <span>I agree to the <a href="#privacy-policy" data-route="privacy-policy" target="_blank" style="text-decoration: underline;">Privacy Policy</a> and authorize ${SITE_CONFIG.BRAND_NAME} to contact me regarding my travel request.</span>
              </label>
            </div>

            <button type="submit" id="submitContactBtn" class="btn btn-primary" style="padding: 14px 32px; font-size: 1rem; width: 100%;">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

export function initContactPage() {
  const form = document.getElementById("contactInquiryForm");
  const successBox = document.getElementById("contactSuccessMsg");
  const errorBox = document.getElementById("contactErrorMsg");
  const callBtn = document.getElementById("contactCallBtn");

  if (callBtn) {
    callBtn.addEventListener("click", () => {
      trackConversion("call_now", { location: "contact_page_banner" });
    });
  }

  if (form) {
    form.addEventListener("focusin", () => {
      trackEvent("contact_form_started");
    }, { once: true });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName")?.value.trim();
      const email = document.getElementById("contactEmail")?.value.trim();
      const phone = document.getElementById("contactPhone")?.value.trim();
      const message = document.getElementById("contactMessage")?.value.trim();
      const agree = document.getElementById("contactPrivacyAgree")?.checked;

      if (!name || !email || !phone || !message || !agree) {
        if (errorBox) {
          errorBox.style.display = "block";
          errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      if (errorBox) errorBox.style.display = "none";
      if (successBox) successBox.style.display = "block";

      form.reset();
      trackConversion("contact_submitted", { has_route_info: true });
      successBox.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}
