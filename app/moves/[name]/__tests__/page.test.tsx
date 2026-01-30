// Mock Next.js modules BEFORE imports
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}))

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>
})

import { render, screen } from '@/app/lib/test-utils'
import MoveDetailView from '@/app/components/MoveDetailView'

const mockMove = {
  id: 1,
  name: 'thunderbolt',
  accuracy: 100,
  power: 90,
  pp: 15,
  type: { name: 'electric' },
  damage_class: { name: 'special' },
  flavor_text_entries: [
    {
      flavor_text: 'A strong electric blast crashes down on the target.',
      language: { name: 'en' },
      version_group: { name: 'sword-shield' },
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
  ],
}

describe('Move Detail View', () => {
  it('renders move name, type, and stats', () => {
    render(<MoveDetailView move={mockMove} />)

    expect(screen.getByRole('heading', { name: /thunderbolt/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /type/i })).toBeInTheDocument()
    expect(screen.getAllByText(/electric/i).length).toBeGreaterThan(0)
    expect(screen.getByText('90')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('renders English flavor text only', () => {
    render(<MoveDetailView move={mockMove} />)

    expect(screen.getByText(/strong electric blast/i)).toBeInTheDocument()
    expect(screen.queryByText(/puissant éclair/i)).not.toBeInTheDocument()
  })

  it('renders learned-by list and links', () => {
    render(<MoveDetailView move={mockMove} />)

    const pikachuLink = screen.getByRole('link', { name: /pikachu/i })
    const raichuLink = screen.getByRole('link', { name: /raichu/i })

    expect(pikachuLink).toHaveAttribute('href', '/pokemon/pikachu')
    expect(raichuLink).toHaveAttribute('href', '/pokemon/raichu')
  })

  it('renders a back button', () => {
    render(<MoveDetailView move={mockMove} />)

    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument()
  })
})
