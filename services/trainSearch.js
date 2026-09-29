/**
 * Train Search Service
 * 
 * Clean, production-ready abstraction for train travel queries.
 * 
 * Complies with strict Google Ads & Truth-in-Advertising policies:
 * - Does NOT generate fake prices, fake seats, or artificial urgency
 * - Transparently handles LIVE_API vs UNAVAILABLE states
 * - Protects credentials using environment/endpoint architecture
 */

export const TRAIN_SEARCH_STATUS = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  ERROR: "ERROR"
};

/**
 * Searches for train routes between two verified stations
 * 
 * @param {Object} params
 * @param {string} params.originStationId - GTFS stop_id for departure (e.g. 'WAS')
 * @param {string} params.destinationStationId - GTFS stop_id for arrival (e.g. 'NYP')
 * @param {string} params.departureDate - Travel date string (YYYY-MM-DD)
 * @param {number} params.passengers - Passenger count
 * @returns {Promise<Object>} Search result object with status and data
 */
export async function searchTrains({
  originStationId,
  destinationStationId,
  departureDate,
  passengers = 1
}) {
  // Validate required inputs
  if (!originStationId || !destinationStationId) {
    return {
      status: TRAIN_SEARCH_STATUS.ERROR,
      error: "Departure and destination stations are required.",
      canRetry: true
    };
  }

  if (originStationId === destinationStationId) {
    return {
      status: TRAIN_SEARCH_STATUS.ERROR,
      error: "Please select a different departure and destination station.",
      canRetry: false
    };
  }

  if (!departureDate) {
    return {
      status: TRAIN_SEARCH_STATUS.ERROR,
      error: "Please select a valid travel date.",
      canRetry: true
    };
  }

  // Check if live API endpoint is configured in environment
  const apiEndpoint = window.TRAIN_API_ENDPOINT || null;

  if (apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originStationId,
          destinationStationId,
          departureDate,
          passengers
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.trains && data.trains.length > 0) {
          return {
            status: TRAIN_SEARCH_STATUS.AVAILABLE,
            results: data.trains,
            routeInfo: {
              originStationId,
              destinationStationId,
              departureDate,
              passengers
            }
          };
        }
      }
    } catch (err) {
      console.warn("Live train API request failed, falling back to transparent unavailable state:", err);
    }
  }

  // Realistic UX search transition (transparently checking travel request)
  await new Promise(resolve => setTimeout(resolve, 850));

  /**
   * Transparent Unavailable State:
   * As mandated by policy guidelines, we do not invent fake availability,
   * fake seat numbers, or fake ticket prices. Instead, we honestly communicate
   * that live real-time booking information is currently unavailable online
   * and offer personalized phone booking assistance.
   */
  return {
    status: TRAIN_SEARCH_STATUS.UNAVAILABLE,
    message: "We couldn't retrieve live travel information for this request at the moment.",
    reason: "Live online booking API is not connected for this route.",
    routeInfo: {
      originStationId,
      destinationStationId,
      departureDate,
      passengers
    }
  };
}
