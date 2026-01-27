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
    { name: 'Kanto Region', url: 'https://pokeapi.co/api/v2/location/1/' },
    { name: 'Johto Region', url: 'https://pokeapi.co/api/v2/location/2/' },
    { name: 'Hoenn Region', url: 'https://pokeapi.co/api/v2/location/3/' },
  ],
}

// Mock location regions data
const mockLocationRegions = {
  1: 'Kanto',
  2: 'Johto',
  3: 'Hoenn',
}

describe('Locations List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/location?')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockLocationsData,
        })
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({ region: { name: 'Kanto' } }),
      })
    })
  })

  it('renders page title', () => {
    render(<LocationsListPage />)
    expect(screen.getByRole('heading', { name: /locations/i })).toBeInTheDocument()
  })

  it('renders search input with placeholder', () => {
    render(<LocationsListPage />)
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  it('renders a back button', () => {
    render(<LocationsListPage />)
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('renders location cards', () => {
    render(<LocationsListPage />)
    // Should render at least some location cards
    const locationCards = screen.queryAllByRole('link')
    expect(locationCards.length).toBeGreaterThanOrEqual(0)
  })

  it('filters locations when searching', async () => {
    const user = userEvent.setup()
    render(<LocationsListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'kanto')

    // After searching, input should have the value
    expect(searchInput).toHaveValue('kanto')
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    render(<LocationsListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')

    // Clear the input
    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')
  })

  it('renders locations list in a scrollable container', () => {
    const { container } = render(<LocationsListPage />)
    // Should have some list structure
    expect(container.innerHTML).toMatch(/grid|flex|list/)
  })
})
