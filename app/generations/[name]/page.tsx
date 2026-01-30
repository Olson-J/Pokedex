import GenerationDetailView from '@/app/components/GenerationDetailView'

interface GenerationDetailProps {
  params: Promise<{ name: string }>
}

interface Region {
  name: string
  url: string
}

interface PokemonSpecies {
  name: string
  url: string
}

interface GenerationData {
  id: number
  name: string
  main_region: Region
  pokemon_species: PokemonSpecies[]
}

async function getGenerationData(name: string): Promise<GenerationData> {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${name}`)
  if (!response.ok) throw new Error('Failed to fetch generation')
  return response.json()
}

export default async function GenerationDetailPage({ params }: GenerationDetailProps) {
  const { name } = await params
  const generation = await getGenerationData(name)

  return <GenerationDetailView generation={generation} />
}
