import { render, screen } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import GenerationDetailView from '@/app/components/GenerationDetailView'

// Mock next/navigation for BackButton
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

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

describe('Generation Detail View', () => {
  it('renders generation name and region', () => {
    render(<GenerationDetailView generation={mockGenerationData} />)

    expect(screen.getByRole('heading', { level: 1, name: /generation i/i })).toBeInTheDocument()
    expect(screen.getByText(/Primary Region/i)).toBeInTheDocument()
    expect(screen.getByText(/kanto/i)).toBeInTheDocument()
  })

  it('renders Pokemon list with count', () => {
    render(<GenerationDetailView generation={mockGenerationData} />)

    expect(screen.getByText(/Pokemon \(5 of 5\)/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /bulbasaur/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /charmander/i })).toBeInTheDocument()
  })

  it('filters Pokemon by search term', async () => {
    const user = userEvent.setup()
    render(<GenerationDetailView generation={mockGenerationData} />)

    const searchInput = screen.getByPlaceholderText(/Search Pokemon/i)
    await user.type(searchInput, 'char')

    expect(screen.getByRole('link', { name: /charmander/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /charmeleon/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /bulbasaur/i })).not.toBeInTheDocument()
  })

  it('shows message when no Pokemon match search', async () => {
    const user = userEvent.setup()
    render(<GenerationDetailView generation={mockGenerationData} />)

    const searchInput = screen.getByPlaceholderText(/Search Pokemon/i)
    await user.type(searchInput, 'xyz')

    expect(screen.getByText(/No Pokemon found matching your search/i)).toBeInTheDocument()
  })

  it('renders Pokemon links with correct hrefs', () => {
    render(<GenerationDetailView generation={mockGenerationData} />)

    expect(screen.getByRole('link', { name: /bulbasaur/i })).toHaveAttribute('href', '/pokemon/bulbasaur')
    expect(screen.getByRole('link', { name: /charmander/i })).toHaveAttribute('href', '/pokemon/charmander')
  })

  it('renders a back button', () => {
    render(<GenerationDetailView generation={mockGenerationData} />)

    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })
})
