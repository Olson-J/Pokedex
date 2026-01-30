import Link from 'next/link'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface LocationDetailProps {
  params: Promise<{ name: string }>
}

interface PokemonEncounter {
  pokemon: { name: string; url: string }
}

interface LocationAreaData {
  id: number
  name: string
  pokemon_encounters: PokemonEncounter[]
}

interface LocationAreaSummary {
  name: string
  url: string
}

interface LocationData {
  id: number
  name: string
  region: { name: string; url: string }
  areas: LocationAreaSummary[]
}

// Format location name for display
function formatLocationName(name: string): string {
  return name
    .replace(/-area$/, '') // Remove trailing "-area"
    .replace(/-area-\d+$/, '') // Remove trailing "-area-1", "-area-2", etc.
    .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '') // Remove directional suffixes and floor indicators
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ')
}

function formatSubLocationName(areaName: string, locationName: string): string {
  const baseName = areaName
    .replace(/-area$/, '')
    .replace(/-area-\d+$/, '')
  const prefix = `${locationName}-`
  const trimmedName = baseName.startsWith(prefix) ? baseName.slice(prefix.length) : baseName
  const safeName = trimmedName.length > 0 ? trimmedName : baseName

  return safeName
    .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function getLocationAreaData(url: string): Promise<LocationAreaData | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

async function getLocationData(locationName: string): Promise<LocationData | null> {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/location/${locationName}`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

export default async function LocationDetailPage({
  params,
}: LocationDetailProps) {
  const { name } = await params
  const location = await getLocationData(name)
  const locationAreas = location
    ? await Promise.all(location.areas.map((area) => getLocationAreaData(area.url)))
    : []
  const validAreas = locationAreas.filter((area): area is LocationAreaData => Boolean(area))

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <BackButton />
          </div>
          <ErrorDisplay error={`Location "${name}" not found or could not be loaded.`} onRetry={() => window.location.reload()} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-purple-300 dark:border-purple-700 p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">
              {formatLocationName(location.name)}
            </h1>
            {location && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
                Region: {location.region.name}
              </p>
            )}
          </div>

          {/* Sub Locations */}
          {validAreas.length > 0 ? (
            <div className="space-y-6">
              {validAreas.map((area) => (
                <div key={area.name} className="border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
                    Pokemon found in {formatSubLocationName(area.name, location.name)} ({area.pokemon_encounters.length})
                  </h2>
                  {area.pokemon_encounters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {area.pokemon_encounters.map((encounter) => (
                        <Link
                          key={encounter.pokemon.name}
                          href={`/pokemon/${encounter.pokemon.name}`}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-700 transition-colors"
                        >
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {encounter.pokemon.name.replace(/-/g, ' ')}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No Pokemon encounters recorded for this sub location.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400">
                No sub locations recorded for this location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
