import { render, screen } from '@/app/lib/test-utils'
import LocationDetailPage from '../page'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}))

// Mock the fetch API
global.fetch = jest.fn()

describe('Location Detail Page', () => {
  beforeEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders location name', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city',
          region: { name: 'Sinnoh' },
          areas: [
            { name: 'canalave-city-area', url: 'https://pokeapi.co/api/v2/location-area/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city-area',
          pokemon_encounters: [
            {
              pokemon: { name: 'tentacool', url: 'https://pokeapi.co/api/v2/pokemon/72' },
            },
          ],
        }),
      })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'canalave-city' }),
    })
    render(page)

    expect(screen.getByRole('heading', { name: 'Canalave City', level: 1 })).toBeInTheDocument()
  })

  it('renders location region', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city',
          region: { name: 'Sinnoh' },
          areas: [
            { name: 'canalave-city-area', url: 'https://pokeapi.co/api/v2/location-area/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city-area',
          pokemon_encounters: [],
        }),
      })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'canalave-city' }),
    })
    render(page)

    expect(screen.getByText(/Region:/i)).toBeInTheDocument()
    expect(screen.getByText(/Sinnoh/i)).toBeInTheDocument()
  })

  it('renders Pokemon encounters', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'viridian-forest',
          region: { name: 'Kanto' },
          areas: [
            { name: 'viridian-forest-area', url: 'https://pokeapi.co/api/v2/location-area/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'viridian-forest-area',
          pokemon_encounters: [
            {
              pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
            },
            {
              pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
            },
          ],
        }),
      })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText('bulbasaur')).toBeInTheDocument()
  })

  it('renders Pokemon links', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'viridian-forest',
          region: { name: 'Kanto' },
          areas: [
            { name: 'viridian-forest-area', url: 'https://pokeapi.co/api/v2/location-area/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'viridian-forest-area',
          pokemon_encounters: [
            {
              pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
            },
            {
              pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
            },
          ],
        }),
      })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    const pokemonLinks = screen.getAllByRole('link')
    const pikachuLinks = pokemonLinks.filter((link) => link.textContent?.toLowerCase().includes('pikachu'))
    const bulbasaurLinks = pokemonLinks.filter((link) => link.textContent?.toLowerCase().includes('bulbasaur'))
    
    expect(pikachuLinks.length).toBeGreaterThan(0)
    expect(bulbasaurLinks.length).toBeGreaterThan(0)
    expect(pikachuLinks[0]).toHaveAttribute('href', '/pokemon/pikachu')
    expect(bulbasaurLinks[0]).toHaveAttribute('href', '/pokemon/bulbasaur')
  })

  it('renders a back button', async () => {
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city',
          region: { name: 'Sinnoh' },
          areas: [
            { name: 'canalave-city-area', url: 'https://pokeapi.co/api/v2/location-area/1' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'canalave-city-area',
          pokemon_encounters: [],
        }),
      })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'canalave-city' }),
    })
    render(page)

    const backButton = screen.getByLabelText('Go back to previous page')
    expect(backButton).toBeInTheDocument()
  })
})
