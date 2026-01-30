// Mock Next.js modules BEFORE imports
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

import { render, screen } from '@/app/lib/test-utils'
import LocationDetailView from '@/app/components/LocationDetailView'

const mockLocation = {
  id: 1,
  name: 'viridian-forest',
  region: { name: 'kanto', url: 'https://pokeapi.co/api/v2/region/1' },
}

const mockAreas = [
  {
    id: 1,
    name: 'viridian-forest-area',
    pokemon_encounters: [
      { pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' } },
      { pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' } },
    ],
  },
]

describe('Location Detail View', () => {
  it('renders location name and region', () => {
    render(<LocationDetailView location={mockLocation} areas={mockAreas} />)

    expect(screen.getByRole('heading', { level: 1, name: /viridian forest/i })).toBeInTheDocument()
    expect(screen.getByText(/Region:/i)).toBeInTheDocument()
    expect(screen.getByText(/kanto/i)).toBeInTheDocument()
  })

  it('renders Pokemon encounters and links', () => {
    render(<LocationDetailView location={mockLocation} areas={mockAreas} />)

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    const bulbasaurLink = screen.getByRole('link', { name: /bulbasaur/i })

    expect(pikachuLink).toHaveAttribute('href', '/pokemon/pikachu')
    expect(bulbasaurLink).toHaveAttribute('href', '/pokemon/bulbasaur')
  })

  it('renders a back button', () => {
    render(<LocationDetailView location={mockLocation} areas={mockAreas} />)

    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })
})
