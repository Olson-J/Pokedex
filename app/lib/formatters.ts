export const formatTitleFromSlug = (value: string): string => {
  return value
    .replace(/-/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const formatGenerationName = (value: string): string => {
  const normalized = value.toLowerCase().replace(/\s+/g, '-')

  if (normalized.startsWith('generation-')) {
    const suffix = normalized.replace('generation-', '')
    return `Generation ${suffix.toUpperCase()}`
  }

  if (value.toLowerCase().startsWith('generation ')) {
    const suffix = value.slice('Generation '.length)
    return `Generation ${suffix.toUpperCase()}`
  }

  return formatTitleFromSlug(value)
}
