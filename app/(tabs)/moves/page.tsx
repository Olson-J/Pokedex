'use client'

import { useState, useMemo, useEffect } from 'react'
import SearchInput from '@/app/components/SearchInput'
import MoveCard from '@/app/components/MoveCard'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface Move {
  name: string
  url: string
}

export default function MovesListPage() {
  const [allMoves, setAllMoves] = useState<Move[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMoves()
  }, [])

  const fetchMoves = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://pokeapi.co/api/v2/move?limit=1000')
      if (!response.ok) throw new Error('Failed to fetch moves')
      const data = await response.json()
      setAllMoves(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load moves')
      setAllMoves([])
    } finally {
      setLoading(false)
    }
  }

  const filteredMoves = useMemo(() => {
    return allMoves.filter((move) =>
      move.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allMoves])

  const handleRetry = () => {
    fetchMoves()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-purple-300 dark:border-purple-700 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-700 dark:text-purple-400 truncate">Moves</h1>
          <div className="w-full md:w-96">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search moves..."
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3">
          Showing {filteredMoves.length} of {allMoves.length}
        </p>
      </div>

      <main className="flex-1 p-3 sm:p-4 md:p-6">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-600 dark:text-gray-400">Loading moves...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {filteredMoves.length > 0 ? (
              filteredMoves.map((move) => (
                <MoveCard key={move.name} name={move.name} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No moves found matching your search' : 'No moves available'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
