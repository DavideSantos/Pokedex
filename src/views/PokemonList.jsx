import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import { TYPE_COLORS } from "../utils/typeColors";

const TYPES = [
  "all","normal","fire","water","electric","grass","ice",
  "fighting","poison","ground","flying","psychic","bug",
  "rock","ghost","dragon","dark","steel","fairy",
];

const TYPE_EMOJI = {
  fire:"🔥", water:"💧", grass:"🌿", electric:"⚡", psychic:"🔮",
  dragon:"🐉", ghost:"👻", dark:"🌑", fairy:"✨", steel:"⚙️",
  ice:"❄️", fighting:"🥊", poison:"☠️", ground:"🌍", flying:"🦅",
  bug:"🐛", rock:"🪨", normal:"⭐", all:"✦",
};

export default function PokemonList() {
  const {
    pokemons, loading, totalCount, totalPages, currentPage,
    hasNext, hasPrev, nextPage, prevPage, selectedType, changeType,
  } = usePokemon();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const typeParam = searchParams.get("type") || "all";
    if (selectedType !== typeParam) changeType(typeParam);
  }, [searchParams]);

  const handleTypeClick = (type) => {
    changeType(type);
    setSearchParams(type !== "all" ? { type } : {});
  };

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-24 px-4 select-none">
      <div className="container mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">Pokédex</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Tutti i Pokémon
            </h1>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest pb-1">
              {totalCount > 0
                ? `${totalCount.toLocaleString("it-IT")} trovati · Pagina ${currentPage} / ${totalPages}`
                : "Caricamento…"}
            </p>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-red-600/40 via-white/5 to-transparent" />
        </div>

        {/* ── Type Filter ── */}
        <div className="mb-10 overflow-x-auto pb-3 -mx-4 px-4 custom-scrollbar">
          <div className="flex gap-2 w-max md:flex-wrap md:w-auto">
            {TYPES.map((type) => {
              const hex = type === "all" ? "#64748b" : TYPE_COLORS[type]?.hex || "#64748b";
              const active = selectedType === type;
              const emoji = TYPE_EMOJI[type] || "";
              return (
                <button
                  key={type}
                  onClick={() => handleTypeClick(type)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black
                    uppercase tracking-wider transition-all duration-300 border hover:scale-105 active:scale-95"
                  style={active ? {
                    backgroundColor: hex,
                    borderColor: hex,
                    color: "#fff",
                    boxShadow: `0 6px 20px ${hex}45`,
                  } : {
                    backgroundColor: `${hex}0a`,
                    color: `${hex}cc`,
                    borderColor: `${hex}20`,
                  }}>
                  <span className="text-[11px] leading-none">{emoji}</span>
                  {type === "all" ? "Tutti" : type}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="py-32 flex flex-col justify-center items-center">
            <LoadingSpinner />
            <p className="text-slate-600 font-bold text-sm mt-4 animate-pulse">Caricamento Pokédex…</p>
          </div>
        ) : pokemons.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 mb-16">
            {pokemons.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl max-w-md mx-auto px-6"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p className="text-5xl mb-5">🔍</p>
            <p className="text-white font-black text-xl mb-2">Nessun Pokémon trovato</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Non è stato possibile trovare Pokémon per il tipo selezionato in questa pagina.
            </p>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={prevPage}
              disabled={!hasPrev}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider
                transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed
                border border-white/10 text-slate-400 hover:text-white hover:border-white/25
                hover:bg-white/5 active:scale-95"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Prec.
            </button>

            <div className="px-6 py-2.5 rounded-full text-xs font-black text-slate-400 font-mono
              border border-white/5 bg-white/[0.03]">
              <span className="text-white font-extrabold">{currentPage}</span>
              <span className="mx-1.5 text-slate-600">/</span>
              {totalPages}
            </div>

            <button
              onClick={nextPage}
              disabled={!hasNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider
                transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed
                border border-white/10 text-slate-400 hover:text-white hover:border-white/25
                hover:bg-white/5 active:scale-95"
            >
              Succ.
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
