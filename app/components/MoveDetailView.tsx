'use client'

import BackButton from '@/app/components/BackButton'
import MoveLearnedByList from '@/app/components/MoveLearnedByList'
import { formatTitleFromSlug } from '@/app/lib/formatters'

interface MoveType {
  name: string
}

interface MoveDamageClass {
  name: string
}

interface FlavorTextEntry {
  flavor_text: string
  language: { name: string }
  version_group: { name: string }
}

interface PokemonReference {
  name: string
  url: string
}

interface MoveData {
  id: number
  name: string
  accuracy: number | null
  power: number | null
  pp: number
  type: MoveType
  damage_class: MoveDamageClass
  flavor_text_entries: FlavorTextEntry[]
  learned_by_pokemon: PokemonReference[]
}

interface MoveDetailViewProps {
  move: MoveData
}

export default function MoveDetailView({ move }: MoveDetailViewProps) {
  const englishFlavorText = move.flavor_text_entries.filter(
    (entry) => entry.language.name === 'en'
  )

  const uniqueFlavorTexts = Array.from(
    new Map(
      englishFlavorText.map((entry) => [
        entry.version_group.name,
        entry,
      ])
    ).values()
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <BackButton />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-purple-300 dark:border-purple-700 p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">
              {formatTitleFromSlug(move.name)}
            </h1>
          </div>

          {/* Type */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">
              Type
            </h2>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm capitalize border border-purple-300 dark:border-purple-700">
              {move.type.name}
            </span>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
              Stats
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Power</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {move.power ?? '—'}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Accuracy</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {move.accuracy ?? '—'}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">PP</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{move.pp}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Damage Class</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                  {move.damage_class.name}
                </p>
              </div>
            </div>
          </div>

          {/* Flavor Text */}
          {uniqueFlavorTexts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
                Flavor Text
              </h2>
              <div className="space-y-3">
                {uniqueFlavorTexts.map((entry, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-700"
                  >
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      {formatTitleFromSlug(entry.version_group.name)}
                    </p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {entry.flavor_text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pokemon that can learn this move */}
          <MoveLearnedByList pokemon={move.learned_by_pokemon} />
        </div>
      </div>
    </div>
  )
}
