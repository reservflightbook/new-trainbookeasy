/**
 * Master Site Configuration
 * 
 * Global configuration file for brand name, contact details, legal info,
 * and operational parameters. Values are referenced globally across all
 * UI components, pages, metadata, and structured schema.
 */

export const SITE_CONFIG = {
  // Brand & Legal Identity
  BRAND_NAME: "Train Book Easy",
  LEGAL_BUSINESS_NAME: "Train Book Easy LLC",
  TAGLINE: "BOOK • TRAVEL • REPEAT — Train Travel Information & Booking Assistance",
  LOGO_URL: "assets/images/logo.png",
  
  // Contact & Conversion Phone
  // Formatted for display and tel: URI
  PHONE_NUMBER: "1-888-821-6270",
  PHONE_HREF: "tel:18888216270",
  SUPPORT_PHONE_ALT: "+1-888-821-6270",
  EMAIL: "support@trainbookeasy.com",
  
  // Physical Business Presence
  BUSINESS_ADDRESS: {
    street: "100 Montgomery Street, Suite 1500",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
    country: "United States",
    formatted: "100 Montgomery Street, Suite 1500, San Francisco, CA 94104"
  },
  
  // Operations & Support
  SUPPORT_HOURS: "Monday – Sunday: 24 Hours / 7 Days a Week",
  WEBSITE_URL: "https://www.trainbookeasy.com",
  
  // Mandatory Legal & Regulatory Transparency Disclaimers
  DISCLAIMER: "Train Book Easy is an independent travel information and booking assistance service provider. We are not Amtrak, a government transit agency, or an official rail carrier. We provide route research, station navigation assistance, and ticketing booking support for travelers seeking phone assistance. All rail company names, trademarks, and logos are property of their respective owners and used strictly for factual identification purposes.",
  
  // Google Ads Tracking / Conversion Labels (Configurable via environment or tag manager)
  ANALYTICS: {
    GOOGLE_ANALYTICS_ID: "G-MEASUREMENT-ID",
    GOOGLE_ADS_CONVERSION_ID: "AW-CONVERSION-ID",
    CALL_CONVERSION_LABEL: "CALL-NOW-LABEL",
    SEARCH_CONVERSION_LABEL: "SEARCH-SUBMIT-LABEL"
  }
};
