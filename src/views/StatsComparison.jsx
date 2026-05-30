import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getTypeColor } from "../utils/typeColors";
import { usePokemon } from "../context/PokemonContext";
import TypeBadge from "../components/TypeBadge";
import LoadingSpinner from "../components/LoadingSpinner";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attacco",
  defense: "Difesa",
  "special-attack": "Sp. Att.",
  "special-defense": "Sp. Dif.",
  speed: "Velocità",
};

const STAT_MAX = {
  hp: 255,
  attack: 190,
  defense: 230,
  "special-attack": 194,
  "special-defense": 230,
  speed: 180,
};

function PokemonSelector({ label, selected, onSelect, globalIndex }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    const lower = val.toLowerCase().trim();
    const filtered = globalIndex
      .filter((p) => p.name.includes(lower) || String(p.id).startsWith(lower))
      .slice(0, 8);
    setSuggestions(filtered);
    setOpen(true);
  };

  const choose = (p) => {
    onSelect(p.id);
    setQuery(p.name.replace(/-/g, " "));
    setOpen(false);
    setSuggestions([]);
  };

  const { hex } = selected
    ? getTypeColor(selected.types[0].type.name)
    : { hex: "#475569" };

  return (
    <div ref={ref} className="relative">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mb-3">
        {label}
      </p>

      {/* Selected card preview */}
      {selected && (
        <div
          className="rounded-2xl overflow-hidden mb-4 border transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${hex}18 0%, #07101e 100%)`,
            borderColor: `${hex}30`,
          }}>
          <div className="relative flex flex-col items-center py-6 px-4 overflow-hidden">
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[60px] opacity-30 pointer-events-none"
              style={{ backgroundColor: hex }}
            />
            <span
              className="text-[9px] font-black tracking-widest font-mono mb-1"
              style={{ color: `${hex}80` }}>
              #{String(selected.id).padStart(3, "0")}
            </span>
            <img
              src={
                selected.sprites?.other?.home?.front_default ||
                selected.sprites?.other?.dream_world?.front_default ||
                selected.sprites?.front_default
              }
              alt={selected.name}
              className="w-28 h-28 object-contain relative z-10 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
            />
            <h3 className="text-white font-black text-lg capitalize tracking-tight mt-2 relative z-10">
              {selected.name.replace(/-/g, " ")}
            </h3>
            <div className="flex gap-2 mt-2 relative z-10">
              {selected.types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} size="sm" />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setOpen(true)}
          placeholder="Cerca per nome o numero..."
          className="w-full bg-slate-900/70 border border-white/10 text-white placeholder-slate-500
            rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-500/50
            focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
        />
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="absolute left-0 right-0 mt-2 bg-slate-950/95 border border-white/10 rounded-2xl
          shadow-2xl overflow-hidden backdrop-blur-xl z-50">
          <div className="p-1.5 space-y-0.5 max-h-56 overflow-y-auto">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onClick={() => choose(p)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
                  text-slate-300 hover:bg-white/8 hover:text-white transition-all">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                  alt={p.name}
                  className="w-9 h-9 object-contain bg-white/5 rounded-lg p-0.5 shrink-0"
                />
                <div>
                  <p className="text-sm font-bold capitalize">
                    {p.name.replace(/-/g, " ")}
                  </p>
                  <p className="text-[10px] font-mono text-slate-600">
                    #{String(p.id).padStart(3, "0")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatRow({ label, valueA, valueB, hexA, hexB }) {
  const max =
    STAT_MAX[
      Object.keys(STAT_LABELS).find((k) => STAT_LABELS[k] === label) || ""
    ] || 255;
  const pctA = Math.min((valueA / max) * 100, 100);
  const pctB = Math.min((valueB / max) * 100, 100);
  const winner = valueA > valueB ? "a" : valueB > valueA ? "b" : "tie";

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3 border-b border-white/5 last:border-0">
      {/* Side A bar */}
      <div className="flex flex-col items-end gap-1">
        <span
          className={`text-sm font-black tabular-nums ${winner === "a" ? "text-white" : "text-slate-400"}`}>
          {valueA}
        </span>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex justify-end">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pctA}%`,
              backgroundColor: hexA,
              boxShadow: `0 0 6px ${hexA}70`,
            }}
          />
        </div>
      </div>

      {/* Stat label */}
      <div className="text-center min-w-[72px]">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          {label}
        </p>
        {winner === "a" && (
          <span className="text-[8px] text-emerald-400 font-black">◀ WIN</span>
        )}
        {winner === "b" && (
          <span className="text-[8px] text-emerald-400 font-black">WIN ▶</span>
        )}
        {winner === "tie" && (
          <span className="text-[8px] text-yellow-500 font-black">= TIE</span>
        )}
      </div>

      {/* Side B bar */}
      <div className="flex flex-col items-start gap-1">
        <span
          className={`text-sm font-black tabular-nums ${winner === "b" ? "text-white" : "text-slate-400"}`}>
          {valueB}
        </span>
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pctB}%`,
              backgroundColor: hexB,
              boxShadow: `0 0 6px ${hexB}70`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function StatsComparison() {
  const { globalIndex } = usePokemon();
  const [idA, setIdA] = useState(null);
  const [idB, setIdB] = useState(null);
  const [pokemonA, setPokemonA] = useState(null);
  const [pokemonB, setPokemonB] = useState(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  const fetchPokemon = async (id, setter, setLoading) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error();
      setter(await res.json());
    } catch {
      setter(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(idA, setPokemonA, setLoadingA);
  }, [idA]);
  useEffect(() => {
    fetchPokemon(idB, setPokemonB, setLoadingB);
  }, [idB]);

  const hexA = pokemonA
    ? getTypeColor(pokemonA.types[0].type.name).hex
    : "#6366f1";
  const hexB = pokemonB
    ? getTypeColor(pokemonB.types[0].type.name).hex
    : "#f43f5e";

  const totalA = pokemonA
    ? pokemonA.stats.reduce((a, s) => a + s.base_stat, 0)
    : 0;
  const totalB = pokemonB
    ? pokemonB.stats.reduce((a, s) => a + s.base_stat, 0)
    : 0;
  const canCompare = pokemonA && pokemonB;

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-24 px-4 select-none">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-2">
            Strumento
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Confronto Statistiche
            </h1>
            <p className="text-slate-600 text-xs font-bold uppercase tracking-widest pb-1">
              Seleziona due Pokémon da confrontare
            </p>
          </div>
          <div className="mt-4 h-px bg-gradient-to-r from-red-600/40 via-white/5 to-transparent" />
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative">
          {/* VS badge */}
          <div
            className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-slate-900 border border-white/15 items-center justify-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
              VS
            </span>
          </div>

          <div className="rounded-3xl p-5 border border-white/8 bg-white/[0.02]">
            {loadingA ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner />
              </div>
            ) : (
              <PokemonSelector
                label="Pokémon A"
                selected={pokemonA}
                onSelect={setIdA}
                globalIndex={globalIndex}
              />
            )}
          </div>

          <div className="rounded-3xl p-5 border border-white/8 bg-white/[0.02]">
            {loadingB ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner />
              </div>
            ) : (
              <PokemonSelector
                label="Pokémon B"
                selected={pokemonB}
                onSelect={setIdB}
                globalIndex={globalIndex}
              />
            )}
          </div>
        </div>

        {/* Comparison panel */}
        {!canCompare && (
          <div className="text-center py-20 rounded-3xl border border-white/5 bg-white/[0.015]">
            <p className="text-5xl mb-4">⚔️</p>
            <p className="text-white font-black text-xl mb-2">
              Seleziona due Pokémon
            </p>
            <p className="text-slate-500 text-sm">
              Usa i campi di ricerca sopra per scegliere i Pokémon da
              confrontare.
            </p>
          </div>
        )}

        {canCompare && (
          <div
            className="rounded-3xl overflow-hidden border"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(7,13,26,0.8)",
            }}>
            {/* Header with names */}
            <div
              className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-5 border-b border-white/5"
              style={{
                background: `linear-gradient(90deg, ${hexA}12 0%, transparent 40%, transparent 60%, ${hexB}12 100%)`,
              }}>
              <Link
                to={`/pokemon-detail/${pokemonA.id}`}
                className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: hexA }}
                />
                <span className="text-white font-black text-base sm:text-lg capitalize tracking-tight truncate group-hover:underline">
                  {pokemonA.name.replace(/-/g, " ")}
                </span>
              </Link>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-4">
                VS
              </span>
              <Link
                to={`/pokemon-detail/${pokemonB.id}`}
                className="flex items-center justify-end gap-2 group hover:opacity-80 transition-opacity">
                <span className="text-white font-black text-base sm:text-lg capitalize tracking-tight truncate text-right group-hover:underline">
                  {pokemonB.name.replace(/-/g, " ")}
                </span>
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: hexB }}
                />
              </Link>
            </div>

            {/* Stat rows */}
            <div className="px-6 py-4">
              {pokemonA.stats.map((statA) => {
                const statName = statA.stat.name;
                const statB = pokemonB.stats.find(
                  (s) => s.stat.name === statName,
                );
                return (
                  <StatRow
                    key={statName}
                    label={STAT_LABELS[statName] || statName}
                    valueA={statA.base_stat}
                    valueB={statB?.base_stat ?? 0}
                    hexA={hexA}
                    hexB={hexB}
                  />
                );
              })}
            </div>

            {/* BST total */}
            <div
              className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-5 border-t border-white/8"
              style={{ background: "rgba(0,0,0,0.3)" }}>
              <div className="text-left">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">
                  BST Totale
                </p>
                <p
                  className="text-2xl font-black tabular-nums"
                  style={{ color: totalA >= totalB ? hexA : "#475569" }}>
                  {totalA}
                </p>
              </div>
              <div className="px-4 text-center">
                {totalA > totalB ? (
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                    ◀ Vince {pokemonA.name}
                  </span>
                ) : totalB > totalA ? (
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                    {pokemonB.name} Vince ▶
                  </span>
                ) : (
                  <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500">
                    = Pareggio
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1">
                  BST Totale
                </p>
                <p
                  className="text-2xl font-black tabular-nums"
                  style={{ color: totalB >= totalA ? hexB : "#475569" }}>
                  {totalB}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/all-pokemon"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-black
              uppercase tracking-wider border border-white/10 text-slate-400 hover:text-white
              hover:border-white/25 hover:bg-white/5 transition-all duration-200">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Vai al Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}
