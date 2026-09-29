/**
 * Disclaimer Page Component
 * 
 * Standalone regulatory disclosure clarifying independent service status.
 */

import { SITE_CONFIG } from "../config/site.js";

export function renderDisclaimerPage() {
  return `
    <div class="page-legal">
      <div class="container section-wrapper" style="max-width: 860px;">
        <div class="section-head" style="text-align: left;">
          <h2>Legal & Transparency Disclaimer</h2>
          <p>Important consumer disclosure regarding our services and brand relationships.</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 36px; line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 24px;">
          <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: var(--radius-sm); padding: 20px; color: #854d0e; font-size: 0.98rem; font-weight: 500;">
            ${SITE_CONFIG.DISCLAIMER}
          </div>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">1. Non-Affiliation Statement</h3>
            <p>
              ${SITE_CONFIG.BRAND_NAME} is an independent third-party travel assistance and reservation service provider. We are not owned, operated by, endorsed by, or affiliated with the National Railroad Passenger Corporation (Amtrak), VIA Rail Canada, Brightline, or any other government or commercial rail operator.
            </p>
          </section>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">2. Trademark Notice</h3>
            <p>
              The names "Amtrak", "Acela", "Auto Train", "Empire Builder", "Northeast Regional", and other train service marks or logos are registered trademarks of their respective owners. Their mention on this website is solely for informational, descriptive, and nominative identification purposes to help travelers identify desired routes and stations.
            </p>
          </section>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">3. Service Scope & Pricing</h3>
            <p>
              Our telephone representatives assist travelers in researching schedules, understanding connection options, and completing bookings. Travelers may also choose to book directly through official rail operator websites or station ticket counters without agency assistance.
            </p>
          </section>

          <section>
            <h3 style="color: var(--text-main); margin-bottom: 8px;">4. Questions & Inquiries</h3>
            <p>
              For questions regarding our independent service or this disclosure, please contact:
            </p>
            <div style="background: var(--bg-subtle); padding: 14px 18px; border-radius: var(--radius-sm); margin-top: 8px;">
              <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong><br>
              ${SITE_CONFIG.BUSINESS_ADDRESS.formatted}<br>
              Email: ${SITE_CONFIG.EMAIL}<br>
              Phone: ${SITE_CONFIG.PHONE_NUMBER}
            </div>
          </section>
        </div>
      </div>
    </div>
  `;
}
