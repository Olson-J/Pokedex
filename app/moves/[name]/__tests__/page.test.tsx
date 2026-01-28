import { render, screen, waitFor } from '@/app/lib/test-utils'
import MoveDetailPage from '@/app/moves/[name]/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

// Mock fetch
global.fetch = jest.fn()

const mockMoveData = {
  id: 1,
  name: 'thunderbolt',
  accuracy: 100,
  power: 90,
  pp: 15,
  type: {
    name: 'electric',
  },
  damage_class: {
    name: 'special',
  },
  flavor_text_entries: [
    {
      flavor_text: 'A strong electric blast crashes down on the target.',
      language: { name: 'en' },
      version_group: { name: 'sword-shield' },
    },
    {
      flavor_text: 'The target is struck with a powerful shock.',
      language: { name: 'en' },
      version_group: { name: 'ultra-sun-ultra-moon' },
    },
    {
      flavor_text: 'Un puissant éclair frappe l\'ennemi.',
      language: { name: 'fr' },
      version_group: { name: 'sword-shield' },
    },
  ],
  learned_by_pokemon: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon/26/' },
    { name: 'magneton', url: 'https://pokeapi.co/api/v2/pokemon/82/' },
  ],
}

describe('Move Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockMoveData,
    })
  })

  it('renders move name', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByRole('heading', { level: 1, name: /thunderbolt/i })).toBeInTheDocument()
  })

  it('renders move type', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText('electric')).toBeInTheDocument()
  })

  it('renders move stats (power, accuracy, pp)', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText('90')).toBeInTheDocument() // Power
    expect(screen.getByText('100')).toBeInTheDocument() // Accuracy
    expect(screen.getByText('15')).toBeInTheDocument() // PP
  })

  it('renders damage class', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText('special')).toBeInTheDocument()
  })

  it('renders flavor text for English language only', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText(/strong electric blast/i)).toBeInTheDocument()
    expect(screen.getByText(/powerful shock/i)).toBeInTheDocument()
    // French flavor text should not appear
    expect(screen.queryByText(/puissant éclair/i)).not.toBeInTheDocument()
  })

  it('renders version group names for flavor text', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText(/sword shield/i)).toBeInTheDocument()
    expect(screen.getByText(/ultra sun ultra moon/i)).toBeInTheDocument()
  })

  it('renders list of Pokemon that can learn the move', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument()
    expect(screen.getByText(/Raichu/i)).toBeInTheDocument()
    expect(screen.getByText(/Magneton/i)).toBeInTheDocument()
  })

  it('renders count of Pokemon that can learn the move', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText(/Learned by Pokemon \(3\)/i)).toBeInTheDocument()
  })

  it('links to Pokemon detail pages', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    expect(pikachuLink).toHaveAttribute('href', '/pokemon/pikachu')

    const raichuLink = screen.getByRole('link', { name: /raichu/i })
    expect(raichuLink).toHaveAttribute('href', '/pokemon/raichu')
  })

  it('renders back button', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('handles moves with null power and accuracy', async () => {
    const mockStatusMove = {
      ...mockMoveData,
      power: null,
      accuracy: null,
    }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockStatusMove,
    })

    const params = Promise.resolve({ name: 'growl' })
    render(await MoveDetailPage({ params }))

    // Should display em dash (—) or similar placeholder
    expect(screen.getAllByText('—').length).toBeGreaterThanOrEqual(2)
  })

  it('limits Pokemon list to 50 and shows +more indicator', async () => {
    const mockMoveWithManyPokemon = {
      ...mockMoveData,
      learned_by_pokemon: Array.from({ length: 75 }, (_, i) => ({
        name: `pokemon-${i}`,
        url: `https://pokeapi.co/api/v2/pokemon/${i}/`,
      })),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockMoveWithManyPokemon,
    })

    const params = Promise.resolve({ name: 'tackle' })
    render(await MoveDetailPage({ params }))

    expect(screen.getByText(/\+25 more/i)).toBeInTheDocument()
  })

  it('fetches move data with correct API endpoint', async () => {
    const params = Promise.resolve({ name: 'thunderbolt' })
    render(await MoveDetailPage({ params }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/move/thunderbolt'
      )
    })
  })

  it('displays all unique flavor text descriptions', async () => {
    const mockMoveWithManyDescriptions = {
      ...mockMoveData,
      flavor_text_entries: Array.from({ length: 10 }, (_, i) => ({
        flavor_text: `Description ${i}`,
        language: { name: 'en' },
        version_group: { name: `version-${i}` },
      })),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockMoveWithManyDescriptions,
    })

    const params = Promise.resolve({ name: 'tackle' })
    render(await MoveDetailPage({ params }))

    // Count version group names in the descriptions section (should show all 10)
    const versionNames = screen.getAllByText(/Version/i)
    expect(versionNames.length).toBe(10)
  })
})
