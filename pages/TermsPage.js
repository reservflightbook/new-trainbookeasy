/**
 * Terms and Conditions Page Component
 * 
 * Accurately reflects independent booking assistance status, user responsibilities,
 * absence of payment processing/ticketing, limitations of liability, and legal jurisdiction.
 */

import { SITE_CONFIG } from "../config/site.js";

export function renderTermsPage() {
  return `
    <div class="page-legal">
      <div class="container section-wrapper" style="max-width: 900px; padding-top: 32px; padding-bottom: 64px;">
        <div class="section-head" style="text-align: left; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(23,127,166,0.08); color: var(--accent-call); padding: 4px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; border: 1px solid rgba(23,127,166,0.2);">
            <i class="fa-solid fa-file-contract"></i> User Agreement & Terms of Service
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px; letter-spacing: -0.02em;">Terms and Conditions</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Effective Date: January 1, 2026 • Last updated: September 2026</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 40px; line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 32px; box-shadow: var(--shadow-sm);">
          
          <!-- Introduction Box -->
          <div style="background: #f8fafc; border-left: 4px solid var(--accent-call); padding: 20px 24px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 1rem; color: var(--text-main);">
            <p style="margin: 0;">
              Welcome to <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 700; text-decoration: none;">${SITE_CONFIG.BRAND_NAME}</a> (<strong>${SITE_CONFIG.WEBSITE_URL}</strong>, referred to as “we,” “us,” “our,” or the “Website”). These Terms and Conditions (“Terms”) govern your use of our website and any services provided through it. By accessing or using <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a>, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our Website.
            </p>
          </div>

          <!-- Section 1 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">1.</span> Important Notice – We Are a Booking Assistance Platform, NOT a Booking Provider
            </h2>
            <p style="margin-bottom: 12px;">Please read this section carefully. It is the foundation of our entire relationship with you.</p>
            <p style="margin-bottom: 14px;">
              <strong>${SITE_CONFIG.BRAND_NAME}</strong> is an independent assistance platform for travelers seeking to book Train train travel. We provide guidance, information, route suggestions, fare explanations, discount assistance, and step-by-step walkthroughs to help you complete a booking.
            </p>
            
            <div style="background: #fef2f2; border: 1px solid #fee2e2; border-radius: var(--radius-sm); padding: 18px 22px; margin-bottom: 18px;">
              <h4 style="color: #991b1b; font-size: 0.98rem; font-weight: 700; margin-bottom: 8px;">We do NOT:</h4>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 6px; color: #7f1d1d; margin-bottom: 0;">
                <li>Sell, issue, or confirm any train tickets, reservations, or e-tickets.</li>
                <li>Collect payment for any ticket, fare, or booking fee related to Train or any other rail carrier.</li>
                <li>Hold any inventory of seats, sleepers, or rail passes.</li>
                <li>Process cancellations, refunds, or exchanges of any ticket.</li>
                <li>Act as an authorized agent, partner, or affiliate of Train (National Railroad Passenger Corporation).</li>
                <li>Guarantee seat availability, fare lock, or specific schedule accuracy.</li>
              </ul>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 18px 22px; margin-bottom: 18px;">
              <h4 style="color: #166534; font-size: 0.98rem; font-weight: 700; margin-bottom: 8px;">What we DO provide:</h4>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 6px; color: #14532d; margin-bottom: 0;">
                <li>Informational assistance to help you understand Train routes, schedules, fare classes, discounts, and policies.</li>
                <li>Guidance on how to complete your booking directly on <a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: #15803d; text-decoration: underline; font-weight: 600;">Amtrak.com</a>, via the official Train mobile app, or through Train’s customer service center (1-800-USA-RAIL).</li>
                <li>Estimated fare ranges and schedule possibilities based on publicly available Train data.</li>
                <li>Troubleshooting assistance for common booking problems.</li>
              </ul>
            </div>

            <p style="margin-bottom: 0;">
              Your actual ticket purchase must be made directly with Train. Once you decide to book, you will be directed to Train’s official website or instructed to call Train. We are not a party to any transaction between you and Train, and we assume no responsibility for any issues arising from your booking with Train.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 2 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">2.</span> No Agency or Partnership
            </h2>
            <p style="margin-bottom: 10px;">
              Nothing in these Terms shall be construed to create an agency, partnership, joint venture, or employment relationship between you and <strong>${SITE_CONFIG.BRAND_NAME}</strong>. We are not the agent of Train, nor are you our principal. Your interaction with Train is solely between you and Train. Our assistance does not make us liable for Train’s performance, schedule changes, cancellations, baggage handling, onboard services, or any other aspect of your actual train travel.
            </p>
            <p style="margin: 0;">
              You acknowledge and agree that <strong>${SITE_CONFIG.BRAND_NAME}</strong> is not responsible for any loss, delay, inconvenience, or expense resulting from your travel on Train or any other rail carrier.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 3 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">3.</span> Accuracy of Information – No Warranty
            </h2>
            <p style="margin-bottom: 10px;">
              We strive to provide accurate, up-to-date information regarding Train routes, schedules, fares, and policies. However, Train frequently changes its schedules, promotional fares, discount eligibility rules, baggage policies, and other terms, often without advance notice.
            </p>
            <p style="margin-bottom: 10px;">Therefore, <strong>${SITE_CONFIG.BRAND_NAME}</strong> makes no representation or warranty, express or implied, regarding:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li>The accuracy, completeness, reliability, or timeliness of any information displayed on our Website.</li>
              <li>Current or future seat availability on any Train train.</li>
              <li>The exact fare you will be quoted on (fares change dynamically based on demand, booking date, and other factors).</li>
              <li>The validity of any discount, promotional code, or rail pass information we provide.</li>
            </ul>
            <p style="margin: 0;">
              You are solely responsible for verifying all train schedules, fares, policies, and availability directly on Train’s official website or by calling Train customer service before making a purchase. Use our information as a helpful starting point, not as a final authority.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 4 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">4.</span> Your Responsibilities as a User
            </h2>
            <p style="margin-bottom: 10px;">By using <strong>${SITE_CONFIG.BRAND_NAME}</strong>, you agree that:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li>You are at least 18 years of age or have parental/guardian consent to use our services.</li>
              <li>You will not rely solely on our information for time-sensitive travel decisions without independently verifying with Train.</li>
              <li>You will not attempt to use our Website to circumvent Train’s security, fare rules, or booking systems.</li>
              <li>You will not misrepresent our role to any third party (e.g., claiming we are Train or an authorized ticketing agent).</li>
              <li>You will read and comply with Train’s own Terms of Service and conditions of carriage when you purchase your ticket.</li>
              <li>You will not use our Website for any unlawful purpose, including fraud, ticket scalping, or any activity that violates Train’s policies.</li>
            </ul>
            <p style="margin: 0;">
              Failure to comply with these responsibilities may result in immediate termination of your access to <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> (${SITE_CONFIG.WEBSITE_URL}).
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 5 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">5.</span> No Payment Processing – No Financial Liability
            </h2>
            <p style="margin-bottom: 12px;">
              Because we do not process any payments for Train tickets, we never request, collect, or store your credit card details, debit card information, banking credentials, or any other financial instruments. We do not ask for your full legal name, Social Security number, or government ID for booking purposes (though we may ask for a first name and travel preferences for optional account features).
            </p>
            <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: var(--radius-sm); padding: 14px 18px; color: #92400e; font-size: 0.92rem;">
              <strong>Important Consumer Warning:</strong> If any third-party website, pop-up, advertisement, or email claiming to be associated with <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: #b45309; font-weight: 700;">${SITE_CONFIG.BRAND_NAME}</a> asks you for payment information for an Train ticket, do not provide it. That is a fraudulent attempt. Report it to us immediately at our contact email address (<a href="mailto:${SITE_CONFIG.EMAIL}" style="color: #b45309; font-weight: 700; text-decoration: underline;">${SITE_CONFIG.EMAIL}</a>) or call our support line at <a href="${SITE_CONFIG.PHONE_HREF}" style="color: #b45309; font-weight: 700;">${SITE_CONFIG.PHONE_NUMBER}</a>.
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 6 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">6.</span> Third-Party Links and Redirections
            </h2>
            <p style="margin-bottom: 10px;"><a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> may contain links to third-party websites, including but not limited to:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li><a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-call); text-decoration: underline;">Amtrak.com</a> (official Train website)</li>
              <li>Train’s mobile app download pages (Apple App Store, Google Play Store)</li>
              <li>Official state rail or transit authority websites</li>
              <li>Travel insurance providers (if we offer such affiliate links)</li>
            </ul>
            <p style="margin: 0;">
              We are not responsible for the content, privacy practices, security, or accuracy of any third-party website. Once you click a link to leave <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a>, you are subject to the terms and conditions and privacy policies of that third-party site. We encourage you to read those terms carefully, especially when making a purchase.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 7 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">7.</span> Disclaimer of Warranties
            </h2>
            <p style="margin-bottom: 10px;">
              To the fullest extent permitted by law, <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> provides the Website and all services on an “AS IS” and “AS AVAILABLE” basis. We expressly disclaim all warranties of any kind, whether express or implied, including but not limited to:
            </p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li>Implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.</li>
              <li>Warranties that our Website will be uninterrupted, error-free, secure, or free of viruses or other harmful components.</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any information (including Train train data) provided through the Website.</li>
            </ul>
            <p style="margin: 0;">
              No advice or information obtained by you from <strong>${SITE_CONFIG.BRAND_NAME}</strong>, whether oral or written, shall create any warranty not expressly stated in these Terms.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 8 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">8.</span> Limitation of Liability
            </h2>
            <p style="margin-bottom: 10px;">
              To the maximum extent permitted by applicable law, <strong>${SITE_CONFIG.BRAND_NAME}</strong> (and operated by <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong>), its owners, employees, contractors, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li>Loss of profits, data, use, goodwill, or other intangible losses.</li>
              <li>Damages arising from your inability to book a desired Train train due to unavailability, pricing changes, or technical errors on Train’s systems.</li>
              <li>Damages resulting from missed connections, trip delays, cancellations, baggage loss, personal injury, or any other incident occurring during your actual train travel with Train.</li>
              <li>Damages caused by errors or omissions in the information we provide, even if we have been advised of the possibility of such damages.</li>
            </ul>
            <p style="margin-bottom: 12px;">
              Our total aggregate liability to you for any claim arising out of or relating to these Terms or your use of the Website shall not exceed the greater of: (a) the total amount you have paid to us (which will likely be zero, as we do not charge for basic assistance) or (b) $10 USD.
            </p>
            <p style="margin: 0;">
              Because we do not sell tickets, you agree that it would be unreasonable to hold us liable for any substantial financial loss related to your travel plans. Your primary recourse for ticketing issues is always Train directly.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 9 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">9.</span> Indemnification
            </h2>
            <p style="margin-bottom: 10px;">
              You agree to indemnify, defend, and hold harmless <strong>${SITE_CONFIG.BRAND_NAME}</strong>, its operating entity <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong>, its owners, operators, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising out of or related to:
            </p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 0;">
              <li>Your violation of these Terms.</li>
              <li>Your misuse of our Website.</li>
              <li>Your violation of any third-party rights, including Train’s terms of service.</li>
              <li>Any false or misleading representation you make about <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> (e.g., claiming we are an official Train partner).</li>
            </ul>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 10 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">10.</span> Intellectual Property
            </h2>
            <p style="margin-bottom: 10px;">
              All content on <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> (${SITE_CONFIG.WEBSITE_URL}) – including text, graphics, logos, icons, images, data compilations, and software – is the property of <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> or its content suppliers and is protected by United States and international copyright laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content without our prior written permission.
            </p>
            <p style="margin: 0;">
              You are granted a limited, non-exclusive, revocable license to access and use the Website for your personal, non-commercial travel assistance purposes only.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 11 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">11.</span> Modifications to Terms and Website
            </h2>
            <p style="margin-bottom: 10px;">
              We reserve the right to modify or replace these Terms at any time without prior notice. The most current version will always be posted on this page, with the “Last Updated” date at the top. Your continued use of the Website after any changes constitutes your acceptance of the new Terms.
            </p>
            <p style="margin: 0;">
              We also reserve the right to modify, suspend, or discontinue any part of the Website (including any assistance feature) without notice or liability.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 12 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">12.</span> Termination
            </h2>
            <p style="margin: 0;">
              We may terminate or suspend your access to <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Website will cease immediately.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 13 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">13.</span> Governing Law & Jurisdiction
            </h2>
            <p style="margin: 0;">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in the City and County of San Francisco, California, and you consent to the personal jurisdiction of such courts.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 14 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">14.</span> Severability
            </h2>
            <p style="margin: 0;">
              If any provision of these Terms is held to be unenforceable or invalid, that provision shall be enforced to the maximum extent possible, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 15 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">15.</span> Entire Agreement
            </h2>
            <p style="margin: 0;">
              These Terms constitute the entire agreement between you and <strong>${SITE_CONFIG.BRAND_NAME}</strong> regarding your use of the Website and supersede all prior agreements and understandings, whether written or oral.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 16 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">16.</span> Contact Information
            </h2>
            <p style="margin-bottom: 14px;">
              If you have any questions about these Terms, please contact us through the contact form available on our website, or via the information below:
            </p>
            
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); padding: 22px 26px; border-radius: var(--radius-md); display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
              <div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem; margin-bottom: 4px;">${SITE_CONFIG.LEGAL_BUSINESS_NAME}</div>
                <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 10px;">Operating ${SITE_CONFIG.BRAND_NAME}</div>
                <div style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
                  <i class="fa-solid fa-location-dot" style="color: var(--accent-call); margin-right: 6px;"></i> ${SITE_CONFIG.BUSINESS_ADDRESS.formatted}
                </div>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem;">
                <div>
                  <strong style="color: var(--text-main);">Toll-Free Phone (TFN):</strong><br>
                  <a href="${SITE_CONFIG.PHONE_HREF}" style="color: var(--accent-call); font-weight: 700; font-size: 1rem; text-decoration: none;">
                    <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> ${SITE_CONFIG.PHONE_NUMBER}
                  </a>
                  <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">24/7 Available • Dedicated Rail Travel Assistance</span>
                </div>
                <div>
                  <strong style="color: var(--text-main);">Secondary Support Line:</strong><br>
                  <a href="tel:18888216270" style="color: var(--text-main); font-weight: 600; text-decoration: none;">
                    ${SITE_CONFIG.SUPPORT_PHONE_ALT}
                  </a>
                </div>
                <div>
                  <strong style="color: var(--text-main);">Legal & Support Email:</strong><br>
                  <a href="mailto:${SITE_CONFIG.EMAIL}" style="color: var(--accent-call); font-weight: 600; text-decoration: underline;">
                    <i class="fa-solid fa-envelope" style="margin-right: 6px;"></i> ${SITE_CONFIG.EMAIL}
                  </a>
                </div>
                <div>
                  <strong style="color: var(--text-main);">Website:</strong><br>
                  <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">
                    ${SITE_CONFIG.WEBSITE_URL}
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  `;
}
