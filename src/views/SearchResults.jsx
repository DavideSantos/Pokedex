import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePokemon } from "../context/PokemonContext";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { globalIndex } = usePokemon();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalMatchesCount, setTotalMatchesCount] = useState(0);

  useEffect(() => {
    if (!query.trim() || !globalIndex.length) {
      setResults([]);
      setTotalMatchesCount(0);
      return;
    }

    setLoading(true);
    setError(false);
    setResults([]);

    const valLower = query.toLowerCase().trim();
    // Substring match on name or string match on ID
    const matches = globalIndex.filter(
      (p) => p.name.includes(valLower) || String(p.id) === valLower,
    );

    setTotalMatchesCount(matches.length);

    if (matches.length === 0) {
      setLoading(false);
      return;
    }

    // Limit visible search results fetch to a performance-friendly number (e.g. 24)
    const slicedMatches = matches.slice(0, 24);

    // Fetch detail payloads concurrently
    Promise.all(
      slicedMatches.map((p) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`).then((res) => {
          if (!res.ok)
            throw new Error("Network error during search details fetch");
          return res.json();
        }),
      ),
    )
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        console.error("Search fetch failed:", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, globalIndex]);

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-20 px-4 select-none">
      <div className="container mx-auto max-w-7xl">
        {/* Back Link */}
        <Link
          to="/all-pokemon"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-white
            text-sm font-semibold transition-colors mb-10 group">
          <svg
            className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Torna al Pokédex
        </Link>

        {/* Title Section */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
            Ricerca
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Risultati per{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500">
              "{query}"
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            La ricerca è intelligente: trova per nome parziale (es.{" "}
            <span className="text-slate-300 font-mono">saur</span>,{" "}
            <span className="text-slate-300 font-mono">char</span>) o ID esatto.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-24">
            <LoadingSpinner />
            <p className="text-center text-slate-500 text-sm font-semibold mt-4">
              Caricamento dettagli dei Pokémon trovati...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20 bg-slate-900/20 border border-white/5 rounded-3xl max-w-lg mx-auto">
            <div className="text-3xl mb-4">⚠️</div>
            <h2 className="text-white font-bold text-lg mb-1">
              Si è verificato un errore
            </h2>
            <p className="text-slate-500 text-sm px-6">
              Impossibile connettersi ai server di PokéAPI. Riprova tra qualche
              istante.
            </p>
          </div>
        )}

        {/* No Results found */}
        {!loading && !error && query && totalMatchesCount === 0 && (
          <div className="text-center py-24 bg-slate-900/10 border border-white/5 rounded-3xl max-w-xl mx-auto px-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
              style={{
                background: "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.12)",
              }}>
              🔍
            </div>
            <p className="text-white font-black text-xl mb-2">
              Nessun Pokémon trovato
            </p>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Il termine{" "}
              <span className="text-slate-300 font-mono font-bold">
                "{query}"
              </span>{" "}
              non corrisponde a nessun Pokémon registrato nel Pokédex.
            </p>
            <Link
              to="/all-pokemon"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800
                text-white font-bold rounded-full text-sm border border-white/10
                transition-all duration-200 hover:scale-[1.03]">
              Esplora tutto il Pokédex
            </Link>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                {totalMatchesCount} Pokémon{" "}
                {totalMatchesCount === 1 ? "trovato" : "trovati"}
                {totalMatchesCount > 24 && " (mostrati i primi 24)"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {results.map((p) => (
                <Card key={p.id} pokemon={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
