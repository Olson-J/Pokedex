import PokemonDetailView from '@/app/components/PokemonDetailView'

interface PokemonDetailProps {
  params: Promise<{ name: string }>
}

interface PokemonType {
  type: { name: string }
}

interface PokemonStat {
  base_stat: number
  stat: { name: string }
}

interface PokemonMove {
  move: { name: string; url: string }
}

interface LocationArea {
  location_area: { name: string; url: string }
}

interface LocationAreaDetail {
  location: { name: string; url: string }
}

interface PokemonData {
  id: number
  name: string
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: {
    front_default: string | null
    front_shiny: string | null
  }
  moves: PokemonMove[]
}

async function getPokemonData(name: string): Promise<PokemonData> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  if (!response.ok) throw new Error('Failed to fetch Pokemon')
  return response.json()
}

async function getPokemonEncounters(name: string): Promise<LocationArea[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/encounters`)
  if (!response.ok) return []
  return response.json()
}

async function getLocationAreaDetail(url: string): Promise<LocationAreaDetail | null> {
  try {
    const response = await fetch(url)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

export default async function PokemonDetailPage({ params }: PokemonDetailProps) {
  const { name } = await params
  const pokemon = await getPokemonData(name)
  const encounters = await getPokemonEncounters(name)
  const encounterLocations = await Promise.all(
    encounters.map((encounter) => getLocationAreaDetail(encounter.location_area.url))
  )
  const uniqueLocations = Array.from(
    new Map(
      encounterLocations
        .filter((area): area is LocationAreaDetail => Boolean(area))
        .map((area) => [area.location.name, area.location])
    ).values()
  )

  return <PokemonDetailView pokemon={pokemon} locations={uniqueLocations} />
}
