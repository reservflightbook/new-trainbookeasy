/**
 * Master Application Entrypoint
 * 
 * Sets up client-side hash routing, pre-loads the Amtrak GTFS station database,
 * manages search state, integrates Google Ads tracking, and controls mobile sticky CTA bar.
 */

import { SITE_CONFIG } from "../config/site.js";
import { loadStations } from "../services/stationSearch.js";
import { searchTrains, TRAIN_SEARCH_STATUS } from "../services/trainSearch.js";
import { trackConversion, trackEvent } from "../utils/analytics.js";

// Components
import { renderHeader, initHeader } from "../components/Header/Header.js";
import { renderFooter, initFooter } from "../components/Footer/Footer.js";
import { TrainSearchForm } from "../components/TrainSearchForm/TrainSearchForm.js";
import { renderSearchLoading } from "../components/SearchLoading/SearchLoading.js";
import { renderUnavailableState, initUnavailableState } from "../components/UnavailableState/UnavailableState.js";
import { renderSearchResults, initSearchResults } from "../components/SearchResults/SearchResults.js";
import { StationDirectory } from "../components/StationDirectory/StationDirectory.js";
import { initPopularRoutes } from "../components/PopularRoutes/PopularRoutes.js";
import { initCallNowSection } from "../components/CallNowCTA/CallNowCTA.js";
import { initFAQ } from "../components/FAQ/FAQ.js";

// Pages
import { renderHomePage } from "../pages/Home.js";
import { renderRoutesPage, initRoutesPage } from "../pages/RoutesPage.js";
import { renderStationsPage, initStationsPage } from "../pages/StationsPage.js";
import { renderAboutPage } from "../pages/AboutPage.js";
import { renderContactPage, initContactPage } from "../pages/ContactPage.js";
import { renderFAQPage, initFAQPage } from "../pages/FAQPage.js";
import { renderPrivacyPolicyPage } from "../pages/PrivacyPolicyPage.js";
import { renderTermsPage } from "../pages/TermsPage.js";
import { renderRefundPage } from "../pages/RefundPage.js";
import { renderDisclaimerPage } from "../pages/DisclaimerPage.js";

class App {
  constructor() {
    this.appMount = document.getElementById("app");
    this.currentRoute = "home";
    this.searchFormInstance = null;
    this.stations = [];
  }

  async init() {
    this.renderShell();
    
    // Load GTFS Stations dataset in background
    try {
      this.stations = await loadStations();
      console.log(`[TrainBookEasy] Loaded ${this.stations.length} official GTFS rail stations.`);
    } catch (err) {
      console.error("[TrainBookEasy] Failed to load stations:", err);
    }

    // Setup Routing
    window.addEventListener("hashchange", () => this.handleRoute());
    this.handleRoute();

    // Setup Global Link Interceptor (for data-route links)
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-route]");
      if (link) {
        e.preventDefault();
        const route = link.dataset.route;
        window.location.hash = route;
      }
    });

    // Setup Mobile Sticky CTA Bar
    this.initMobileStickyBar();
  }

  renderShell() {
    this.appMount.innerHTML = `
      ${renderHeader()}
      <main id="mainContent"></main>
      ${renderFooter()}
      
      <!-- Mobile Sticky Bottom CTA Bar (Only Call Now) -->
      <div class="mobile-sticky-bar">
        <a href="${SITE_CONFIG.PHONE_HREF}" class="mobile-sticky-call-btn" id="mobileStickyCallBtn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Rail Specialist: ${SITE_CONFIG.PHONE_NUMBER}</span>
        </a>
      </div>
    `;

    initHeader();
    initFooter();
  }

  initMobileStickyBar() {
    const callBtn = document.getElementById("mobileStickyCallBtn");
    if (callBtn) {
      callBtn.addEventListener("click", () => {
        trackConversion("call_now", { location: "mobile_sticky_bar" });
      });
    }
  }

  focusSearchInput() {
    const card = document.getElementById("trainSearchCard");
    const input = document.getElementById("fromStationInput");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (input) {
      setTimeout(() => input.focus(), 300);
    }
  }

  handleRoute() {
    const rawHash = window.location.hash.replace(/^#/, "");
    this.currentRoute = rawHash || "home";

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.route === this.currentRoute);
    });

    const main = document.getElementById("mainContent");
    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (this.currentRoute) {
      case "home":
        this.renderHome(main);
        break;
      case "routes":
        main.innerHTML = renderRoutesPage();
        initRoutesPage((fromId, toId) => this.navigateWithRoute(fromId, toId));
        break;
      case "stations":
        main.innerHTML = renderStationsPage();
        initStationsPage((station) => this.navigateWithStation(station));
        break;
      case "how-it-works":
        // Render Home page and smoothly scroll to how it works section
        this.renderHome(main);
        setTimeout(() => {
          const el = document.getElementById("howItWorksSection");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
        break;
      case "support":
      case "contact":
        main.innerHTML = renderContactPage();
        initContactPage();
        break;
      case "about":
        main.innerHTML = renderAboutPage();
        break;
      case "faq":
        main.innerHTML = renderFAQPage();
        initFAQPage();
        break;
      case "privacy-policy":
        main.innerHTML = renderPrivacyPolicyPage();
        break;
      case "terms-and-conditions":
        main.innerHTML = renderTermsPage();
        break;
      case "refund-cancellation":
        main.innerHTML = renderRefundPage();
        break;
      case "disclaimer":
        main.innerHTML = renderDisclaimerPage();
        break;
      default:
        this.renderHome(main);
    }
  }

  renderHome(container) {
    container.innerHTML = renderHomePage();

    // Mount Train Search Form
    const searchMount = document.getElementById("heroSearchMount");
    if (searchMount) {
      this.searchFormInstance = new TrainSearchForm(searchMount, (searchParams) => {
        this.executeSearch(searchParams);
      });
    }

    // Mount Station Directory
    const dirMount = document.getElementById("homeStationDirectoryMount");
    if (dirMount) {
      new StationDirectory(dirMount, (station) => {
        this.navigateWithStation(station);
      });
    }

    // Init Popular Routes click handlers
    initPopularRoutes((fromId, toId) => {
      this.navigateWithRoute(fromId, toId);
    });

    // Init Call Now and FAQ components
    initCallNowSection();
    initFAQ();
  }

  navigateWithRoute(fromId, toId) {
    if (this.currentRoute !== "home") {
      window.location.hash = "home";
      setTimeout(() => {
        if (this.searchFormInstance) {
          this.searchFormInstance.setRoute(fromId, toId);
        }
      }, 200);
    } else {
      if (this.searchFormInstance) {
        this.searchFormInstance.setRoute(fromId, toId);
      }
    }
  }

  navigateWithStation(station) {
    if (this.currentRoute !== "home") {
      window.location.hash = "home";
      setTimeout(() => {
        if (this.searchFormInstance) {
          this.searchFormInstance.fromAutocomplete.setStation(station);
          this.searchFormInstance.originStation = station;
          this.focusSearchInput();
        }
      }, 200);
    } else {
      if (this.searchFormInstance) {
        this.searchFormInstance.fromAutocomplete.setStation(station);
        this.searchFormInstance.originStation = station;
        this.focusSearchInput();
      }
    }
  }

  async executeSearch(params) {
    const loadingMount = document.getElementById("searchLoadingMount");
    const resultsMount = document.getElementById("searchResultsMount");

    if (!loadingMount || !resultsMount) return;

    // Reset previous results
    resultsMount.innerHTML = "";
    
    // Show Loading state
    loadingMount.innerHTML = renderSearchLoading({
      originName: params.originStation.stop_name,
      destName: params.destinationStation.stop_name,
      departureDate: params.departureDate
    });
    loadingMount.scrollIntoView({ behavior: "smooth", block: "center" });

    // Call Train Search service
    const searchResponse = await searchTrains({
      originStationId: params.originStation.stop_id,
      destinationStationId: params.destinationStation.stop_id,
      departureDate: params.departureDate,
      passengers: params.passengers
    });

    // Remove loading
    loadingMount.innerHTML = "";

    // Render Response State
    if (searchResponse.status === TRAIN_SEARCH_STATUS.AVAILABLE) {
      trackEvent("search_success", {
        origin: params.originStation.stop_id,
        destination: params.destinationStation.stop_id
      });

      resultsMount.innerHTML = renderSearchResults({
        originStation: params.originStation,
        destinationStation: params.destinationStation,
        departureDate: params.departureDate,
        results: searchResponse.results
      });
      initSearchResults();
    } else {
      trackEvent("search_unavailable", {
        origin: params.originStation.stop_id,
        destination: params.destinationStation.stop_id
      });

      resultsMount.innerHTML = renderUnavailableState({
        originName: params.originStation.stop_name,
        destName: params.destinationStation.stop_name,
        departureDate: params.departureDate
      });

      initUnavailableState(() => {
        resultsMount.innerHTML = "";
        this.focusSearchInput();
      });
    }

    resultsMount.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Boot application reliably whether DOM is loading or already parsed
function bootApp() {
  const app = new App();
  app.init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootApp);
} else {
  bootApp();
}
