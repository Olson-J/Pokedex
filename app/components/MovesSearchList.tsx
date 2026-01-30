'use client'

import { useState, useMemo } from 'react'
import SearchInput from './SearchInput'
import MoveCard from './MoveCard'

interface Move {
  name: string
  url: string
}

interface MovesSearchListProps {
  allMoves: Move[]
}

export default function MovesSearchList({ allMoves }: MovesSearchListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMoves = useMemo(() => {
    return allMoves.filter((move) =>
      move.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    )
  }, [searchTerm, allMoves])

  return (
    <>
      <div className="mb-3">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search moves..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {filteredMoves.length > 0 ? (
          filteredMoves.map((move) => (
            <MoveCard key={move.name} name={move.name} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-600 dark:text-gray-400">
            No moves found matching your search
          </div>
        )}
      </div>
    </>
  )
}
