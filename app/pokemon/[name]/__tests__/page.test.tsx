import { render, screen } from '@/app/lib/test-utils'
import PokemonDetailPage from '@/app/pokemon/[name]/page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock fetch
global.fetch = jest.fn()

const mockPokemonData = {
  id: 25,
  name: 'pikachu',
  types: [
    { type: { name: 'electric' } },
  ],
  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
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

const mockLocationData = {
  id: 25,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/25/encounters',
}

const mockEncountersData = [
  { location_area: { name: 'viridian-forest', url: 'https://pokeapi.co/api/v2/location-area/321/' } },
  { location_area: { name: 'route-2', url: 'https://pokeapi.co/api/v2/location-area/7/' } },
]

describe('Pokemon Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/pokemon/pikachu') && !url.includes('encounters')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockPokemonData,
        })
      }
      if (url.includes('encounters')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockEncountersData,
        })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })
  })

  it('renders pokemon name', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
  })

  it('renders pokemon name and details', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText(/Sprites/i)).toBeInTheDocument()
    expect(screen.getByText(/Stats/i)).toBeInTheDocument()
    expect(screen.getByText(/Found in Locations/i)).toBeInTheDocument()
    expect(screen.getByText(/Moves/i)).toBeInTheDocument()
  })


  it('renders pokemon types', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    expect(screen.getByText(/electric/i)).toBeInTheDocument()
  })

  it('renders pokemon stats', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    // Check for specific stats section
    expect(screen.getByText(/stats/i)).toBeInTheDocument()
    expect(screen.getByText('HP')).toBeInTheDocument()
    expect(screen.getByText('35')).toBeInTheDocument()
    expect(screen.getByText('55')).toBeInTheDocument()
  })

  it('renders normal and shiny sprites', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThanOrEqual(2)
  })

  it('renders location links', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    // Location names have dashes replaced with spaces in display
    expect(screen.getByText(/viridian forest/i)).toBeInTheDocument()
  })

  it('renders move links', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    expect(screen.getByText(/thunderbolt/i)).toBeInTheDocument()
  })

  it('renders a back button', async () => {
    const page = await PokemonDetailPage({ params: Promise.resolve({ name: 'pikachu' }) })
    render(page)
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })
})
