# Pokedex — Agent Instructions

React 19 + Vite + Tailwind CSS Pokédex app that consumes [PokéAPI v2](https://pokeapi.co/api/v2/).
Live at: <https://davide-santos-pokedex.netlify.app/>

## Commands

```bash
npm run dev        # Dev server (Vite, hot reload)
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run buildtail  # Compile Tailwind CSS once (src/input.css → src/App.css)
npm run watch      # Compile Tailwind CSS in watch mode
```

> **Never run `npm test`** — no test suite exists. Lint is also not configured.

## Architecture

```
src/
  index.jsx              # Entry point; wraps app in BrowserRouter + PokemonProvider
  App.jsx                # Route definitions
  context/
    PokemonContext.jsx   # Global state + usePokemon() hook (single source of truth)
  views/                 # Page-level components (one per route)
  components/            # Reusable UI components
  utils/
    typeColors.js        # 18 Pokémon type → hex color mapping
```

### Routes

| Path                         | View                | Purpose                         |
| ---------------------------- | ------------------- | ------------------------------- |
| `/`                          | `Home.jsx`          | Hero landing page               |
| `/all-pokemon`               | `PokemonList.jsx`   | Paginated grid with type filter |
| `/search?q=`                 | `SearchResults.jsx` | Substring search results        |
| `/pokemon-detail/:pokemonId` | `PokemonDetail.jsx` | Full Pokémon stats              |

### State Management (`PokemonContext.jsx`)

- **Global index** — all ~2,000 Pokémon names/IDs fetched once on mount and cached in `localStorage`.
- **Paginated fetching** — 20 Pokémon per page (`PAGE_SIZE = 20`) fetched fresh from PokeAPI.
- **Type filter** — hits `/type/{typeName}` endpoint, stores result in `typePokemonList`.
- Public API: `usePokemon()` exposes `pokemons`, `loading`, `nextPage`, `prevPage`, `goToPage`, `filterByType`, `searchIndex`, etc.

## Styling Conventions

- **Tailwind CSS v4** for everything: utility classes, responsive grid, dark background (`#030712`).
- **MUI v7** is used _only_ for `<Drawer>` / `<List>` in `Sidebar.jsx`. Do not expand MUI usage to other components.
- Holographic hover effects (radial glows, sweep animations) are implemented as **inline React styles** in `Card.jsx`; keep them there.
- Tailwind config is in `tailwind.config.js`. Source CSS: `src/input.css` → compiled output: `src/App.css`.

## Key Patterns

- **`typeColors.js`**: Always import from `utils/typeColors.js` when coloring type badges or borders. Do not hardcode type hex values inline.
- **`usePokemon()`**: Use this hook in any view or component that needs Pokémon data. Do not fetch from PokeAPI directly in components.
- **`PAGE_SIZE`**: Defined in `PokemonContext.jsx`. Change it only there.
- **Adjacent Pokémon navigation**: `CardDetail.jsx` uses the global index to link to prev/next Pokémon by ID.
- **UI language**: All user-facing text (labels, headings, error messages) is in **Italian**.

## API

PokeAPI v2 base URL: `https://pokeapi.co/api/v2/`

| Endpoint                     | Used for                                             |
| ---------------------------- | ---------------------------------------------------- |
| `/pokemon?limit=2000`        | Build global search index (cached in `localStorage`) |
| `/pokemon?limit=20&offset=X` | Paginated list                                       |
| `/type/{typeName}`           | Type filter                                          |
| `/pokemon/{id}`              | Detail page                                          |

## Deployment

- **Netlify**: `npm run build` → deploys `dist/`. Config in `netlify.toml`.
- **Docker**: Multi-stage build (Node 18-alpine → Vite build → `serve` on port 3000). Config in `Dockerfile`.
