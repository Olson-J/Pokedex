'use client'

import Link from 'next/link'
import BackButton from '@/app/components/BackButton'
import { formatLocationName } from '@/app/lib/formatters'

interface PokemonEncounter {
  pokemon: { name: string; url: string }
}

interface LocationAreaData {
  id: number
  name: string
  pokemon_encounters: PokemonEncounter[]
}

interface LocationData {
  id: number
  name: string
  region: { name: string; url: string }
}

interface LocationDetailViewProps {
  location: LocationData
  areas: LocationAreaData[]
}

function formatSubLocationName(areaName: string, locationName: string): string {
  const baseName = areaName
    .replace(/-area$/, '')
    .replace(/-area-\d+$/, '')
  const prefix = `${locationName}-`
  const trimmedName = baseName.startsWith(prefix) ? baseName.slice(prefix.length) : baseName
  const safeName = trimmedName.length > 0 ? trimmedName : baseName

  return safeName
    .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default function LocationDetailView({ location, areas }: LocationDetailViewProps) {
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
              {formatLocationName(location.name)}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 capitalize">
              Region: {location.region.name}
            </p>
          </div>

          {/* Sub Locations */}
          {areas.length > 0 ? (
            <div className="space-y-6">
              {areas.map((area) => (
                <div key={area.name} className="border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 mb-3">
                    Pokemon found in {formatSubLocationName(area.name, location.name)} ({area.pokemon_encounters.length})
                  </h2>
                  {area.pokemon_encounters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {area.pokemon_encounters.map((encounter) => (
                        <Link
                          key={encounter.pokemon.name}
                          href={`/pokemon/${encounter.pokemon.name}`}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900 border border-purple-200 dark:border-purple-700 transition-colors"
                        >
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {encounter.pokemon.name.replace(/-/g, ' ')}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No Pokemon encounters recorded for this sub location.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-500 dark:text-gray-400">
                No sub locations recorded for this location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
