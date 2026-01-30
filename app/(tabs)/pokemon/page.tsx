'use client'

import { useState, useEffect } from 'react'
import PokemonSearchList from '@/app/components/PokemonSearchList'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface Pokemon {
  name: string
  url: string
}

export default function PokemonListPage() {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPokemon()
  }, [])

  const fetchPokemon = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
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

  const handleRetry = () => {
    fetchPokemon()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-purple-300 dark:border-purple-700 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <BackButton />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">Pokemon</h1>
      </div>

      <main className="flex-1 p-3 sm:p-4 md:p-6">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-600 dark:text-gray-400">Loading Pokemon...</p>
          </div>
        ) : (
          <PokemonSearchList allPokemon={allPokemon} />
        )}
      </main>
    </div>
  )
}
