'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function MareepBanner() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-b border-purple-300 dark:border-purple-700">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0">
          <div className="h-20 w-20"></div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-100">
              Pokedex
            </h1>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Explore the world of Pokemon
            </p>
          </div>
          <div className="h-20 w-20 hidden sm:block"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-b border-purple-300 dark:border-purple-700">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-0">
        <div className="hidden sm:flex items-center">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png"
            alt="Mareep"
            width={80}
            height={80}
            className="drop-shadow-lg"
            priority
          />
        </div>
        <div className="flex flex-col items-center gap-4 sm:gap-0">
          <div className="flex items-center gap-4 sm:hidden">
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png"
              alt="Mareep"
              width={80}
              height={80}
              className="drop-shadow-lg"
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-purple-900 dark:text-purple-100">
              Pokedex
            </h1>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Explore the world of Pokemon
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png"
            alt="Mareep"
            width={80}
            height={80}
            className="drop-shadow-lg transform -scale-x-100"
            priority
          />
        </div>
      </div>
    </div>
  )
}
