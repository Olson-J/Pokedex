'use client'

import { useState, useMemo, useEffect } from 'react'
import SearchInput from '@/app/components/SearchInput'
import PokemonCard from '@/app/components/PokemonCard'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface Pokemon {
  name: string
  url: string
}

export default function PokemonListPage() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
      if (!response.ok) throw new Error('Failed to fetch Pokemon')
      const data = await response.json()
      setAllPokemon(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokemon')
      setAllPokemon([])
    } finally {
      setLoading(false)
    }
  }

  const filteredPokemon = useMemo(() => {
    return allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allPokemon])

  const handleRetry = () => {
    fetchPokemon()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-purple-300 dark:border-purple-700 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-400 truncate">Pokemon</h1>
          <div className="w-full md:w-96">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search Pokemon..."
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3">
          Showing {filteredPokemon.length} of {allPokemon.length}
        </p>
      </div>

      <main className="flex-1 p-3 sm:p-4 md:p-6">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-600 dark:text-gray-400">Loading Pokemon...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.name} name={pokemon.name} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No Pokemon found matching your search' : 'No Pokemon available'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
