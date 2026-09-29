/**
 * About Us Page Component
 * 
 * Accurately describes the mission, assistance-only model, and passenger advocacy
 * of Train Book Easy, operated by Train Book Easy LLC.
 */

import { SITE_CONFIG } from "../config/site.js";

export function renderAboutPage() {
  return `
    <div class="page-about">
      <div class="container section-wrapper" style="max-width: 920px; padding-top: 32px; padding-bottom: 64px;">
        
        <!-- Header -->
        <div class="section-head" style="text-align: left; margin-bottom: 28px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(23,127,166,0.08); color: var(--accent-call); padding: 4px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 700; margin-bottom: 12px; border: 1px solid rgba(23,127,166,0.2);">
            <i class="fa-solid fa-compass"></i> Independent Rail Assistance & Traveler Advocacy
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px; letter-spacing: -0.02em;">About ${SITE_CONFIG.BRAND_NAME}</h1>
          <p style="color: var(--text-muted); font-size: 0.98rem;">Your trusted travel assistance partner for Train train travel across the United States.</p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-lg); padding: 40px; line-height: 1.8; color: var(--text-secondary); display: flex; flex-direction: column; gap: 32px; box-shadow: var(--shadow-sm);">
          
          <!-- Welcome / Intro Box -->
          <div style="background: #f8fafc; border-left: 4px solid var(--accent-call); padding: 22px 26px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 1.02rem; color: var(--text-main);">
            <p style="margin-bottom: 14px;">
              Welcome to <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 700; text-decoration: none;">${SITE_CONFIG.BRAND_NAME}</a> (${SITE_CONFIG.WEBSITE_URL}) – your trusted travel assistance partner for Train train travel across the United States. We understand that planning a journey by rail can sometimes feel complicated, especially when you are trying to find the best routes, compare schedules, or understand fare options. That is precisely why <strong>${SITE_CONFIG.BRAND_NAME}</strong> was created: not to replace Train, but to make your experience of booking through Train smoother, clearer, and more confident.
            </p>
            <p style="margin: 0;">
              Before we go any further, let us make one thing absolutely transparent: <strong>${SITE_CONFIG.BRAND_NAME} does not sell tickets, issue reservations, or function as a ticketing agent for Train or any other rail carrier</strong>. We are an independent assistance platform. Our role is to guide you, inform you, and help you navigate Train’s official systems so that you can make a booking directly with Train or its authorized channels. Think of us as your knowledgeable travel companion – someone who explains the process, highlights the best deals, and answers your questions – but never takes your payment for a ticket.
            </p>
          </div>

          <!-- Who We Are -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-users"></i></span> Who We Are
            </h2>
            <p style="margin-bottom: 14px;">
              We are a dedicated team of travel enthusiasts, frequent train riders, and customer support professionals who noticed a recurring problem: many travelers, especially first-time train passengers or seniors, found Train’s booking process overwhelming. They struggled to understand the difference between Saver, Value, Flexible, and Premium fares. They were confused by multi-city bookings, rail pass options, or how to apply discounts like AAA, NARP, or senior fares. Some simply wanted a human-like guide to walk them through each step without having to call a customer service center and wait on hold.
            </p>
            <div style="background: rgba(23,127,166,0.05); border: 1px solid rgba(23,127,166,0.15); border-radius: var(--radius-sm); padding: 18px 22px; margin-bottom: 14px;">
              <p style="margin: 0; color: var(--text-main);">
                <strong>${SITE_CONFIG.BRAND_NAME}</strong> is proudly operated by <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong>, an organization built around one core mission: helping everyday travelers navigate complex booking systems with clarity and confidence. <strong>${SITE_CONFIG.LEGAL_BUSINESS_NAME}</strong> oversees <strong>${SITE_CONFIG.BRAND_NAME}</strong>’s operations, content accuracy, and customer assistance standards, ensuring that every piece of guidance we offer meets a consistent standard of transparency and reliability.
              </p>
            </div>
            <p style="margin: 0;">
              That gap inspired the creation of <strong>${SITE_CONFIG.BRAND_NAME}</strong>. We built a clean, easy-to-use assistance interface where you can search for routes, view approximate fare estimates, and understand step-by-step what you need to do to complete your reservation on Train’s official website or mobile app. We are not here to take over the transaction – we are here to make sure you feel empowered and informed before you click “purchase.”
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- What We Actually Do (Our Assistance Model) -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-list-check"></i></span> What We Actually Do (Our Assistance Model)
            </h2>
            <p style="margin-bottom: 16px;">
              Because we do not provide direct booking, you might wonder: what exactly does <strong>${SITE_CONFIG.BRAND_NAME}</strong> offer? Here is a detailed breakdown:
            </p>

            <div style="display: grid; grid-template-columns: 1fr; gap: 16px;">
              
              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-route" style="color: var(--accent-call);"></i> Route & Schedule Assistance
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  We help you identify Train routes between thousands of city pairs – from the busy Northeast Corridor (NYC to DC, Boston to Philadelphia) to long-distance scenic journeys like the California Zephyr, Empire Builder, or Coast Starlight. Our system provides estimated travel times, frequency of service, and station information.
                </p>
              </div>

              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-tags" style="color: var(--accent-call);"></i> Fare Guidance & Comparison
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  Train fares fluctuate based on demand, booking window, and seat type. We explain how different fare classes work, when to book for the lowest prices, and how to spot promotions like “BOGO” (buy one get one) or seasonal discounts. We also help you compare coach vs. business vs. sleeper accommodations.
                </p>
              </div>

              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-percent" style="color: var(--accent-call);"></i> Discount & Rail Pass Assistance
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  Many travelers leave money on the table because they do not know which discounts apply to them. We assist you in checking eligibility for military, student, senior (65+), children (2–12), and group discounts. For frequent travelers, we explain the Train USA Rail Pass – how it works, how to reserve legs, and common pitfalls to avoid.
                </p>
              </div>

              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-shoe-prints" style="color: var(--accent-call);"></i> Step-by-Step Booking Walkthrough
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  Once we have helped you find the right train and fare, we provide a visual, text-based, or phone-assisted walkthrough of exactly how to complete your purchase on <a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-call); text-decoration: underline; font-weight: 600;">Amtrak.com</a> or via Train’s official call center. We will show you where to enter your discount codes, how to choose seats (where available), and how to avoid hidden third-party cancellation fees.
                </p>
              </div>

              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-suitcase-rolling" style="color: var(--accent-call);"></i> Pre- & Post-Booking Support
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  Questions about baggage policies (carry-on vs checked), pet policy, accessibility services, or changes/cancellations? We provide up-to-date summaries of Train’s rules. If you need to modify a reservation, we explain how to do that directly with Train without paying unnecessary change fees.
                </p>
              </div>

              <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 18px 22px;">
                <h3 style="color: var(--text-main); font-size: 1.05rem; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-circle-question" style="color: var(--accent-call);"></i> Problem-Solving Assistance
                </h3>
                <p style="margin: 0; font-size: 0.95rem;">
                  Missed a connection because of a delay? Unsure how to claim a travel credit? Confused about eTicketing vs. printed tickets? Our assistance includes troubleshooting these common issues and directing you to the correct Train department.
                </p>
              </div>

            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- What We Do NOT Do (Very Important) -->
          <section>
            <div style="background: #fef2f2; border: 1px solid #fee2e2; border-radius: var(--radius-md); padding: 24px 28px;">
              <h2 style="color: #991b1b; font-size: 1.25rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-triangle-exclamation"></i> What We Do NOT Do (Very Important)
              </h2>
              <p style="color: #7f1d1d; margin-bottom: 12px;">To avoid any misunderstanding, let us repeat:</p>
              <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; color: #7f1d1d; margin-bottom: 14px;">
                <li>We do NOT take any booking payment.</li>
                <li>We do NOT hold inventory of Train tickets.</li>
                <li>We do NOT issue refunds or process cancellations – those must be handled by Train directly.</li>
                <li>We are NOT affiliated with, endorsed by, or partnered with Train (National Railroad Passenger Corporation).</li>
                <li>We cannot guarantee specific seat availability or fare lock – those are determined by Train’s real-time inventory.</li>
              </ul>
              <p style="color: #991b1b; font-size: 0.95rem; margin: 0; font-weight: 500;">
                Our service ends at assistance. Once you decide to purchase, you will be redirected or instructed to use Train’s secure payment gateway. This protects you from overcharges and ensures you receive Train’s full cancellation and modification rights.
              </p>
            </div>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Why We Built Train Book Easy as an “Assist” Platform -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-handshake"></i></span> Why We Built ${SITE_CONFIG.BRAND_NAME} as an “Assist” Platform
            </h2>
            <p style="margin-bottom: 14px;">
              You might ask: why not just build a booking site like many other online travel agencies (OTAs)? The answer is trust and transparency. Many third-party booking sites sell Train tickets but then leave customers stranded when something goes wrong – a train is canceled, a schedule changes, or a refund is needed. Because those OTAs are not Train, passengers face finger-pointing and long resolution times.
            </p>
            <p style="margin: 0;">
              By offering assistance only, we free ourselves from the conflict of interest that comes with taking your money. Our goal is simply to help you complete a successful transaction directly with Train. If something goes wrong, you deal with Train – the party that actually has the power to fix the problem. This model reduces your risk and keeps our advice honest. We will never steer you toward a more expensive train because we earn a commission – because we do not earn any commission from ticket sales. Instead, we may earn revenue through optional donations, small subscription fees for premium assistance (clearly disclosed), or affiliate relationships for travel insurance or other non-ticketing products.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Our Commitment to Accuracy -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-bullseye"></i></span> Our Commitment to Accuracy
            </h2>
            <p style="margin-bottom: 14px;">
              The Train system changes – new routes launch, schedules adjust, and promotions appear and disappear. We manually and algorithmically monitor Train’s public data to keep our assistance information as current as possible. However, because we are not the official source, we always include a disclaimer: always verify final schedules, fares, and policies on <a href="https://amtrak.com/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-call); text-decoration: underline; font-weight: 600;">Amtrak.com</a> before purchasing. Consider us a starting point, not the final authority.
            </p>
            <p style="margin: 0;">
              If you ever notice outdated or incorrect information on <strong>${SITE_CONFIG.BRAND_NAME}</strong>, please contact us immediately. We treat corrections as a top priority.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Privacy & Security Promise -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-shield-halved"></i></span> Privacy & Security Promise
            </h2>
            <p style="margin: 0;">
              Since we never handle your payment details or full legal name during the booking process, we collect very limited personal data. We may ask for your travel dates, departure city, destination, and number of passengers to provide accurate assistance. We do not store credit card numbers, billing addresses, or government IDs. We also do not sell your search data to third parties. For users who create an account (optional), we store only your email and saved travel preferences. You can delete your data anytime.
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Who Should Use Train Book Easy? -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-user-check"></i></span> Who Should Use ${SITE_CONFIG.BRAND_NAME}?
            </h2>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 0;">
              <li><strong>First-time Train travelers</strong> who feel nervous about online booking.</li>
              <li><strong>Seniors and digitally less confident users</strong> who want a guided, no-pressure explanation.</li>
              <li><strong>Budget-conscious travelers</strong> trying to find the lowest possible Train fares without spending hours searching.</li>
              <li><strong>Families and groups</strong> who need help understanding baggage, seating, and ticket rules.</li>
              <li><strong>International visitors</strong> unfamiliar with the US rail system.</li>
              <li><strong>Any Train rider</strong> who wants a second opinion before clicking “buy.”</li>
            </ul>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Our Future Vision -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-eye"></i></span> Our Future Vision
            </h2>
            <p style="margin-bottom: 10px;">We are continuously improving <strong>${SITE_CONFIG.BRAND_NAME}</strong> (${SITE_CONFIG.WEBSITE_URL}). Soon, we plan to add:</p>
            <ul style="padding-left: 24px; display: flex; flex-direction: column; gap: 8px; margin-bottom: 0;">
              <li>Live phone and chat assistance with real travel specialists for complex itineraries.</li>
              <li>Interactive walkthroughs of the Train booking process.</li>
              <li>Alerts for fare drops and discount promotions on specific routes.</li>
              <li>Accessibility-focused guides for travelers with disabilities using passenger rail.</li>
            </ul>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Final Words – And a Friendly Reminder -->
          <section>
            <h2 style="color: var(--text-main); font-size: 1.35rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;">
              <span style="color: var(--accent-call);"><i class="fa-solid fa-heart"></i></span> Final Words – And a Friendly Reminder
            </h2>
            <p style="margin-bottom: 14px;">
              Thank you for visiting <a href="${SITE_CONFIG.WEBSITE_URL}" style="color: var(--accent-call); font-weight: 700;">${SITE_CONFIG.BRAND_NAME}</a>. We truly love train travel – the comfort, the scenery, and the freedom from traffic and airport security lines. We built this site because we believe everyone deserves to enjoy passenger trains without booking stress. Remember: <strong>we assist, we guide, we explain – but we do not book</strong>. Your ticket will always come directly from Train, and that is by design, for your safety and peace of mind.
            </p>
            <p style="margin: 0;">
              If you have any questions or feedback, please reach out through our contact page or call our assistance desk directly. Now, let’s find you the perfect train journey!
            </p>
          </section>

          <hr style="border: 0; border-top: 1px solid var(--border-light); margin: 0;">

          <!-- Contact & Corporate Card -->
          <section>
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); padding: 24px 28px; border-radius: var(--radius-md); display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px;">
              <div>
                <div style="font-weight: 800; color: var(--text-main); font-size: 1.15rem; margin-bottom: 4px;">${SITE_CONFIG.LEGAL_BUSINESS_NAME}</div>
                <div style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 12px;">Operating ${SITE_CONFIG.BRAND_NAME}</div>
                <div style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
                  <i class="fa-solid fa-location-dot" style="color: var(--accent-call); margin-right: 6px;"></i> ${SITE_CONFIG.BUSINESS_ADDRESS.formatted}
                </div>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.92rem;">
                <div>
                  <strong style="color: var(--text-main);">Toll-Free Rail Assistance (TFN):</strong><br>
                  <a href="${SITE_CONFIG.PHONE_HREF}" style="color: var(--accent-call); font-weight: 800; font-size: 1.1rem; text-decoration: none;">
                    <i class="fa-solid fa-phone" style="margin-right: 6px;"></i> ${SITE_CONFIG.PHONE_NUMBER}
                  </a>
                  <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">${SITE_CONFIG.SUPPORT_HOURS}</span>
                </div>
                <div>
                  <strong style="color: var(--text-main);">Secondary Support Line:</strong><br>
                  <a href="tel:18888216270" style="color: var(--text-main); font-weight: 600; text-decoration: none;">
                    ${SITE_CONFIG.SUPPORT_PHONE_ALT}
                  </a>
                </div>
                <div>
                  <strong style="color: var(--text-main);">Customer Support Email:</strong><br>
                  <a href="mailto:${SITE_CONFIG.EMAIL}" style="color: var(--accent-call); font-weight: 600; text-decoration: underline;">
                    <i class="fa-solid fa-envelope" style="margin-right: 6px;"></i> ${SITE_CONFIG.EMAIL}
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
