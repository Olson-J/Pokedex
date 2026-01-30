'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabNavigation() {
  const pathname = usePathname()

  const tabs = [
    { name: 'Pokemon', href: '/pokemon' },
    { name: 'Locations', href: '/locations' },
    { name: 'Moves', href: '/moves' },
    { name: 'Generations', href: '/generations' },
  ]

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap sm:flex-nowrap gap-0 bg-white dark:bg-black">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 sm:flex-none px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
