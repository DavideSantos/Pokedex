# Pokédex

> Pokédex completo costruito con React 19 + Vite, che consuma la [PokéAPI v2](https://pokeapi.co/api/v2/).

🌐 **Live:** [davide-santos-pokedex.netlify.app](https://davide-santos-pokedex.netlify.app/)

---

## Funzionalità principali

- **Elenco paginato** di oltre 1.025 Pokémon con navigazione prev/next e salto diretto a pagina
- **Filtro per tipo** — 18 tipi disponibili (Fuoco, Acqua, Erba, Drago…) con aggiornamento istantaneo
- **Ricerca in tempo reale** — autocomplete sul nome nella Navbar, indice globale caricato una sola volta e tenuto in \`localStorage\`
- **Pagina di dettaglio** — sprite HD, identità (tipo, altezza, peso, esperienza), statistiche animate, abilità, mosse; navigazione prev/next tra Pokémon
- **Confronto statistiche** — scegli due Pokémon e confronta le sei stat principali fianco a fianco con indicatori WIN/TIE e totale BST
- **UI interamente in italiano**

---

## Stack tecnologico

| Layer | Tecnologia |
|---|---|
| Frontend | React 19 + Vite 7 |
| Routing | React Router v6 |
| Stile | Tailwind CSS v4 |
| Componenti UI | MUI v7 (solo Drawer/Sidebar) |
| Dati | PokéAPI v2 (REST, nessuna API key) |
| Deploy | Netlify / Docker |

---

## Struttura del progetto

\`\`\`
src/
├── index.jsx               # Entry point — BrowserRouter + PokemonProvider
├── App.jsx                 # Definizione route
├── context/
│   └── PokemonContext.jsx  # Stato globale + hook usePokemon()
├── views/
│   ├── Home.jsx            # Landing page con hero, feature cards, griglia tipi
│   ├── PokemonList.jsx     # Lista paginata con filtro tipo (/all-pokemon)
│   ├── SearchResults.jsx   # Risultati ricerca per stringa (/search?q=)
│   ├── PokemonDetail.jsx   # Pagina dettaglio Pokémon (/pokemon-detail/:id)
│   └── StatsComparison.jsx # Confronto statistiche (/compare)
├── components/
│   ├── Navbar.jsx          # Barra fissa con ricerca autocomplete e link
│   ├── Card.jsx            # Card con effetto olografico al hover
│   ├── CardDetail.jsx      # Layout a 2 colonne per la pagina dettaglio
│   ├── Sidebar.jsx         # Drawer filtro tipo (MUI)
│   ├── StatBar.jsx         # Barra animata per singola statistica
│   ├── TypeBadge.jsx       # Badge colorato per tipo Pokémon
│   └── LoadingSpinner.jsx  # Pokéball spinner durante il caricamento
└── utils/
    └── typeColors.js       # Mappa dei 18 tipi → colori hex
\`\`\`

### Route

| Path | Vista | Descrizione |
|---|---|---|
| \`/\` | \`Home.jsx\` | Landing page |
| \`/all-pokemon\` | \`PokemonList.jsx\` | Griglia paginata con filtro |
| \`/search?q=\` | \`SearchResults.jsx\` | Risultati ricerca |
| \`/pokemon-detail/:pokemonId\` | \`PokemonDetail.jsx\` | Dettaglio Pokémon |
| \`/compare\` | \`StatsComparison.jsx\` | Confronto statistiche |

### State management — \`PokemonContext.jsx\`

- **Indice globale** — tutti i ~1.025 Pokémon (nome + ID) caricati al mount e cachati in \`localStorage\`
- **Fetch paginato** — 20 Pokémon per pagina (\`PAGE_SIZE = 20\`), richiesti freschi da PokeAPI
- **Filtro tipo** — endpoint \`/type/{typeName}\`, risultati salvati in \`typePokemonList\`
- **Hook pubblico** \`usePokemon()\` — espone \`pokemons\`, \`loading\`, \`nextPage\`, \`prevPage\`, \`goToPage\`, \`filterByType\`, \`searchIndex\`

---

## Avvio rapido

### Prerequisiti

- Node.js ≥ 18
- npm ≥ 9

### Installazione

\`\`\`bash
git clone https://github.com/DavideSantos/Pokedex.git
cd Pokedex
npm install
\`\`\`

### Comandi disponibili

\`\`\`bash
npm run dev        # Server di sviluppo Vite su http://localhost:3000
npm run build      # Build di produzione → dist/
npm run preview    # Anteprima locale della build
npm run buildtail  # Compila Tailwind CSS una volta (src/input.css → src/App.css)
npm run watch      # Compila Tailwind CSS in modalità watch
\`\`\`

---

## Docker

\`\`\`bash
# Build e avvio con Docker Compose
docker compose up --build

# Oppure manualmente
docker build -t pokedex .
docker run -p 3000:3000 pokedex
\`\`\`

L'app sarà disponibile su \`http://localhost:3000\`.

---

## Deploy su Netlify

La repo è configurata per il deploy automatico su Netlify.

\`\`\`toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
\`\`\`

Ogni push su \`master\` avvia una nuova build e aggiorna la versione live.

---

## API utilizzate

Base URL: \`https://pokeapi.co/api/v2/\`

| Endpoint | Utilizzo |
|---|---|
| \`/pokemon?limit=2000\` | Indice globale per la ricerca (cached) |
| \`/pokemon?limit=20&offset=X\` | Lista paginata |
| \`/type/{typeName}\` | Filtro per tipo |
| \`/pokemon/{id}\` | Pagina di dettaglio |

---

## Convenzioni di sviluppo

- **\`typeColors.js\`** — importa sempre da \`utils/typeColors.js\` per colorare badge e bordi; non hardcodare valori hex inline
- **\`usePokemon()\`** — usa l'hook in qualsiasi view o componente che necessiti di dati Pokémon; non fare fetch diretti a PokeAPI nei componenti
- **MUI** — usato esclusivamente per \`<Drawer>\` / \`<List>\` in \`Sidebar.jsx\`; non estendere ad altri componenti
- **Effetti olografici** — implementati come inline React styles in \`Card.jsx\`; mantenerli lì
- **Lingua UI** — tutto il testo rivolto all'utente è in **italiano**

---

## Licenza

Questo progetto è a scopo educativo e non è affiliato con Nintendo o The Pokémon Company.
I dati Pokémon sono forniti da [PokéAPI](https://pokeapi.co/) sotto licenza open.
