'use client'

import { useState, useMemo } from 'react'
import SearchInput from './SearchInput'
import PokemonCard from './PokemonCard'

interface Pokemon {
  name: string
  url: string
}

interface PokemonSearchListProps {
  allPokemon: Pokemon[]
}

export default function PokemonSearchList({ allPokemon }: PokemonSearchListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPokemon = useMemo(() => {
    return allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allPokemon])

  return (
    <>
      <div className="mb-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search Pokemon..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
            No Pokemon found matching your search
          </div>
        )}
      </div>
    </>
  )
}
