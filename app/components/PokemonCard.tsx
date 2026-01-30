import Link from 'next/link'
import { formatTitleFromSlug } from '@/app/lib/formatters'

interface PokemonCardProps {
  name: string
}

export default function PokemonCard({ name }: PokemonCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  const displayName = formatTitleFromSlug(name)
  return (
    <Link href={`/pokemon/${slug}`}>
      <div className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer bg-white dark:bg-gray-900">
        <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">{displayName}</h3>
      </div>
    </Link>
  )
}
