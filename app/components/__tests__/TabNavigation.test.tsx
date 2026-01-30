// Mock next/navigation BEFORE any imports of the mocked module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

import { render, screen } from '@/app/lib/test-utils'
import TabNavigation from '@/app/components/TabNavigation'
import { usePathname } from 'next/navigation'

describe('TabNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all four tabs', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/pokemon')

    render(<TabNavigation />)

    expect(screen.getByRole('link', { name: /pokemon/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /locations/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /moves/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /generations/i })).toBeInTheDocument()
  })

  it('has correct hrefs for each tab', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/pokemon')

    render(<TabNavigation />)

    expect(screen.getByRole('link', { name: /pokemon/i })).toHaveAttribute(
      'href',
      '/pokemon'
    )
    expect(screen.getByRole('link', { name: /locations/i })).toHaveAttribute(
      'href',
      '/locations'
    )
    expect(screen.getByRole('link', { name: /moves/i })).toHaveAttribute(
      'href',
      '/moves'
    )
    expect(screen.getByRole('link', { name: /generations/i })).toHaveAttribute(
      'href',
      '/generations'
    )
  })

  it('highlights the active tab when pathname matches', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/pokemon')

    render(<TabNavigation />)

    const pokemonTab = screen.getByRole('link', { name: /pokemon/i })
    expect(pokemonTab).toHaveClass('border-purple-500', 'text-purple-600')
  })

  it('does not highlight inactive tabs', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/pokemon')

    render(<TabNavigation />)

    const locationsTab = screen.getByRole('link', { name: /locations/i })
    expect(locationsTab).toHaveClass('text-gray-600')
    expect(locationsTab).not.toHaveClass('border-purple-500')
  })

  it('highlights Locations tab when on /locations path', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/locations')

    render(<TabNavigation />)

    const locationsTab = screen.getByRole('link', { name: /locations/i })
    expect(locationsTab).toHaveClass('border-purple-500', 'text-purple-600')
  })

  it('highlights Moves tab when on /moves path', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/moves')

    render(<TabNavigation />)

    const movesTab = screen.getByRole('link', { name: /moves/i })
    expect(movesTab).toHaveClass('border-purple-500', 'text-purple-600')
  })

  it('highlights Generations tab when on /generations path', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/generations')

    render(<TabNavigation />)

    const generationsTab = screen.getByRole('link', { name: /generations/i })
    expect(generationsTab).toHaveClass('border-purple-500', 'text-purple-600')
  })

  it('renders navigation element with proper structure', () => {
    ;(usePathname as jest.Mock).mockReturnValue('/pokemon')

    render(<TabNavigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
