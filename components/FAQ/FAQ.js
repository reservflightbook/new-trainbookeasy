/**
 * FAQ Component
 * 
 * Interactive FAQ accordion providing policy-compliant, truthful answers
 * about booking assistance, station queries, and independent agency status.
 */

import { SITE_CONFIG } from "../../config/site.js";

export const FAQ_DATA = [
  {
    q: "How do I search for a train route?",
    a: "Enter your departure city or station code in the 'From' field, select your destination in the 'To' field, choose your travel date, and select passenger count. Click 'Search Trains' to check route availability and connectivity."
  },
  {
    q: "Can I search by station name or station code?",
    a: "Yes. Our search tool supports official Amtrak station names (e.g., 'New York Penn Station', 'Chicago Union Station') as well as standard 3-letter station codes (e.g., NYP, WAS, BOS, CHI, PHL)."
  },
  {
    q: "Can I search by city or state?",
    a: "Yes. You can type any city or state name (e.g., 'San Francisco', 'Philadelphia', 'Florida') to see all passenger train stations located in that area."
  },
  {
    q: "What information do I need to book assistance?",
    a: "To speak with our travel support specialists, please have your desired departure city, destination, target travel dates, number of travelers, and any accessibility or accommodation requests ready."
  },
  {
    q: "Can I speak with a booking representative directly?",
    a: `Yes. You can contact our customer assistance desk directly at <a href="${SITE_CONFIG.PHONE_HREF}" style="color:var(--accent-call); font-weight:700;">${SITE_CONFIG.PHONE_NUMBER}</a>. Our team is available ${SITE_CONFIG.SUPPORT_HOURS.toLowerCase()} to assist travelers.`
  },
  {
    q: "What happens if travel information is unavailable online?",
    a: "When live schedules or digital reservations cannot be retrieved through the web tool, our customer support team can assist via phone to verify current route options, station schedules, or alternative travel dates."
  },
  {
    q: "Are you an official railway company or Amtrak?",
    a: `${SITE_CONFIG.DISCLAIMER}`
  },
  {
    q: "How can I contact support if I don't want to call?",
    a: `You can reach our support team online via our Contact page or by emailing <a href="mailto:${SITE_CONFIG.EMAIL}">${SITE_CONFIG.EMAIL}</a>. We respond to all written inquiries promptly during standard business operations.`
  },
  {
    q: "What are your cancellation and refund policies?",
    a: "Cancellation and refund eligibility depends on the specific fare class, service tier, and carrier terms associated with your ticket. Independent agency service fees may be subject to our terms of service, which are disclosed prior to transaction completion. Please review our Refund / Cancellation page for full details."
  }
];

export function renderFAQ() {
  const itemsHtml = FAQ_DATA.map((item, idx) => `
    <div class="faq-item" id="faqItem-${idx}">
      <button type="button" class="faq-question" data-idx="${idx}" aria-expanded="false">
        <span>${item.q}</span>
        <span class="faq-icon">▾</span>
      </button>
      <div class="faq-answer">
        <p>${item.a}</p>
      </div>
    </div>
  `).join("");

  return `
    <section class="section-wrapper" id="faqSection">
      <div class="container">
        <div class="section-head">
          <h2>Frequently Asked Questions</h2>
          <p>Transparent information regarding train travel search, station data, and phone booking assistance.</p>
        </div>

        <div class="faq-accordion" id="faqAccordion">
          ${itemsHtml}
        </div>
      </div>
    </section>
  `;
}

export function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      const isOpen = parent.classList.contains("open");

      // Close other open items
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("open");
        const qBtn = item.querySelector(".faq-question");
        if (qBtn) qBtn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        parent.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}
