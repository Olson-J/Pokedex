'use client'

import Image from 'next/image'
import BackButton from '@/app/components/BackButton'
import PokemonLocationsList from '@/app/components/PokemonLocationsList'
import PokemonMovesList from '@/app/components/PokemonMovesList'

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

interface LocationLink {
  name: string
  url: string
}

interface PokemonDetailViewProps {
  pokemon: PokemonData
  locations: LocationLink[]
}

export default function PokemonDetailView({ pokemon, locations }: PokemonDetailViewProps) {
  const statNames: { [key: string]: string } = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400 capitalize">
              {pokemon.name}
            </h1>
          </div>

          {/* Types */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">Types</h2>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm capitalize border border-purple-300 dark:border-purple-700"
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          {/* Sprites */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">Sprites</h2>
            <div className="flex gap-8 flex-wrap justify-center sm:justify-start">
              {pokemon.sprites.front_default && (
                <div className="text-center">
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={`${pokemon.name} sprite`}
                    width={200}
                    height={200}
                    priority
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700"
                  />
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2">Normal</p>
                </div>
              )}
              {pokemon.sprites.front_shiny && (
                <div className="text-center">
                  <Image
                    src={pokemon.sprites.front_shiny}
                    alt={`${pokemon.name} shiny sprite`}
                    width={200}
                    height={200}
                    priority
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg border border-purple-200 dark:border-purple-700"
                  />
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-2">Shiny</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">Stats</h2>
            <div className="space-y-2">
              {pokemon.stats.map((statInfo) => (
                <div key={statInfo.stat.name} className="flex items-center gap-3">
                  <span className="w-20 sm:w-24 text-sm text-gray-600 dark:text-gray-400">
                    {statNames[statInfo.stat.name] || statInfo.stat.name}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-purple-500 dark:bg-purple-400 h-4 rounded-full"
                      style={{ width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm font-semibold text-gray-900 dark:text-white text-right">
                    {statInfo.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          {locations.length > 0 && <PokemonLocationsList locations={locations} />}

          {/* Moves */}
          <PokemonMovesList moves={pokemon.moves} />
        </div>
      </div>
    </div>
  )
}
