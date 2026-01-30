'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SearchInput from './SearchInput'

interface Location {
  name: string
}

interface PokemonLocationsListProps {
  locations: Location[]
}

export default function PokemonLocationsList({ locations }: PokemonLocationsListProps) {
  const [searchTerm, setSearchTerm] = useState('')

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
    return locations.filter((location) => {
      const displayName = formatLocationName(location.name)
      return displayName.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }, [searchTerm, locations])

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
          Found in Locations ({filteredLocations.length} of {locations.length})
        </h2>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search locations..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredLocations.map((location) => (
          <Link
            key={location.name}
            href={`/locations/${location.name}`}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-700 transition-colors"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {formatLocationName(location.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
