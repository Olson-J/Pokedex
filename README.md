This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Pokedex
Assignment 1: the Ultimate Pokedex

Use this API https://pokeapi.co/docs/v2 to make a Pokedex using NextJS.

Pages:
- /
  - home page, has tabs for pokemon, locations, moves, and generations pages
- /pokemon
  - nested route of the home page that displays a searchable list of pokemon
- /locations
  - A nested route of the home page that displays a searchable list of game locations
- /moves
  - A nested route of the home page that displays a searchable list of moves
- /generations
  - A nested route of the home page that displays a searchable list of generations
- /pokemon/[name]
  - Displays the details for a individual Pokemon including its stats, normal and shiny sprites, where it can be found (the locations not the individual sub areas), and the moves it learns. When one of its locations or moves is clicked it should link to the appropriate page.
- /locations/[name]
  - Displays the name of the location, the region it is found in, and each of the sub areas. Each sub area should display a list of Pokemon that can be found there. Clicking on a Pokemon takes you to the appropriate page.
- /moves[name]
  - Displays the name, accuracy, power points, and power of a move. Displays the flavor text for each game it appears in. Displays a list of Pokemon that can learn the move. Clicking on a Pokemon should take you to the appropriate page.
- /generation/[name]
  - Displays the name and primary region of the generation. Also displays a list of Pokemon that are a part of that generation.
 
# General requirements
- lists should be (client side) searchable
- each page should have a functioning back button
- the application should be usable on mobile screens
