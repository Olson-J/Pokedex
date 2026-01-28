import Link from 'next/link'

interface LocationCardProps {
  name: string
}

export default function LocationCard({ name }: LocationCardProps) {
  // Format display name
  const displayName = name
    .replace(/-area$/, '') // Remove trailing "-area"
    .replace(/-area-\d+$/, '') // Remove trailing "-area-1", "-area-2", etc.
    .replace(/-(nw|ne|sw|se|b1f|b2f|1f|2f|3f)$/i, '') // Remove directional suffixes and floor indicators
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ')

  return (
    <Link href={`/locations/${name}`}>
      <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer bg-white dark:bg-gray-900">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{displayName}</h3>
      </div>
    </Link>
  )
}
