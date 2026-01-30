'use client'

import { useState, useMemo, useEffect } from 'react'
import SearchInput from '@/app/components/SearchInput'
import GenerationCard from '@/app/components/GenerationCard'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface Generation {
  name: string
  url: string
}

export default function GenerationsListPage() {
  const [allGenerations, setAllGenerations] = useState<Generation[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGenerations()
  }, [])

  const fetchGenerations = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://pokeapi.co/api/v2/generation?limit=100')
      if (!response.ok) throw new Error('Failed to fetch generations')
      const data = await response.json()
      setAllGenerations(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load generations')
      setAllGenerations([])
    } finally {
      setLoading(false)
    }
  }

  const filteredGenerations = useMemo(() => {
    return allGenerations.filter((gen) =>
      gen.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allGenerations])

  const handleRetry = () => {
    fetchGenerations()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-purple-300 dark:border-purple-700 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-400 truncate">Generations</h1>
          <div className="w-full md:w-96">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search generations..."
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3">
          Showing {filteredGenerations.length} of {allGenerations.length}
        </p>
      </div>

      <main className="flex-1 p-3 sm:p-4 md:p-6">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-600 dark:text-gray-400">Loading generations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {filteredGenerations.length > 0 ? (
              filteredGenerations.map((gen) => (
                <GenerationCard key={gen.name} name={gen.name} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No generations found matching your search' : 'No generations available'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
