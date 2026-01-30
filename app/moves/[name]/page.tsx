import MoveDetailView from '@/app/components/MoveDetailView'

interface MoveDetailProps {
  params: Promise<{ name: string }>
}

interface MoveType {
  name: string
}

interface MoveDamageClass {
  name: string
}

interface FlavorTextEntry {
  flavor_text: string
  language: { name: string }
  version_group: { name: string }
}

interface PokemonReference {
  name: string
  url: string
}

interface MoveData {
  id: number
  name: string
  accuracy: number | null
  power: number | null
  pp: number
  type: MoveType
  damage_class: MoveDamageClass
  flavor_text_entries: FlavorTextEntry[]
  learned_by_pokemon: PokemonReference[]
}

async function getMoveData(name: string): Promise<MoveData> {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
  if (!response.ok) throw new Error('Failed to fetch move')
  return response.json()
}

export default async function MoveDetailPage({ params }: MoveDetailProps) {
  const { name } = await params
  const move = await getMoveData(name)

  return <MoveDetailView move={move} />
}
