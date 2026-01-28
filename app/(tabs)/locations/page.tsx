'use client'

import { useState, useMemo, useEffect } from 'react'
import SearchInput from '@/app/components/SearchInput'
import LocationCard from '@/app/components/LocationCard'
import BackButton from '@/app/components/BackButton'
import ErrorDisplay from '@/app/components/ErrorDisplay'

interface Location {
  name: string
  url: string
}

export default function LocationsListPage() {
  const [allLocations, setAllLocations] = useState<Location[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://pokeapi.co/api/v2/location?limit=10000')
      if (!response.ok) throw new Error('Failed to fetch locations')
      const data = await response.json()
      setAllLocations(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load locations')
      setAllLocations([])
    } finally {
      setLoading(false)
    }
  }

  // Format location name for display
  const formatLocationName = (name: string): string => {
    return name
      .replace(/-area$/, '') // Remove trailing "-area"
      .replace(/-area-\d+$/, '') // Remove trailing "-area-1", "-area-2", etc.
      .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '') // Remove directional suffixes and floor indicators
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ')
  }

  const filteredLocations = useMemo(() => {
    return allLocations.filter((location) => {
      const displayName = formatLocationName(location.name)
      return displayName.toLowerCase().includes(searchTerm.toLowerCase())
    })
  }, [searchTerm, allLocations])

  const handleRetry = () => {
    fetchLocations()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
        <div className="mb-3 sm:mb-4">
          <BackButton />
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">Locations</h1>
          <div className="w-full md:w-96">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search locations..."
            />
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-3">
          Showing {filteredLocations.length} of {allLocations.length}
        </p>
      </div>

      <main className="flex-1 p-3 sm:p-4 md:p-6">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <p className="text-gray-600 dark:text-gray-400">Loading locations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <LocationCard key={location.name} name={location.name} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No locations found matching your search' : 'No locations available'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
