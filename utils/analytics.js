/**
 * Analytics and Google Ads Conversion Tracking Service
 * 
 * Provides privacy-compliant, robust event tracking for Google Analytics 4 (gtag)
 * and Google Ads Conversion Tracking.
 * 
 * Complies with strict privacy standards:
 * - Never transmits Personally Identifiable Information (PII)
 * - Fires conversion tags ONLY upon genuine user action (e.g. Call Now click)
 */

import { SITE_CONFIG } from "../config/site.js";

/**
 * Safe wrapper around window.gtag and dataLayer
 */
export function trackEvent(eventName, eventParams = {}) {
  // Log locally for debugging & transparency
  if (window.DEBUG_ANALYTICS) {
    console.log(`[Analytics Event: ${eventName}]`, eventParams);
  }

  // Push to dataLayer if available
  if (window.dataLayer && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
      timestamp: new Date().toISOString()
    });
  }

  // Google tag (gtag.js)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Fires a Google Ads conversion event
 * 
 * @param {string} conversionType - 'call_now' | 'search_submitted' | 'contact_submitted'
 * @param {Object} metadata - Optional contextual parameters (e.g. route, origin)
 */
export function trackConversion(conversionType, metadata = {}) {
  const adsConfig = SITE_CONFIG.ANALYTICS;

  if (conversionType === "call_now") {
    trackEvent("call_now_clicked", {
      event_category: "Conversion",
      event_label: "Call Now Primary CTA",
      target_phone: SITE_CONFIG.PHONE_NUMBER,
      ...metadata
    });

    if (typeof window.gtag === "function" && adsConfig.CALL_CONVERSION_LABEL) {
      window.gtag("event", "conversion", {
        send_to: `${adsConfig.GOOGLE_ADS_CONVERSION_ID}/${adsConfig.CALL_CONVERSION_LABEL}`,
        value: 1.0,
        currency: "USD"
      });
    }
  } else if (conversionType === "search_submitted") {
    trackEvent("search_submitted", {
      event_category: "Engagement",
      event_label: "Train Search Form",
      ...metadata
    });
  } else if (conversionType === "contact_submitted") {
    trackEvent("contact_form_submitted", {
      event_category: "Lead",
      event_label: "Contact Inquiry Form",
      ...metadata
    });
  }
}
