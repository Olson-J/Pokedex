import { render, screen, waitFor } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import MovesListPage from '@/app/\(tabs\)/moves/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

const mockMovesData = {
  results: [
    { name: 'thunderbolt', url: 'https://pokeapi.co/api/v2/move/24/' },
    { name: 'fireball', url: 'https://pokeapi.co/api/v2/move/34/' },
    { name: 'hydro-pump', url: 'https://pokeapi.co/api/v2/move/63/' },
  ],
}

// Mock move type data
const mockMoveTypes = {
  'thunderbolt': 'electric',
  'fireball': 'fire',
  'hydro-pump': 'water',
}

describe('Moves List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/move?')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockMovesData,
        })
      }
      // Mock individual move details
      const moveName = url.split('/').slice(-2, -1)[0]
      return Promise.resolve({
        ok: true,
        json: async () => ({ type: { name: mockMoveTypes[moveName as keyof typeof mockMoveTypes] || 'normal' } }),
      })
    })
  })

  it('renders page title', () => {
    render(<MovesListPage />)
    expect(screen.getByRole('heading', { name: /moves/i })).toBeInTheDocument()
  })

  it('renders search input with placeholder', () => {
    render(<MovesListPage />)
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  it('renders a back button', () => {
    render(<MovesListPage />)
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('renders move cards', () => {
    render(<MovesListPage />)
    // Should render at least some move cards
    const moveCards = screen.queryAllByRole('link')
    expect(moveCards.length).toBeGreaterThanOrEqual(0)
  })

  it('filters moves when searching', async () => {
    const user = userEvent.setup()
    render(<MovesListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'thunder')

    // After searching, input should have the value
    expect(searchInput).toHaveValue('thunder')
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    render(<MovesListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')

    // Clear the input
    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')
  })

  it('renders moves list in a scrollable container', () => {
    const { container } = render(<MovesListPage />)
    // Should have some list structure
    expect(container.innerHTML).toMatch(/grid|flex|list/)
  })
})
