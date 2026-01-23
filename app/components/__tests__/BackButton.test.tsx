import { render, screen } from '@/app/lib/test-utils'
import BackButton from '@/app/components/BackButton'

// Mock next/navigation BEFORE any imports of the mocked module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

import { useRouter } from 'next/navigation'

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders a button element', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })

    render(<BackButton />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('displays back arrow text or icon', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })

    render(<BackButton />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent(/back|←/i)
  })

  it('calls router.back() when clicked', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })

    render(<BackButton />)

    const button = screen.getByRole('button')
    button.click()

    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('has appropriate styling classes for a back button', () => {
    const mockBack = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    })

    render(<BackButton />)

    const button = screen.getByRole('button')
    // Button should have some styling - could be text, hover effects, etc.
    expect(button.className).toBeTruthy()
  })
})
