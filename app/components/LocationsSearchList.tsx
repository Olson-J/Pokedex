'use client'

import { useState, useMemo } from 'react'
import SearchInput from './SearchInput'
import LocationCard from './LocationCard'

interface Location {
  name: string
  url: string
}

interface LocationsSearchListProps {
  allLocations: Location[]
}

export default function LocationsSearchList({ allLocations }: LocationsSearchListProps) {
  const [searchTerm, setSearchTerm] = useState('')

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

  return (
    <>
      <div className="mb-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search locations..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location) => (
            <LocationCard key={location.name} name={location.name} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
            No locations found matching your search
          </div>
        )}
      </div>
    </>
  )
}
