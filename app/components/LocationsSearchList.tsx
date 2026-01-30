'use client'

import { useState, useMemo } from 'react'
import SearchInput from './SearchInput'
import LocationCard from './LocationCard'
import { formatLocationName } from '@/app/lib/formatters'

interface Location {
  name: string
  url: string
}

interface LocationsSearchListProps {
  allLocations: Location[]
}

export default function LocationsSearchList({ allLocations }: LocationsSearchListProps) {
  const [searchTerm, setSearchTerm] = useState('')

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
