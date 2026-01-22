# Pokedex Project - Task Checklist

## Phase 0: Test Infrastructure Setup

- [ ] **T0.1** Install testing dependencies (Jest, React Testing Library, @testing-library/react, @testing-library/jest-dom)
- [ ] **T0.2** Create Jest configuration (`jest.config.js`)
- [ ] **T0.3** Create test utilities and setup file (`app/lib/test-utils.tsx`)
- [ ] **T0.4** Add test scripts to `package.json` (`npm test`, `npm test:watch`)
- [ ] **T0.5** Create test examples and document testing patterns for the team

## Phase 1: Foundation & Setup

- [ ] **T1.1** Create tab layout structure (`app/(tabs)/layout.tsx`)
- [ ] **T1.2** Create tab navigation component (`app/components/TabNavigation.tsx`) with client-side rendering
- [ ] **T1.3** Update root page (`app/page.tsx`) to redirect to `/pokemon` using `redirect()` function
- [ ] **T1.4** Create API integration utility (`app/lib/pokeapi.ts`) with fetch helpers for Pokemon, Locations, Moves, Generations
- [ ] **T1.5** Test tab navigation and redirect functionality

## Phase 2: Reusable Components & Utilities

### BackButton Component
- [ ] **T2.1** Write tests for BackButton component (click handler, returns to previous page)
- [ ] **T2.1a** Run tests - verify they FAIL (before implementation)
- [ ] **T2.2** Create `BackButton.tsx` component for navigation
- [ ] **T2.3** Run tests - verify BackButton tests pass

### SearchInput Component
- [ ] **T2.4** Write tests for SearchInput component (input handling, case-insensitive matching, onChange callback)
- [ ] **T2.4a** Run tests - verify they FAIL (before implementation)
- [ ] **T2.5** Create `SearchInput.tsx` component
- [ ] **T2.6** Run tests - verify SearchInput tests pass

### Card Components
- [ ] **T2.7** Write tests for card components (PokemonCard, LocationCard, MoveCard, GenerationCard - render data, clickable links)
- [ ] **T2.7a** Run tests - verify they FAIL (before implementation)
- [ ] **T2.8** Create card components (PokemonCard, LocationCard, MoveCard, GenerationCard) in `app/components/`
- [ ] **T2.9** Run tests - verify all card component tests pass

### Utility Functions
- [ ] **T2.10** Write tests for API utility functions (data transformation, formatting)
- [ ] **T2.10a** Run tests - verify they FAIL (before implementation)
- [ ] **T2.11** Create shared utility functions in `app/lib/` (data transformation, formatting, helpers)
- [ ] **T2.12** Run tests - verify utility tests pass

### Error Handling
- [ ] **T2.13** Write tests for error handling component (display error messages, retry functionality)
- [ ] **T2.13a** Run tests - verify they FAIL (before implementation)
- [ ] **T2.14** Create error boundary or error handling component for API failures
- [ ] **T2.15** Run all Phase 2 tests - final verification before moving to list pages

## Phase 3: List Pages with Search

### Pokemon List
- [ ] **T3.1** Write tests for Pokemon list component (render list using PokemonCard, search filtering, link navigation, back button)
- [ ] **T3.1a** Run tests - verify they FAIL (before implementation)
- [ ] **T3.2** Create `/pokemon/page.tsx` with searchable Pokemon list using PokemonCard and SearchInput components
- [ ] **T3.3** Run tests - verify all Pokemon list tests pass
- [ ] **T3.4** Style Pokemon list with responsive layout (mobile/desktop)
- [ ] **T3.5** Run tests again after styling

### Locations List
- [ ] **T3.6** Write tests for locations list component (render list, search, back button)
- [ ] **T3.6a** Run tests - verify they FAIL (before implementation)
- [ ] **T3.7** Create `/locations/page.tsx` with searchable locations list using LocationCard and SearchInput components
- [ ] **T3.8** Run tests - verify all locations list tests pass
- [ ] **T3.9** Style locations list with responsive layout
- [ ] **T3.9a** Run tests again after styling

### Moves List
- [ ] **T3.10** Write tests for moves list component (render list, search, back button)
- [ ] **T3.10a** Run tests - verify they FAIL (before implementation)
- [ ] **T3.11** Create `/moves/page.tsx` with searchable moves list using MoveCard and SearchInput components
- [ ] **T3.12** Run tests - verify all moves list tests pass
- [ ] **T3.13** Style moves list with responsive layout
- [ ] **T3.13a** Run tests again after styling

### Generations List
- [ ] **T3.14** Write tests for generations list component (render list, search, back button)
- [ ] **T3.14a** Run tests - verify they FAIL (before implementation)
- [ ] **T3.15** Create `/generations/page.tsx` with searchable generations list using GenerationCard and SearchInput components
- [ ] **T3.16** Run tests - verify all generations list tests pass
- [ ] **T3.17** Style generations list with responsive layout
- [ ] **T3.17a** Run tests again after styling

## Phase 4: Detail Pages

### Pokemon Detail Page
- [ ] **T4.1** Write tests for Pokemon detail page (render info, display stats, sprites, location links, move links, back button)
- [ ] **T4.1a** Run tests - verify they FAIL (before implementation)
- [ ] **T4.2** Create dynamic route `/pokemon/[name]/page.tsx`
- [ ] **T4.3** Display Pokemon name, ID, and types
- [ ] **T4.4** Display Pokemon stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed)
- [ ] **T4.5** Display normal and shiny sprites using Next.js `<Image>` component
- [ ] **T4.6** Fetch and display locations where Pokemon can be found (as clickable links)
- [ ] **T4.7** Fetch and display moves Pokemon can learn (as clickable links)
- [ ] **T4.8** Add back button to Pokemon detail page (returns to `/pokemon`)
- [ ] **T4.9** Run tests - verify all Pokemon detail tests pass
- [ ] **T4.9a** Style Pokemon detail page with responsive layout (mobile/desktop)
- [ ] **T4.9b** Run tests again after styling

### Location Detail Page
- [ ] **T4.10** Write tests for location detail page (render name, region, sub-areas, Pokemon links, back button)
- [ ] **T4.10a** Run tests - verify they FAIL (before implementation)
- [ ] **T4.11** Create dynamic route `/locations/[name]/page.tsx`
- [ ] **T4.12** Display location name and region
- [ ] **T4.13** Display sub-areas with Pokemon that can be found there (clickable links)
- [ ] **T4.14** Add back button to location detail page (returns to `/locations`)
- [ ] **T4.15** Run tests - verify all location detail tests pass
- [ ] **T4.15a** Style location detail page with responsive layout (mobile/desktop)
- [ ] **T4.15b** Run tests again after styling

### Move Detail Page
- [ ] **T4.16** Write tests for move detail page (render name, type, stats, flavor text, Pokemon links, back button)
- [ ] **T4.16a** Run tests - verify they FAIL (before implementation)
- [ ] **T4.17** Create dynamic route `/moves/[name]/page.tsx`
- [ ] **T4.18** Display move name, type, accuracy, power, and power points
- [ ] **T4.19** Display flavor text for each game generation
- [ ] **T4.20** Display list of Pokemon that can learn the move (clickable links)
- [ ] **T4.21** Add back button to move detail page (returns to `/moves`)
- [ ] **T4.22** Run tests - verify all move detail tests pass
- [ ] **T4.22a** Style move detail page with responsive layout (mobile/desktop)
- [ ] **T4.22b** Run tests again after styling

### Generation Detail Page
- [ ] **T4.23** Write tests for generation detail page (render name, region, Pokemon links, back button)
- [ ] **T4.23a** Run tests - verify they FAIL (before implementation)
- [ ] **T4.24** Create dynamic route `/generations/[name]/page.tsx`
- [ ] **T4.25** Display generation name and primary region
- [ ] **T4.26** Display list of Pokemon in the generation (clickable links)
- [ ] **T4.27** Add back button to generation detail page (returns to `/generations`)
- [ ] **T4.28** Run tests - verify all generation detail tests pass
- [ ] **T4.28a** Style generation detail page with responsive layout (mobile/desktop)
- [ ] **T4.28b** Run tests again after styling

## Phase 5: Cross-Page Navigation & Linking

- [ ] **T5.1** Verify all Pokemon names in lists link to `/pokemon/[name]`
- [ ] **T5.2** Verify all locations in lists and detail pages link to `/locations/[name]`
- [ ] **T5.3** Verify all moves in lists and detail pages link to `/moves/[name]`
- [ ] **T5.4** Verify all generations in lists link to `/generations/[name]`
- [ ] **T5.5** Test back button on all pages (list and detail pages)

## Phase 6: Responsive Design & Polish

- [ ] **T6.1** Test all list pages on mobile (< 640px), tablet (640px-1024px), and desktop (> 1024px)
- [ ] **T6.2** Test all detail pages on mobile, tablet, and desktop
- [ ] **T6.3** Verify tab navigation is mobile-friendly (stack on mobile, horizontal on desktop)
- [ ] **T6.4** Ensure images are responsive and load efficiently
- [ ] **T6.5** Test search functionality on mobile (touch keyboard input)
- [ ] **T6.6** Verify all spacing, padding, and font sizes are appropriate across screen sizes

## Phase 7: Optimization & Error Handling

- [ ] **T7.1** Add loading states for API calls
- [ ] **T7.2** Add error states and messages for failed API requests
- [ ] **T7.3** Optimize images using Next.js `<Image>` component and responsive sizing
- [ ] **T7.4** Consider implementing result limit pagination for large lists
- [ ] **T7.5** Test performance with browser DevTools (Lighthouse)

## Phase 8: Final Testing & Deployment

- [ ] **T8.1** Run full test suite (`npm test`) - all tests must pass
- [ ] **T8.2** Run ESLint to verify code quality (`npm run lint`)
- [ ] **T8.3** Test build process (`npm run build`) and check for errors
- [ ] **T8.4** Test production build locally (`npm run start`)
- [ ] **T8.5** Verify all routes work correctly
- [ ] **T8.6** Verify no broken links or missing pages
- [ ] **T8.7** Final mobile and desktop cross-browser testing
- [ ] **T8.8** Verify all tests still pass on final build

---

## Legend
- **T[Phase].[Number]**: Task identifier
- Phases: 0=Testing Setup, 1=Foundation, 2=Components, 3=Lists, 4=Details, 5=Navigation, 6=Responsive, 7=Optimization, 8=Testing
- **TDD Workflow**: Tests are written and run FAIL (before implementation), then implementation is written, then tests are run PASS. Re-run tests after each code change to catch regressions immediately.
- **Reusable Components First**: Phase 2 builds all reusable components before using them in Phase 3 & 4 list and detail pages
