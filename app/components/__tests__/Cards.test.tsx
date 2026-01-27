// Mock next/link BEFORE any imports of components that use it
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>
  }
})

import { render, screen } from '@/app/lib/test-utils'
import PokemonCard from '@/app/components/PokemonCard'
import LocationCard from '@/app/components/LocationCard'
import MoveCard from '@/app/components/MoveCard'
import GenerationCard from '@/app/components/GenerationCard'

describe('PokemonCard', () => {
  it('renders pokemon name', () => {
    render(<PokemonCard name="Pikachu" />)
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('renders as a link to pokemon detail page', () => {
    render(<PokemonCard name="Pikachu" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemon/pikachu')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<PokemonCard name="Pikachu" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('LocationCard', () => {
  it('renders location name', () => {
    render(<LocationCard name="Viridian Forest" />)
    expect(screen.getByText('Viridian Forest')).toBeInTheDocument()
  })

  it('renders as a link to location detail page', () => {
    render(<LocationCard name="Viridian Forest" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/locations/viridian-forest')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<LocationCard name="Viridian Forest" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('MoveCard', () => {
  it('renders move name', () => {
    render(<MoveCard name="Thunderbolt" />)
    expect(screen.getByText('Thunderbolt')).toBeInTheDocument()
  })

  it('renders as a link to move detail page', () => {
    render(<MoveCard name="Thunderbolt" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/moves/thunderbolt')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<MoveCard name="Thunderbolt" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('GenerationCard', () => {
  it('renders generation name', () => {
    render(<GenerationCard name="Generation I" />)
    expect(screen.getByText('Generation I')).toBeInTheDocument()
  })

  it('renders as a link to generation detail page', () => {
    render(<GenerationCard name="Generation I" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/generations/generation-i')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<GenerationCard name="Generation I" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})
