/**
 * Privacy Policy Page Component
 * 
 * Accurately reflects independent booking assistance status, data collection policies,
 * non-collection of financial/sensitive data, and full user rights under CCPA and GDPR.
 */

import { SITE_CONFIG } from "../config/site.js";

export function renderPrivacyPolicyPage() {
  return `
    <div class="page-legal">
      <div class="container section-wrapper" style="max-width: 900px; padding-top: 32px; padding-bottom: 64px;">
        <div class="section-head" style="text-align: left; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(23,127,166,0.08); color: var(--accent-call); padding: 4px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; border: 1px solid rgba(23,127,166,0.2);">
            <i class="fa-solid fa-shield-halved"></i> Official Transparency & Data Protection
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px; letter-spacing: -0.02em;">Privacy Policy</h1>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Effective Date: January 1, 2026 • Last updated: September 2026</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 40px; line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 32px; box-shadow: var(--shadow-sm);">
          
          <!-- Introduction Box -->
          <div style="background: #f8fafc; border-left: 4px solid var(--accent-call); padding: 20px 24px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 1rem; color: var(--text-main);">
            <p style="margin-bottom: 14px;">
              Welcome to <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 700; text-decoration: none;">${SITE_CONFIG.BRAND_NAME}</a> (<strong>${SITE_CONFIG.WEBSITE_URL}</strong>, referred to as “we,” “us,” “our,” or “the Website”). We are an independent Train booking assistance platform – we help you understand routes, schedules, fares, discounts, and the booking process, but we do not sell tickets, process payments, or issue reservations. All actual bookings are made directly with Train (National Railroad Passenger Corporation) or its authorized agents.
            </p>
            <p style="margin: 0;">
              This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Website. Because we do not handle ticket payments or reservations, our data collection is significantly different from traditional travel booking sites. Please read this policy carefully.
            </p>
          </div>

          <!-- Section 1 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">1.</span> What We Mean by “Train Booking Assist”
            </h2>
            <p style="margin-bottom: 12px;">To avoid any confusion, let us restate our role clearly:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
              <li><strong>We assist you</strong> in finding train routes, comparing fare estimates, understanding discounts, and walking you through the steps to book on Train’s official website or app.</li>
              <li><strong>We do NOT</strong> take your payment information (credit card, debit card, UPI, PayPal, etc.).</li>
              <li><strong>We do NOT</strong> hold, reserve, or cancel any Train tickets.</li>
              <li><strong>We do NOT</strong> access Train’s internal booking system.</li>
              <li><strong>We are NOT</strong> affiliated with, endorsed by, or partnered with Train.</li>
            </ul>
            <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: var(--radius-sm); padding: 14px 18px; color: #92400e; font-size: 0.92rem;">
              <strong>Security Notice:</strong> Because we do not process transactions, we never ask for sensitive financial information such as credit card numbers, CVV codes, or billing addresses. Any request for such information on our site would be fraudulent – please report it to us immediately at <a href="${SITE_CONFIG.PHONE_HREF}" style="color: #b45309; font-weight: 700;">${SITE_CONFIG.PHONE_NUMBER}</a>.
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 2 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">2.</span> Information We Collect
            </h2>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 600; margin-bottom: 8px;">2.1 Information You Voluntarily Provide</h3>
              <p style="margin-bottom: 10px;">When you use our assistance services, you may choose to provide:</p>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px;">
                <li><strong>Travel details:</strong> Departure city, destination, travel dates, number of passengers, class of travel (coach, business, sleeper), and discount eligibility (senior, student, military, etc.).</li>
                <li><strong>Contact information:</strong> Email address (if you sign up for alerts, ask a question via our contact form, or request a booking walkthrough).</li>
                <li><strong>Optional account details:</strong> If you create a free account on <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); text-decoration: none; font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a>, we may store your name, email, and saved travel preferences (e.g., favorite routes or discount types).</li>
                <li><strong>Communications:</strong> Any messages you send us via our contact page, live chat, or email, including feedback, support requests, or assistance queries.</li>
              </ul>
            </div>

            <div style="margin-bottom: 20px;">
              <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 600; margin-bottom: 8px;">2.2 Information Automatically Collected (Cookies & Analytics)</h3>
              <p style="margin-bottom: 10px;">Like most websites, we automatically collect certain non-personal information when you visit <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); text-decoration: none; font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> (${SITE_CONFIG.WEBSITE_URL}):</p>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 10px;">
                <li><strong>Log data:</strong> IP address, browser type, operating system, referring pages, date/time stamps, and pages viewed.</li>
                <li><strong>Usage data:</strong> How you navigate our site, which assistance tools you use (e.g., route search, fare estimator, discount checker), and how long you stay on each page.</li>
                <li><strong>Cookies:</strong> Small text files stored on your device to remember your preferences (e.g., language, recent searches) and to analyze site traffic.</li>
              </ul>
              <p>We use this information to improve our assistance tools, fix technical issues, and understand which Train routes or features our users care about most. None of this data is sold to third parties.</p>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius-sm); padding: 18px 22px;">
              <h3 style="color: #166534; font-size: 1.05rem; font-weight: 700; margin-bottom: 8px;">2.3 Information We Deliberately Do NOT Collect</h3>
              <p style="color: #15803d; margin-bottom: 10px;">Because we are an assistance-only platform, we have designed our systems to never collect:</p>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 6px; color: #166534;">
                <li>Credit/debit card numbers, CVV codes, or any payment credentials.</li>
                <li>Full billing addresses or tax identification numbers.</li>
                <li>Government-issued ID numbers (passport, driver’s license, SSN).</li>
                <li>Train account login credentials (username or password).</li>
                <li>Real-time location data (GPS) without your explicit permission.</li>
              </ul>
              <p style="color: #15803d; font-size: 0.9rem; margin-top: 10px; margin-bottom: 0;">
                If any third-party service or advertisement on our site asks for such information, please do not provide it and notify us immediately.
              </p>
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 3 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">3.</span> How We Use Your Information
            </h2>
            <p style="margin-bottom: 10px;">We use the information we collect solely for the purpose of providing Train booking assistance and improving your experience. Specifically:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li><strong>To provide route, schedule, and fare guidance:</strong> Your travel details help us show relevant Train options.</li>
              <li><strong>To walk you through the booking process:</strong> We may use your email to send step-by-step instructions or links to the correct Train page.</li>
              <li><strong>To answer your questions:</strong> If you contact us for assistance, we use your information to respond.</li>
              <li><strong>To improve our assistance tools:</strong> Aggregated usage data helps us identify which features are most useful and which need improvement.</li>
              <li><strong>To send service-related communications:</strong> With your consent, we may send you updates about Train promotions, new routes, or changes to our assistance services. You can opt out anytime.</li>
              <li><strong>To comply with legal obligations:</strong> If required by law, we may disclose limited information to authorities (see Section 6).</li>
            </ul>
            <p>We do not use your information for automated decision-making, credit scoring, or any form of profiling that affects your legal rights.</p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 4 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">4.</span> How We Share Your Information
            </h2>
            <p style="margin-bottom: 10px;">Because we do not sell tickets, we have very few reasons to share your data. However, in limited circumstances, we may share information with:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
              <li><strong>Service providers:</strong> We use third-party tools for analytics (e.g., Google Analytics), email delivery (e.g., Mailchimp or similar), and live chat support. These providers only receive the minimum data necessary to perform their functions and are contractually prohibited from selling or misusing your data.</li>
              <li><strong>Legal authorities:</strong> If we believe disclosure is necessary to comply with a law, regulation, court order, or government request, or to protect the rights, property, or safety of <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a>, our users, or others.</li>
              <li><strong>Business transfers:</strong> If <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> is ever acquired, merged, or sold, your data may be transferred to the new owner. We will notify you via email or a prominent notice on our site before any such transfer, and the new owner must honor this Privacy Policy.</li>
            </ul>
            <p style="font-weight: 600; color: var(--text-main); margin-bottom: 14px;">We never sell your personal information to advertisers, data brokers, or any other third parties.</p>
            
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: var(--radius-sm); padding: 16px 20px; color: #1e40af;">
              <h4 style="font-size: 0.98rem; font-weight: 700; margin-bottom: 6px;">Special Note About Train</h4>
              <p style="margin: 0; font-size: 0.92rem;">
                We do not automatically share your information with Train. When we assist you in booking, you will be redirected to <a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: 600; text-decoration: underline;">Train.com (Amtrak)</a> or the official Train app. At that point, Train’s own privacy policy applies. We recommend reading Train’s privacy policy before completing your purchase.
              </p>
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 5 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">5.</span> Cookies & Tracking Technologies
            </h2>
            <p style="margin-bottom: 10px;">We use cookies to:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li>Remember your recent search queries (so you don’t have to re-enter them).</li>
              <li>Analyze site traffic and user behavior (anonymously).</li>
              <li>Detect and prevent fraud or abuse.</li>
            </ul>
            <p style="margin-bottom: 10px;">
              You can disable cookies through your browser settings. However, please note that some assistance features (like saving your travel preferences) may not work properly without cookies.
            </p>
            <p>We do not use cookies for cross-site tracking, retargeting ads based on your travel searches, or any form of behavioral advertising without your explicit consent.</p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 6 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">6.</span> Data Retention
            </h2>
            <p style="margin-bottom: 10px;">We retain your personal information only as long as reasonably necessary to provide our assistance services or to comply with legal obligations.</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li><strong>Travel search data</strong> (without identifying information) may be kept in aggregated form indefinitely for analytical purposes.</li>
              <li><strong>Email addresses</strong> for non-account users who ask a single question are deleted after 90 days if no further interaction occurs.</li>
              <li><strong>User account data</strong> (if you create an account) is retained until you delete your account or request deletion.</li>
              <li><strong>Support chat logs</strong> are retained for 12 months to help resolve repeat issues.</li>
            </ul>
            <p>You may request deletion of your data at any time (see Section 10 and Section 11).</p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 7 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">7.</span> Data Security
            </h2>
            <p style="margin-bottom: 10px;">We take data security seriously, even though we do not store sensitive financial information. Our security measures include:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li><strong>Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS (SSL) technology.</li>
              <li><strong>Access controls:</strong> Only authorized personnel can access user data, and only for legitimate assistance purposes.</li>
              <li><strong>Regular audits:</strong> We review our systems for vulnerabilities and apply security patches promptly.</li>
              <li><strong>Minimization:</strong> We collect only the data absolutely necessary for our assistance role.</li>
            </ul>
            <p>
              However, no internet transmission is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. You use <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> at your own risk.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 8 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">8.</span> Children’s Privacy
            </h2>
            <p style="margin-bottom: 10px;">
              <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a> (${SITE_CONFIG.WEBSITE_URL}) is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately, and we will delete it.
            </p>
            <p>
              Train tickets for minors can only be booked by an adult. Our assistance services are designed for adults (18+). If you are between 13 and 18, please use our site only with parental or guardian supervision.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 9 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">9.</span> Third-Party Links & Affiliate Disclaimer
            </h2>
            <p style="margin-bottom: 10px;">Our Website may contain links to third-party websites, including:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
              <li><a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-call); text-decoration: underline;">Amtrak.com</a> (the official booking site)</li>
              <li>Trusted travel resources (e.g., station information, accessibility guides)</li>
              <li>Optional affiliate partners (e.g., travel insurance providers, hotel booking sites)</li>
            </ul>
            <p style="margin-bottom: 12px;">
              We are not responsible for the privacy practices of these third parties. Once you leave <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 600;">${SITE_CONFIG.BRAND_NAME}</a>, this Privacy Policy no longer applies. We encourage you to read the privacy policies of any external websites you visit.
            </p>
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 14px 18px; font-size: 0.92rem;">
              <strong>Affiliate Disclosure:</strong> Occasionally, we may earn a small commission if you click on a link to a non-ticketing product (e.g., luggage, travel insurance) and make a purchase. This does not affect our assistance recommendations, and we never receive commissions from Train ticket sales.
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 10 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">10.</span> Your Rights & Choices
            </h2>
            <p style="margin-bottom: 10px;">Depending on your location (e.g., California residents under CCPA, EU residents under GDPR), you may have certain rights regarding your personal information:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
              <li><strong>Right to access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Right to correction:</strong> Correct inaccurate or incomplete information.</li>
              <li><strong>Right to deletion:</strong> Request deletion of your data (subject to legal exceptions).</li>
              <li><strong>Right to opt-out of data collection:</strong> Disable cookies via browser settings or request that we stop certain types of data processing.</li>
              <li><strong>Right to data portability:</strong> Receive your data in a structured, machine-readable format.</li>
            </ul>
            <p style="margin-bottom: 12px;">
              To exercise any of these rights, please contact us via the information in Section 11. We will respond within 30 days.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <p style="margin: 0;"><strong>California residents:</strong> Under the California Consumer Privacy Act (CCPA), we do not “sell” your personal information as defined by California law. You have the right to opt out of any future “sales” – but since we sell nothing, there is nothing to opt out of.</p>
              <p style="margin: 0;"><strong>EU residents:</strong> Under the General Data Protection Regulation (GDPR), our lawful bases for processing your data are (1) your consent, (2) performance of a service (assistance), and (3) legitimate interests (improving our site). You may withdraw consent at any time.</p>
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Section 11 -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--accent-call);">11.</span> Contact Us & Privacy Inquiries
            </h2>
            <p style="margin-bottom: 14px;">
              If you have any questions regarding this Privacy Policy, wish to exercise your data protection rights, or need assistance, please contact our privacy compliance department:
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
                  <strong style="color: var(--text-main);">Privacy & Support Email:</strong><br>
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
