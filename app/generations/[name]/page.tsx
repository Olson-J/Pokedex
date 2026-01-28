'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import BackButton from '@/app/components/BackButton'
import SearchInput from '@/app/components/SearchInput'
import ErrorDisplay from '@/app/components/ErrorDisplay'
import { formatGenerationName, formatTitleFromSlug } from '@/app/lib/formatters'

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

export default function GenerationDetailPage({ params }: GenerationDetailProps) {
  const [generation, setGeneration] = useState<GenerationData | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [generationName, setGenerationName] = useState('')

  useEffect(() => {
    const fetchGeneration = async () => {
      try {
        setLoading(true)
        setError(null)
        const { name } = await params
        setGenerationName(name)
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${name}`)
        if (!response.ok) throw new Error('Failed to fetch generation')
        const data = await response.json()
        setGeneration(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load generation')
        setGeneration(null)
      } finally {
        setLoading(false)
      }
    }

    fetchGeneration()
  }, [params])

  const filteredPokemon = useMemo(() => {
    if (!generation) return []
    return generation.pokemon_species.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, generation])

  const formatPokemonName = (name: string): string => {
    return formatTitleFromSlug(name)
  }

  const formatRegionName = (name: string): string => {
    return formatTitleFromSlug(name)
  }

  const handleRetry = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${generationName}`)
      if (!response.ok) throw new Error('Failed to fetch generation')
      const data = await response.json()
      setGeneration(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load generation')
      setGeneration(null)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-400">Loading generation...</p>
      </div>
    )
  }

  if (error || !generation) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <BackButton />
          </div>
          {error && <ErrorDisplay error={error} onRetry={handleRetry} />}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {formatGenerationName(generation.name)}
            </h1>
          </div>

          {/* Primary Region */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Primary Region
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm capitalize">
              {formatRegionName(generation.main_region.name)}
            </span>
          </div>

          {/* Pokemon List with Search */}
          <div className="mb-6">
            <div className="mb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Pokemon ({filteredPokemon.length} of {generation.pokemon_species.length})
              </h2>
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search Pokemon..."
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {filteredPokemon.length > 0 ? (
                filteredPokemon.map((pokemon) => (
                  <Link
                    key={pokemon.name}
                    href={`/pokemon/${pokemon.name}`}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatPokemonName(pokemon.name)}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
                  {searchTerm ? 'No Pokemon found matching your search' : 'No Pokemon available'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
