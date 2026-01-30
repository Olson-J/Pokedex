'use client'

import { useState, useMemo } from 'react'
import SearchInput from './SearchInput'
import GenerationCard from './GenerationCard'

interface Generation {
  name: string
  url: string
}

interface GenerationsSearchListProps {
  allGenerations: Generation[]
}

export default function GenerationsSearchList({ allGenerations }: GenerationsSearchListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredGenerations = useMemo(() => {
    return allGenerations.filter((gen) =>
      gen.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allGenerations])

  return (
    <>
      <div className="mb-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search generations..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredGenerations.length > 0 ? (
          filteredGenerations.map((generation) => (
            <GenerationCard key={generation.name} name={generation.name} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
            No generations found matching your search
          </div>
        )}
      </div>
    </>
  )
}
