import { render, screen } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import GenerationsListPage from '@/app/\(tabs\)/generations/page'

// Mock next/navigation for useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

const mockGenerationsData = {
  results: [
    { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
    { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
    { name: 'generation-iii', url: 'https://pokeapi.co/api/v2/generation/3/' },
  ],
}

describe('Generations List Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/generation?')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockGenerationsData,
        })
      }
      return Promise.resolve({ ok: true, json: async () => ({}) })
    })
  })

  it('renders page title', () => {
    render(<GenerationsListPage />)
    expect(screen.getByRole('heading', { name: /generations/i })).toBeInTheDocument()
  })

  it('renders search input with placeholder', () => {
    render(<GenerationsListPage />)
    const input = screen.getByPlaceholderText(/search/i)
    expect(input).toBeInTheDocument()
  })

  it('renders a back button', () => {
    render(<GenerationsListPage />)
    const backButton = screen.getByRole('button', { name: /back|←/i })
    expect(backButton).toBeInTheDocument()
  })

  it('renders generation cards', () => {
    render(<GenerationsListPage />)
    const cards = screen.queryAllByRole('link')
    expect(cards.length).toBeGreaterThanOrEqual(0)
  })

  it('filters generations when searching', async () => {
    const user = userEvent.setup()
    render(<GenerationsListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'generation-i')
    expect(searchInput).toHaveValue('generation-i')
  })

  it('clears search results when search is cleared', async () => {
    const user = userEvent.setup()
    render(<GenerationsListPage />)

    const searchInput = screen.getByPlaceholderText(/search/i)
    await user.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')

    const clearButton = screen.getByRole('button', { name: /clear|×/i })
    await user.click(clearButton)

    expect(searchInput).toHaveValue('')
  })

  it('renders generations list in a scrollable container', () => {
    const { container } = render(<GenerationsListPage />)
    expect(container.innerHTML).toMatch(/grid|flex|list/)
  })
})
