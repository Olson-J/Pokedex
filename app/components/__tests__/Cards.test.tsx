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
    render(<PokemonCard name="Pikachu" id={25} />)
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('renders as a link to pokemon detail page', () => {
    render(<PokemonCard name="Pikachu" id={25} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemon/pikachu')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<PokemonCard name="Pikachu" id={25} />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('LocationCard', () => {
  it('renders location name', () => {
    render(<LocationCard name="Viridian Forest" region="Kanto" />)
    expect(screen.getByText('Viridian Forest')).toBeInTheDocument()
  })

  it('renders location region', () => {
    render(<LocationCard name="Viridian Forest" region="Kanto" />)
    expect(screen.getByText('Kanto')).toBeInTheDocument()
  })

  it('renders as a link to location detail page', () => {
    render(<LocationCard name="Viridian Forest" region="Kanto" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/locations/viridian-forest')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<LocationCard name="Viridian Forest" region="Kanto" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('MoveCard', () => {
  it('renders move name', () => {
    render(<MoveCard name="Thunderbolt" type="electric" />)
    expect(screen.getByText('Thunderbolt')).toBeInTheDocument()
  })

  it('renders move type', () => {
    render(<MoveCard name="Thunderbolt" type="electric" />)
    expect(screen.getByText('electric')).toBeInTheDocument()
  })

  it('renders as a link to move detail page', () => {
    render(<MoveCard name="Thunderbolt" type="electric" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/moves/thunderbolt')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<MoveCard name="Thunderbolt" type="electric" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})

describe('GenerationCard', () => {
  it('renders generation name', () => {
    render(<GenerationCard name="Generation I" region="Kanto" />)
    expect(screen.getByText('Generation I')).toBeInTheDocument()
  })

  it('renders generation region', () => {
    render(<GenerationCard name="Generation I" region="Kanto" />)
    expect(screen.getByText('Kanto')).toBeInTheDocument()
  })

  it('renders as a link to generation detail page', () => {
    render(<GenerationCard name="Generation I" region="Kanto" />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/generations/generation-i')
  })

  it('has appropriate card styling classes', () => {
    const { container } = render(<GenerationCard name="Generation I" region="Kanto" />)
    const card = container.querySelector('div[class*="p-4"]') || container.querySelector('div')
    expect(card?.className).toMatch(/p-4|rounded|border/)
  })
})
