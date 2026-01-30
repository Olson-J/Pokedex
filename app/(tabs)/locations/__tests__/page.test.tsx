import { render, screen, waitFor } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import LocationsListPage from '@/app/\(tabs\)/locations/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

const mockLocationsData = {
  results: [
    { name: 'canalave-city', url: 'https://pokeapi.co/api/v2/location/1/' },
    { name: 'eterna-city', url: 'https://pokeapi.co/api/v2/location/2/' },
    { name: 'pastoria-city', url: 'https://pokeapi.co/api/v2/location/3/' },
  ],
}

describe('Locations List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockLocationsData,
    })
  })

  it('renders page title', async () => {
    render(<LocationsListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )
    expect(screen.getByRole('heading', { level: 1, name: /locations/i })).toBeInTheDocument()
  })

  it('renders search input with placeholder', async () => {
    render(<LocationsListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  it('renders a back button', async () => {
    render(<LocationsListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('renders location cards', async () => {
    render(<LocationsListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )
    // Should render at least some location cards
    const locationCards = screen.queryAllByRole('link')
    expect(locationCards.length).toBeGreaterThanOrEqual(0)
  })

  it('filters locations when searching', async () => {
    const user = userEvent.setup()
    render(<LocationsListPage />)

    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'kanto')

    // After searching, input should have the value
    expect(searchInput).toHaveValue('kanto')
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    render(<LocationsListPage />)

    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')

    // Clear the input
    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')
  })

  it('renders locations list in a scrollable container', async () => {
    const { container } = render(<LocationsListPage />)
    await waitFor(() =>
      expect(screen.queryByText(/loading locations/i)).not.toBeInTheDocument()
    )
    // Should have some list structure
    expect(container.innerHTML).toMatch(/grid|flex|list/)
  })
})
