'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SearchInput from './SearchInput'

interface Move {
  move: {
    name: string
  }
}

interface PokemonMovesListProps {
  moves: Move[]
}

export default function PokemonMovesList({ moves }: PokemonMovesListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const formatMoveName = (name: string): string => {
    return name
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const filteredMoves = useMemo(() => {
    return moves.filter((moveInfo) => {
      const displayName = formatMoveName(moveInfo.move.name)
      return displayName.toLowerCase().startsWith(searchTerm.toLowerCase())
    })
  }, [searchTerm, moves])

  return (
    <div className="mb-6">
      <div className="mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
          Moves ({filteredMoves.length} of {moves.length})
        </h2>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search moves..."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {filteredMoves.map((moveInfo) => (
          <Link
            key={moveInfo.move.name}
            href={`/moves/${moveInfo.move.name}`}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-700 transition-colors"
          >
            <span className="text-sm text-gray-900 dark:text-white">
              {formatMoveName(moveInfo.move.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
