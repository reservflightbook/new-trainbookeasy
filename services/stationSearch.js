/**
 * Station Search Service
 * 
 * High-performance, zero-latency local search and autocomplete over the
 * official Amtrak GTFS station database (645 verified rail stations).
 * 
 * Implements strict hierarchical ranking:
 * 1. Exact station-name match
 * 2. Station name starts with query
 * 3. City starts with query
 * 4. Station name contains query
 * 5. City contains query
 * 6. State match
 */

let stationsCache = null;
let isLoading = false;
let loadPromise = null;

/**
 * Initializes and caches the station dataset
 */
export async function loadStations() {
  if (stationsCache) return stationsCache;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const response = await fetch('./data/stations.json');
      if (!response.ok) {
        throw new Error(`Failed to load stations dataset: ${response.statusText}`);
      }
      const data = await response.json();
      stationsCache = data.stations || [];
      return stationsCache;
    } catch (err) {
      console.error('Error loading stations:', err);
      stationsCache = [];
      return [];
    } finally {
      loadPromise = null;
    }
  })();

  return loadPromise;
}

/**
 * Searches stations based on user query with strict 6-tier ranking
 * 
 * @param {string} query - Raw user search input
 * @param {number} maxResults - Max suggestions (defaults to 10)
 * @returns {Array} Ranked list of matching station objects
 */
export function searchStations(query, maxResults = 10) {
  if (!stationsCache || !query) return [];

  const cleanQuery = query.trim().toLowerCase();
  if (cleanQuery.length === 0) return [];

  const exactMatch = [];
  const nameStartsWith = [];
  const cityStartsWith = [];
  const nameContains = [];
  const cityContains = [];
  const stateMatch = [];
  const codeMatch = [];

  const seenIds = new Set();

  for (let i = 0; i < stationsCache.length; i++) {
    const s = stationsCache[i];
    const nameLower = (s.stop_name || '').toLowerCase();
    const cityLower = (s.city || '').toLowerCase();
    const stateLower = (s.state || '').toLowerCase();
    const codeLower = (s.stop_id || '').toLowerCase();

    // 0. Exact 3-letter station code match (e.g. "NYP", "WAS")
    if (codeLower === cleanQuery) {
      codeMatch.push(s);
      seenIds.add(s.stop_id);
      continue;
    }

    // 1. Exact station-name match
    if (nameLower === cleanQuery) {
      exactMatch.push(s);
      seenIds.add(s.stop_id);
      continue;
    }

    // 2. Station name starts with query
    if (nameLower.startsWith(cleanQuery)) {
      if (!seenIds.has(s.stop_id)) {
        nameStartsWith.push(s);
        seenIds.add(s.stop_id);
      }
      continue;
    }

    // 3. City starts with query (e.g. "New Yo" -> New York)
    if (cityLower.startsWith(cleanQuery)) {
      if (!seenIds.has(s.stop_id)) {
        cityStartsWith.push(s);
        seenIds.add(s.stop_id);
      }
      continue;
    }

    // 4. Station name contains query or alias match
    const aliasMatches = (s.aliases || []).some(a => a.toLowerCase().includes(cleanQuery));
    if (nameLower.includes(cleanQuery) || aliasMatches) {
      if (!seenIds.has(s.stop_id)) {
        nameContains.push(s);
        seenIds.add(s.stop_id);
      }
      continue;
    }

    // 5. City contains query
    if (cityLower.includes(cleanQuery)) {
      if (!seenIds.has(s.stop_id)) {
        cityContains.push(s);
        seenIds.add(s.stop_id);
      }
      continue;
    }

    // 6. State match (e.g. "NY", "PA", "California")
    if (stateLower === cleanQuery || (cleanQuery.length > 2 && stateLower.includes(cleanQuery))) {
      if (!seenIds.has(s.stop_id)) {
        stateMatch.push(s);
        seenIds.add(s.stop_id);
      }
    }
  }

  // Combine results in strict order
  const combined = [
    ...codeMatch,
    ...exactMatch,
    ...nameStartsWith,
    ...cityStartsWith,
    ...nameContains,
    ...cityContains,
    ...stateMatch
  ];

  return combined.slice(0, maxResults);
}

/**
 * Retrieves a station by its GTFS stop_id
 */
export function getStationById(stopId) {
  if (!stationsCache || !stopId) return null;
  return stationsCache.find(s => s.stop_id.toUpperCase() === stopId.toUpperCase()) || null;
}

/**
 * Returns all stations cached in memory
 */
export function getAllStations() {
  return stationsCache || [];
}
