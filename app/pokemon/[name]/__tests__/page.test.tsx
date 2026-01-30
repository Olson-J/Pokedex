// Mock Next.js modules BEFORE imports
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

import { render, screen } from '@/app/lib/test-utils'
import PokemonDetailView from '@/app/components/PokemonDetailView'

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
  ],
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    front_shiny: 'https://example.com/pikachu-shiny.png',
  },
  moves: [
    { move: { name: 'thunderbolt', url: 'https://pokeapi.co/api/v2/move/85/' } },
    { move: { name: 'quick-attack', url: 'https://pokeapi.co/api/v2/move/98/' } },
  ],
}

const mockLocations = [
  { name: 'viridian-forest', url: 'https://pokeapi.co/api/v2/location/1/' },
  { name: 'kanto-route-2', url: 'https://pokeapi.co/api/v2/location/2/' },
]

describe('Pokemon Detail View', () => {
  it('renders pokemon name and types', () => {
    render(<PokemonDetailView pokemon={mockPokemon} locations={mockLocations} />)

    expect(screen.getByRole('heading', { name: /pikachu/i })).toBeInTheDocument()
    expect(screen.getByText(/electric/i)).toBeInTheDocument()
  })

  it('renders sprites section', () => {
    render(<PokemonDetailView pokemon={mockPokemon} locations={mockLocations} />)

    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
  })

  it('renders stats', () => {
    render(<PokemonDetailView pokemon={mockPokemon} locations={mockLocations} />)

    expect(screen.getByText('HP')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
  })

  it('renders locations and moves sections', () => {
    render(<PokemonDetailView pokemon={mockPokemon} locations={mockLocations} />)

    expect(screen.getByText(/Found in Locations/i)).toBeInTheDocument()
    expect(screen.getByText(/Moves/i)).toBeInTheDocument()
  })

  it('renders a back button', () => {
    render(<PokemonDetailView pokemon={mockPokemon} locations={mockLocations} />)

    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })
})
