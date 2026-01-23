const API_BASE = 'https://pokeapi.co/api/v2'

interface FetchOptions {
  limit?: number
  offset?: number
}

/**
 * Helper function to handle PokeAPI fetch requests with error handling
 */
async function fetchFromPokeAPI(url: string) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch from PokeAPI: ${url}`, error)
    throw error
  }
}

/**
 * Fetch list of Pokemon with pagination
 */
export async function getPokemonList(options: FetchOptions = {}) {
  const { limit = 20, offset = 0 } = options
  const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch details for a specific Pokemon
 */
export async function getPokemonDetail(nameOrId: string | number) {
  const url = `${API_BASE}/pokemon/${nameOrId}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch list of Locations with pagination
 */
export async function getLocationsList(options: FetchOptions = {}) {
  const { limit = 20, offset = 0 } = options
  const url = `${API_BASE}/location?limit=${limit}&offset=${offset}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch details for a specific Location
 */
export async function getLocationDetail(nameOrId: string | number) {
  const url = `${API_BASE}/location/${nameOrId}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch list of Moves with pagination
 */
export async function getMovesList(options: FetchOptions = {}) {
  const { limit = 20, offset = 0 } = options
  const url = `${API_BASE}/move?limit=${limit}&offset=${offset}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch details for a specific Move
 */
export async function getMoveDetail(nameOrId: string | number) {
  const url = `${API_BASE}/move/${nameOrId}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch list of Generations with pagination
 */
export async function getGenerationsList(options: FetchOptions = {}) {
  const { limit = 20, offset = 0 } = options
  const url = `${API_BASE}/generation?limit=${limit}&offset=${offset}`
  return fetchFromPokeAPI(url)
}

/**
 * Fetch details for a specific Generation
 */
export async function getGenerationDetail(nameOrId: string | number) {
  const url = `${API_BASE}/generation/${nameOrId}`
  return fetchFromPokeAPI(url)
}
