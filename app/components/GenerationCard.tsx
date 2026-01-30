import Link from 'next/link'
import { formatGenerationName } from '@/app/lib/formatters'

interface GenerationCardProps {
  name: string
}

export default function GenerationCard({ name }: GenerationCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  const displayName = formatGenerationName(name)
  return (
    <Link href={`/generations/${slug}`}>
      <div className="p-4 border border-purple-300 dark:border-purple-700 rounded-lg hover:shadow-lg hover:border-purple-500 dark:hover:border-purple-400 transition-all cursor-pointer bg-white dark:bg-gray-900">
        <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">{displayName}</h3>
      </div>
    </Link>
  )
}
