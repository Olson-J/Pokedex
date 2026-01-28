import { render, screen, waitFor } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import GenerationDetailPage from '@/app/generations/[name]/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

// Mock fetch
global.fetch = jest.fn()

const mockGenerationData = {
  id: 1,
  name: 'generation-i',
  main_region: {
    name: 'kanto',
    url: 'https://pokeapi.co/api/v2/region/1/',
  },
  pokemon_species: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon-species/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon-species/5/' },
  ],
}

describe('Generation Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGenerationData,
    })
  })
  it('renders generation name', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /generation i/i })).toBeInTheDocument()
    })
  })

  it('renders primary region name', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/kanto/i)).toBeInTheDocument()
    })
  })

  it('renders list of Pokemon species', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
      expect(screen.getByText(/Ivysaur/i)).toBeInTheDocument()
      expect(screen.getByText(/Venusaur/i)).toBeInTheDocument()
      expect(screen.getByText(/Charmander/i)).toBeInTheDocument()
      expect(screen.getByText(/Charmeleon/i)).toBeInTheDocument()
    })
  })

  it('renders count of Pokemon in generation', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Pokemon \(5 of 5\)/i)).toBeInTheDocument()
    })
  })

  it('links to Pokemon detail pages', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      const bulbasaurLink = screen.getByRole('link', { name: /bulbasaur/i })
      expect(bulbasaurLink).toHaveAttribute('href', '/pokemon/bulbasaur')

      const charmanderLink = screen.getByRole('link', { name: /charmander/i })
      expect(charmanderLink).toHaveAttribute('href', '/pokemon/charmander')
    })
  })

  it('renders back button', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      const backButton = screen.getByRole('button', { name: /back|←/i })
      expect(backButton).toBeInTheDocument()
    })
  })

  it('fetches generation data with correct API endpoint', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/generation/generation-i'
      )
    })
  })

  it('filters Pokemon when searching', async () => {
    const user = userEvent.setup()
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search pokemon/i)
    await user.type(searchInput, 'bulba')

    await waitFor(() => {
      expect(screen.getByText(/Pokemon \(1 of 5\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
      expect(screen.queryByText(/Charmander/i)).not.toBeInTheDocument()
    })
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search pokemon/i)
    await user.type(searchInput, 'bulba')

    await waitFor(() => {
      expect(screen.getByText(/Pokemon \(1 of 5\)/i)).toBeInTheDocument()
    })

    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    await waitFor(() => {
      expect(screen.getByText(/Pokemon \(5 of 5\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
      expect(screen.getByText(/Charmander/i)).toBeInTheDocument()
    })
  })

  it('formats generation name correctly (Roman numerals)', async () => {
    const params = Promise.resolve({ name: 'generation-ii' })
    const mockGenII = {
      ...mockGenerationData,
      name: 'generation-ii',
      main_region: { name: 'johto', url: 'https://pokeapi.co/api/v2/region/2/' },
    }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGenII,
    })

    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /generation ii/i })).toBeInTheDocument()
    })
  })

  it('displays Pokemon in grid layout', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    const { container } = render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      const gridElement = container.querySelector('[class*="grid"]')
      expect(gridElement).toBeInTheDocument()
    })
  })

  it('displays region as separate section', async () => {
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/primary region/i)).toBeInTheDocument()
      expect(screen.getByText(/kanto/i)).toBeInTheDocument()
    })
  })

  it('handles generation with many Pokemon species', async () => {
    const mockGenWithManyPokemon = {
      ...mockGenerationData,
      pokemon_species: Array.from({ length: 100 }, (_, i) => ({
        name: `pokemon-${i}`,
        url: `https://pokeapi.co/api/v2/pokemon-species/${i}/`,
      })),
    }
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGenWithManyPokemon,
    })

    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Pokemon \(100 of 100\)/i)).toBeInTheDocument()
    })
  })

  it('shows no results message when search returns empty', async () => {
    const user = userEvent.setup()
    const params = Promise.resolve({ name: 'generation-i' })
    render(<GenerationDetailPage params={params} />)

    await waitFor(() => {
      expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search pokemon/i)
    await user.type(searchInput, 'nonexistent')

    await waitFor(() => {
      expect(screen.getByText(/no pokemon found matching your search/i)).toBeInTheDocument()
    })
  })
})
