import { render, screen } from '@/app/lib/test-utils'
import userEvent from '@testing-library/user-event'
import ErrorDisplay from '@/app/components/ErrorDisplay'

describe('ErrorDisplay', () => {
  it('renders error message', () => {
    const onRetry = jest.fn()
    render(
      <ErrorDisplay
        error="Failed to load Pokemon"
        onRetry={onRetry}
      />
    )

    expect(screen.getByText(/failed to load pokemon/i)).toBeInTheDocument()
  })

  it('displays a retry button', () => {
    const onRetry = jest.fn()
    render(
      <ErrorDisplay
        error="Network error"
        onRetry={onRetry}
      />
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    expect(retryButton).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const onRetry = jest.fn()
    const user = userEvent.setup()

    render(
      <ErrorDisplay
        error="Failed to fetch"
        onRetry={onRetry}
      />
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    await user.click(retryButton)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('displays error icon or visual indicator', () => {
    const onRetry = jest.fn()
    const { container } = render(
      <ErrorDisplay
        error="Something went wrong"
        onRetry={onRetry}
      />
    )

    // Should have some styling indicating an error
    expect(container.textContent).toContain('Something went wrong')
    expect(container.querySelector('[class*="error"], [class*="red"], [class*="alert"]')).toBeInTheDocument()
  })

  it('has appropriate error styling classes', () => {
    const onRetry = jest.fn()
    const { container } = render(
      <ErrorDisplay
        error="API error"
        onRetry={onRetry}
      />
    )

    const errorContainer = container.firstChild
    expect(errorContainer?.className).toMatch(/p-|rounded|border|bg-/)
  })
})
