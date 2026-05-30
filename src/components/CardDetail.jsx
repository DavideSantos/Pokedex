import { useState } from "react";
import { Link } from "react-router-dom";
import { getTypeColor } from "../utils/typeColors";
import { usePokemon } from "../context/PokemonContext";
import TypeBadge from "./TypeBadge";
import StatBar from "./StatBar";

const STAT_LABELS = {
  hp: "HP",
  attack: "Attacco",
  defense: "Difesa",
  "special-attack": "Sp. Att.",
  "special-defense": "Sp. Dif.",
  speed: "Velocità",
};

const TABS = [
  { id: "stats", label: "Statistiche", icon: "📊" },
  { id: "abilities", label: "Abilità", icon: "⚡" },
  { id: "moves", label: "Mosse", icon: "⚔️" },
];

export default function CardDetail({ pokemon }) {
  const [activeTab, setActiveTab] = useState("stats");
  const { globalIndex } = usePokemon();
  const primaryType = pokemon.types[0].type.name;
  const { hex } = getTypeColor(primaryType);

  const imageUrl =
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.front_default;

  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  const prevId = pokemon.id - 1;
  const nextId = pokemon.id + 1;
  const prevPokemon = globalIndex.find((p) => p.id === prevId);
  const nextPokemon = globalIndex.find((p) => p.id === nextId);

  return (
    <div className="min-h-screen bg-[#030712] py-10 px-4 select-none overflow-x-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Back nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/all-pokemon"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white
              transition-colors text-sm font-semibold group">
            <svg
              className="h-4 w-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Torna al Pokédex
          </Link>
          <Link
            to="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black
              uppercase tracking-wider border border-indigo-500/30 text-indigo-400
              hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Confronta
          </Link>
        </div>

        {/* ── Two-column layout on desktop ── */}
        <div className="flex flex-col lg:flex-row gap-5 mb-5">
          {/* LEFT: sprite + identity card */}
          <div
            className="lg:w-[340px] shrink-0 rounded-3xl overflow-hidden"
            style={{
              background: `linear-gradient(160deg, ${hex}22 0%, #07101e 55%, #030712 100%)`,
              border: `1px solid ${hex}28`,
              boxShadow: `0 0 60px ${hex}10, 0 24px 60px rgba(0,0,0,0.7)`,
            }}>
            {/* Sprite zone */}
            <div className="relative flex flex-col items-center text-center pt-10 pb-8 px-6 overflow-hidden">
              {/* Atmospheric glow */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[100px] opacity-[0.22] pointer-events-none animate-pulse-glow"
                style={{ backgroundColor: hex }}
              />
              {/* Rotating pokeball watermark */}
              <div className="absolute right-0 bottom-0 opacity-[0.04] pointer-events-none translate-x-1/3 translate-y-1/3">
                <svg
                  viewBox="0 0 200 200"
                  className="w-72 h-72 animate-rotate-slow"
                  fill="none"
                  stroke="white"
                  strokeWidth="6">
                  <circle cx="100" cy="100" r="90" />
                  <line x1="10" y1="100" x2="190" y2="100" strokeWidth="6" />
                  <circle cx="100" cy="100" r="24" fill="white" stroke="none" />
                  <circle
                    cx="100"
                    cy="100"
                    r="14"
                    fill="#030712"
                    stroke="none"
                  />
                </svg>
              </div>

              {/* ID */}
              <span
                className="relative z-10 text-[10px] font-black tracking-[0.35em] mb-3 font-mono"
                style={{ color: `${hex}90` }}>
                #{String(pokemon.id).padStart(3, "0")}
              </span>

              {/* Name */}
              <h1 className="relative z-10 text-3xl sm:text-4xl font-black text-white capitalize tracking-tight mb-4">
                {pokemon.name.replace(/-/g, " ")}
              </h1>

              {/* Type badges */}
              <div className="relative z-10 flex justify-center gap-2.5 mb-8">
                {pokemon.types.map((t) => (
                  <TypeBadge key={t.type.name} type={t.type.name} size="lg" />
                ))}
              </div>

              {/* Sprite */}
              <div className="relative z-10">
                <div
                  className="absolute inset-0 rounded-full blur-[60px] opacity-[0.45] scale-110 animate-pulse-glow"
                  style={{ backgroundColor: hex }}
                />
                <img
                  src={imageUrl}
                  alt={pokemon.name}
                  className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 object-contain
                    drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]
                    animate-float-slow"
                />
              </div>
            </div>

            {/* Quick metrics strip */}
            <div
              className="grid grid-cols-3 divide-x"
              style={{
                borderTop: `1px solid ${hex}15`,
                divideColor: `${hex}10`,
              }}>
              {[
                {
                  label: "Peso",
                  value: `${(pokemon.weight / 10).toFixed(1)} kg`,
                  icon: "⚖️",
                },
                {
                  label: "Altezza",
                  value: `${(pokemon.height / 10).toFixed(1)} m`,
                  icon: "📏",
                },
                {
                  label: "Exp. Base",
                  value: pokemon.base_experience ?? "—",
                  icon: "⭐",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 text-center"
                  style={{ background: "rgba(0,0,0,0.3)" }}>
                  <p className="text-base mb-0.5">{item.icon}</p>
                  <p className="text-[9px] uppercase tracking-widest font-black text-slate-600 mb-1">
                    {item.label}
                  </p>
                  <p className="text-white font-black text-sm tabular-nums">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: detail panel (tabs) */}
          <div
            className="flex-1 rounded-3xl overflow-hidden"
            style={{
              background: "rgba(10,15,28,0.8)",
              border: `1px solid ${hex}15`,
              backdropFilter: "blur(16px)",
            }}>
            {/* Tabs */}
            <div
              className="flex border-b"
              style={{
                borderColor: `${hex}10`,
                background: "rgba(0,0,0,0.2)",
              }}>
              {TABS.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 py-4 text-[10px] sm:text-[11px] font-black uppercase tracking-widest relative transition-all duration-300 flex items-center justify-center gap-1.5"
                    style={{ color: active ? "#fff" : "#475569" }}>
                    <span className="text-sm leading-none">{tab.icon}</span>
                    {tab.label}
                    {active && (
                      <div
                        className="absolute bottom-0 inset-x-0 h-[2px] rounded-full"
                        style={{
                          backgroundColor: hex,
                          boxShadow: `0 0 8px ${hex}`,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="p-5 sm:p-7">
              {/* Stats */}
              {activeTab === "stats" && (
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <StatBar
                      key={stat.stat.name}
                      label={STAT_LABELS[stat.stat.name] || stat.stat.name}
                      value={stat.base_stat}
                    />
                  ))}
                  <div className="pt-5 mt-2 border-t border-white/5">
                    <StatBar label="Totale BST" value={totalStats} max={780} />
                  </div>
                </div>
              )}

              {/* Abilities */}
              {activeTab === "abilities" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pokemon.abilities.map((ability, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 rounded-2xl px-5 py-4 border transition-all duration-200 hover:scale-[1.01]"
                      style={{
                        background: `linear-gradient(135deg, ${hex}08 0%, rgba(255,255,255,0.01) 100%)`,
                        borderColor: ability.is_hidden
                          ? `${hex}25`
                          : "rgba(255,255,255,0.06)",
                      }}>
                      <div
                        className="w-3 h-3 rounded-full shrink-0 shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: hex, color: hex }}
                      />
                      <div className="min-w-0">
                        <p className="text-white font-bold capitalize text-sm truncate">
                          {ability.ability.name.replace(/-/g, " ")}
                        </p>
                        <p
                          className="text-[10px] font-black uppercase tracking-wider mt-0.5"
                          style={{
                            color: ability.is_hidden ? `${hex}99` : "#475569",
                          }}>
                          {ability.is_hidden
                            ? "✦ Abilità Nascosta"
                            : "Abilità Standard"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Moves */}
              {activeTab === "moves" && (
                <div>
                  <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-4">
                    {pokemon.moves.length} mosse disponibili
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {pokemon.moves.slice(0, 60).map((move, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-[11px] font-semibold rounded-xl capitalize select-none cursor-default border transition-colors hover:border-white/10"
                        style={{
                          background: `${hex}07`,
                          borderColor: `${hex}15`,
                          color: "#94a3b8",
                        }}>
                        {move.move.name.replace(/-/g, " ")}
                      </span>
                    ))}
                    {pokemon.moves.length > 60 && (
                      <span className="px-3 py-1.5 text-slate-600 text-[11px] font-black select-none uppercase tracking-wide">
                        +{pokemon.moves.length - 60} altre
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Navigation: prev / next ── */}
        <div className="grid grid-cols-2 gap-3">
          {prevPokemon ? (
            <Link
              to={`/pokemon-detail/${prevId}`}
              className="flex items-center gap-2.5 p-4 rounded-2xl border border-white/5 hover:border-white/10
                bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 group min-w-0">
              <svg
                className="h-4 w-4 text-slate-500 group-hover:-translate-x-1 transition-transform shrink-0"
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
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${prevId}.png`}
                className="w-9 h-9 object-contain shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                alt={prevPokemon.name}
              />
              <div className="min-w-0">
                <span className="block text-[8px] font-black uppercase tracking-widest text-slate-600">
                  Precedente
                </span>
                <span className="block text-xs font-bold text-slate-300 group-hover:text-white capitalize truncate transition-colors">
                  {prevPokemon.name.replace(/-/g, " ")}
                </span>
              </div>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl border border-white/5 opacity-20 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Inizio Pokédex
              </span>
            </div>
          )}

          {nextPokemon ? (
            <Link
              to={`/pokemon-detail/${nextId}`}
              className="flex items-center justify-end gap-2.5 p-4 rounded-2xl border border-white/5 hover:border-white/10
                bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 group min-w-0 text-right">
              <div className="min-w-0">
                <span className="block text-[8px] font-black uppercase tracking-widest text-slate-600">
                  Successivo
                </span>
                <span className="block text-xs font-bold text-slate-300 group-hover:text-white capitalize truncate transition-colors">
                  {nextPokemon.name.replace(/-/g, " ")}
                </span>
              </div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextId}.png`}
                className="w-9 h-9 object-contain shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                alt={nextPokemon.name}
              />
              <svg
                className="h-4 w-4 text-slate-500 group-hover:translate-x-1 transition-transform shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl border border-white/5 opacity-20 flex items-center justify-end">
              <span className="text-xs font-bold text-slate-500">
                Fine Pokédex
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
