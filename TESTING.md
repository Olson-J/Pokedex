# Testing Guide for Pokedex Project

## Overview

This project uses **Jest** and **React Testing Library** for testing. We follow a Test-Driven Development (TDD) approach where tests are written before functionality.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm test:watch
```

## Test Structure

Tests should be placed in one of these locations:
- `__tests__` folder: `app/components/__tests__/BackButton.test.tsx`
- Next to the file being tested: `app/components/BackButton.test.tsx`

## Writing Component Tests

### Example: BackButton Component Test

```tsx
import { render, screen } from '@/lib/test-utils'
import BackButton from '@/components/BackButton'

describe('BackButton', () => {
  it('renders a button with back text', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('navigates back when clicked', () => {
    const { useRouter } = require('next/router')
    useRouter.mockReturnValue({
      back: jest.fn(),
    })
    
    render(<BackButton />)
    const button = screen.getByRole('button')
    button.click()
    // Assert router.back() was called
  })
})
```

### Example: SearchInput Component Test

```tsx
import { render, screen } from '@/lib/test-utils'
import userEvent from '@testing-library/user-event'
import SearchInput from '@/components/SearchInput'

describe('SearchInput', () => {
  it('renders an input field', () => {
    const onChange = jest.fn()
    render(<SearchInput value="" onChange={onChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const onChange = jest.fn()
    const user = userEvent.setup()
    
    render(<SearchInput value="" onChange={onChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'pikachu')
    expect(onChange).toHaveBeenCalled()
  })

  it('performs case-insensitive search', () => {
    // Test that search matches both uppercase and lowercase
  })
})
```

## Testing Best Practices

### 1. Test User Behavior, Not Implementation
```tsx
// ❌ DON'T do this - testing implementation details:
// expect(component.state.searchTerm).toBe('pikachu')

// ✅ DO this - testing visible behavior:
expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument()
```

### 2. Use Semantic Queries
```tsx
// ✅ Good semantic queries (preferred):
screen.getByRole('button', { name: /back/i })
screen.getByLabelText('Search Pokemon')
screen.getByDisplayValue('pikachu')

// ❌ DON'T use fragile selectors:
// screen.getByTestId('search-input')
```

### 3. Test Rendering and Interactions
```tsx
describe('PokemonList', () => {
  it('renders list of pokemon', () => {
    render(<PokemonList pokemon={mockPokemon} />)
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('filters list when searching', async () => {
    const user = userEvent.setup()
    render(<PokemonList pokemon={mockPokemon} />)
    
    const searchInput = screen.getByRole('textbox')
    await user.type(searchInput, 'pika')
    
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument()
  })
})
```

## Test Organization

### Unit Tests
Test individual utility functions and components in isolation:

```tsx
// app/lib/__tests__/pokemonUtils.test.ts
describe('formatPokemonName', () => {
  it('converts lowercase to title case', () => {
    expect(formatPokemonName('pikachu')).toBe('Pikachu')
  })
})
```

### Component Tests
Test React components with their props and interactions:

```tsx
// app/components/__tests__/PokemonCard.test.tsx
describe('PokemonCard', () => {
  it('renders pokemon information', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
  })

  it('links to pokemon detail page', () => {
    render(<PokemonCard pokemon={mockPokemon} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/pokemon/pikachu')
  })
})
```

## TDD Workflow

1. **Write Tests** (RED) - Tests fail because code doesn't exist yet
   ```bash
   npm test:watch
   # See tests FAIL ❌
   ```

2. **Write Code** (GREEN) - Implement functionality to make tests pass
   ```bash
   # Tests should PASS ✅
   ```

3. **Refactor** (BLUE) - Improve code while keeping tests passing
   ```bash
   # Run tests after styling/refactoring
   npm test
   # Ensure tests still PASS ✅
   ```

## Mock Data

Create mock data files for consistent test data:

```tsx
// app/__mocks__/pokemon.ts
export const mockPokemon = {
  id: 25,
  name: 'pikachu',
  types: ['electric'],
  sprites: {
    front_default: 'url...',
    front_shiny: 'url...',
  },
  stats: [
    { stat: { name: 'hp' }, base_stat: 35 },
    // ...
  ],
}
```

## Debugging Tests

### View Rendered Output
```tsx
import { render, screen } from '@/lib/test-utils'

render(<Component />)
screen.debug() // Prints the entire DOM
```

### Check Accessible Elements
```tsx
// List all accessible role queries available
screen.logTestingPlaygroundURL()
```

### Run Single Test
```bash
npm test -- BackButton.test.tsx
```

## Common Testing Patterns

### Testing Links
```tsx
const link = screen.getByRole('link', { name: /pikachu/i })
expect(link).toHaveAttribute('href', '/pokemon/pikachu')
```

### Testing Forms
```tsx
const input = screen.getByRole('textbox')
await userEvent.type(input, 'search term')
const button = screen.getByRole('button', { name: /search/i })
await userEvent.click(button)
```

### Testing Async Data
```tsx
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Pokemon Loaded')).toBeInTheDocument()
})
```

## Useful Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
