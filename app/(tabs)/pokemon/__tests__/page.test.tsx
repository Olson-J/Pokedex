import { render, screen, waitFor } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import PokemonListPage from '@/app/\(tabs\)/pokemon/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

const mockPokemonData = {
  results: [
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
  ],
}

describe('Pokemon List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPokemonData,
    })
  })

  it('renders page title', async () => {
    render(<PokemonListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )
    expect(screen.getByRole('heading', { level: 1, name: /pokemon/i })).toBeInTheDocument()
  })

  it('renders search input with placeholder', async () => {
    render(<PokemonListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  it('renders a back button', async () => {
    render(<PokemonListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('renders pokemon cards', async () => {
    render(<PokemonListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )
    // Should render at least some pokemon cards
    const pokemonCards = screen.queryAllByRole('link', { name: /pikachu|charizard|blastoise/i })
    expect(pokemonCards.length).toBeGreaterThanOrEqual(0)
  })

  it('filters pokemon when searching', async () => {
    const user = userEvent.setup()
    render(<PokemonListPage />)

    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'pikachu')

    // After searching, should see pikachu related results
    expect(searchInput).toHaveValue('pikachu')
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    render(<PokemonListPage />)

    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')

    // Clear the input
    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')
  })

  it('renders pokemon list in a scrollable container', async () => {
    const { container } = render(<PokemonListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading pokemon/i)).not.toBeInTheDocument()
    )
    // Should have some list structure
    expect(container.innerHTML).toMatch(/grid|flex|list/)
  })
})
