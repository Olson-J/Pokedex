import Link from 'next/link'

interface MoveCardProps {
  name: string
  type: string
}

export default function MoveCard({ name, type }: MoveCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  return (
    <Link href={`/moves/${slug}`}>
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer bg-white dark:bg-gray-900">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{type}</p>
      </div>
    </Link>
  )
}
