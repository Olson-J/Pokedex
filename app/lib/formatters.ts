export const formatTitleFromSlug = (value: string): string => {
  return value
    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatGenerationName = (value: string): string => {
  const normalized = value.toLowerCase().replace(/\s+/g, '-')

  if (normalized.startsWith('generation-')) {
    const suffix = normalized.replace('generation-', '')
    return `Generation ${suffix.toUpperCase()}`
  }

  if (value.toLowerCase().startsWith('generation ')) {
    const suffix = value.slice('Generation '.length)
    return `Generation ${suffix.toUpperCase()}`
  }

  return formatTitleFromSlug(value)
}

/**
 * Format location name by removing area suffixes and directional indicators
 * Example: "viridian-forest-area" → "Viridian Forest"
 * Example: "kanto-route-2-south-towards-viridian-city" → "Kanto Route 2"
 */
export const formatLocationName = (name: string): string => {
  return name
    .replace(/-area$/, '') // Remove trailing "-area"
    .replace(/-area-\d+$/, '') // Remove trailing "-area-1", "-area-2", etc.
    .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '') // Remove directional suffixes and floor indicators
    .replace(/-(towards|south|north|east|west).*$/i, '') // Remove direction descriptors
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ')
}
