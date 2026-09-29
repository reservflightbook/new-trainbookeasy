/**
 * Refund & Cancellation Policy Page Component
 */

import { SITE_CONFIG } from "../config/site.js";

export function renderRefundPage() {
  return `
    <div class="page-legal">
      <div class="container section-wrapper" style="max-width: 860px;">
        <div class="section-head" style="text-align: left;">
          <h2>Refund & Cancellation Policy</h2>
          <p>Clear, transparent policies regarding ticket changes, cancellations, and fee structures.</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 36px; line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 24px;">
          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">1. Carrier Ticket Refund Rules</h3>
            <p>
              Refund and exchange eligibility for train tickets is governed strictly by the specific rail carrier's fare rules (e.g., Saver, Value, Flexible, Business, or Premium accommodations). Flexible fares are typically eligible for full or partial refunds prior to scheduled departure, while certain promotional fares may carry cancellation fees or provide electronic travel vouchers instead of monetary refunds.
            </p>
          </section>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">2. Agency Assistance Fees</h3>
            <p>
              Any assistance or booking service fees charged by ${SITE_CONFIG.BRAND_NAME} for phone booking, itinerary planning, or customer support services are non-refundable once the booking service has been performed, unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">3. How to Request a Cancellation or Change</h3>
            <p>
              To change or cancel a reservation booked with our assistance, please contact our telephone support desk as soon as possible before your scheduled departure:
            </p>
            <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: var(--radius-sm); margin-top: 8px;">
              <strong>Customer Support Desk:</strong> <a href="${SITE_CONFIG.PHONE_HREF}" style="color:var(--accent-call); font-weight:700;">${SITE_CONFIG.PHONE_NUMBER}</a><br>
              <strong>Email:</strong> ${SITE_CONFIG.EMAIL}<br>
              Please have your booking reference number and traveler name ready.
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}
