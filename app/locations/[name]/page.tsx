import BackButton from '@/app/components/BackButton'
import ErrorDisplayReload from '@/app/components/ErrorDisplayReload'
import LocationDetailView from '@/app/components/LocationDetailView'

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
          <ErrorDisplayReload error={`Location "${name}" not found or could not be loaded.`} />
        </div>
      </div>
    )
  }

  return <LocationDetailView location={location} areas={validAreas} />
}
