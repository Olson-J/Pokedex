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
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'viridian-forest',
        region: { name: 'kanto' },
        areas: [
          {
            id: 1,
            name: 'viridian-forest-area-1',
            pokemon_encounters: [
              {
                pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
                version_details: [{ version: { name: 'red' } }],
              },
            ],
          },
        ],
      }),
    })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    expect(screen.getByText('viridian forest')).toBeInTheDocument()
  })

  it('renders location region', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'viridian-forest',
        region: { name: 'kanto' },
        areas: [],
      }),
    })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    expect(screen.getByText(/Region:/i)).toBeInTheDocument()
    expect(screen.getByText('kanto')).toBeInTheDocument()
  })

  it('renders sub-areas with Pokemon', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'viridian-forest',
        region: { name: 'kanto' },
        areas: [
          {
            id: 1,
            name: 'viridian-forest-area-1',
            pokemon_encounters: [
              {
                pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
                version_details: [{ version: { name: 'red' } }],
              },
              {
                pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
                version_details: [{ version: { name: 'red' } }],
              },
            ],
          },
          {
            id: 2,
            name: 'viridian-forest-area-2',
            pokemon_encounters: [
              {
                pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4' },
                version_details: [{ version: { name: 'blue' } }],
              },
            ],
          },
        ],
      }),
    })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    expect(screen.getByText(/Sub-Areas/i)).toBeInTheDocument()
    expect(screen.getByText('viridian forest area 1')).toBeInTheDocument()
    expect(screen.getByText('viridian forest area 2')).toBeInTheDocument()
  })

  it('renders Pokemon links', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'viridian-forest',
        region: { name: 'kanto' },
        areas: [
          {
            id: 1,
            name: 'viridian-forest-area-1',
            pokemon_encounters: [
              {
                pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
                version_details: [{ version: { name: 'red' } }],
              },
              {
                pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
                version_details: [{ version: { name: 'red' } }],
              },
            ],
          },
        ],
      }),
    })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    expect(pikachuLink).toHaveAttribute('href', '/pokemon/pikachu')

    const bulbasaurLink = screen.getByRole('link', { name: /bulbasaur/i })
    expect(bulbasaurLink).toHaveAttribute('href', '/pokemon/bulbasaur')
  })

  it('renders a back button', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'viridian-forest',
        region: { name: 'kanto' },
        areas: [],
      }),
    })

    const page = await LocationDetailPage({
      params: Promise.resolve({ name: 'viridian-forest' }),
    })
    render(page)

    const backButton = screen.getByLabelText('Go back to previous page')
    expect(backButton).toBeInTheDocument()
  })
})
