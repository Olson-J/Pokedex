'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SearchInput from './SearchInput'

interface PokemonReference {
  name: string
  url: string
}

interface MoveLearnedByListProps {
  pokemon: PokemonReference[]
}

export default function MoveLearnedByList({ pokemon }: MoveLearnedByListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const formatPokemonName = (name: string): string => {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((pokemonRef) => {
      const displayName = formatPokemonName(pokemonRef.name)
      return displayName.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }, [searchTerm, pokemon])

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
          Learned by Pokemon ({filteredPokemon.length} of {pokemon.length})
        </h2>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokemon..."
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filteredPokemon.map((pokemonRef) => (
          <Link
            key={pokemonRef.name}
            href={`/pokemon/${pokemonRef.name}`}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-700 transition-colors"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {formatPokemonName(pokemonRef.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
