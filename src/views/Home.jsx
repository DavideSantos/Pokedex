import { Link } from "react-router-dom";
import { useState } from "react";

const FEATURES = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
        />
      </svg>
    ),
    color: "#6890F0",
    title: "Ricerca Istantanea",
    desc: "Cerca qualsiasi Pokémon per nome o numero in tempo reale. Risultati istantanei grazie all'indice globale in cache.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
    color: "#78C850",
    title: "Statistiche Complete",
    desc: "HP, Attacco, Difesa, Velocità, Sp. Att., Sp. Dif. — ogni stat visualizzata con barre animate e colori dinamici.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
    color: "#F08030",
    title: "Filtro per Tipo",
    desc: "18 tipi disponibili: Fuoco, Acqua, Erba, Drago e molto altro. Filtra istantaneamente la lista completa.",
  },
];

const STATS_STRIP = [
  { value: "1025+", label: "Pokémon" },
  { value: "18", label: "Tipi" },
  { value: "IX", label: "Generazioni" },
  { value: "800+", label: "Mosse" },
];

const TYPES = [
  { name: "fire", hex: "#F08030", emoji: "🔥" },
  { name: "water", hex: "#6890F0", emoji: "💧" },
  { name: "grass", hex: "#78C850", emoji: "🌿" },
  { name: "electric", hex: "#F8D030", emoji: "⚡" },
  { name: "psychic", hex: "#F85888", emoji: "🔮" },
  { name: "dragon", hex: "#7038F8", emoji: "🐉" },
  { name: "ghost", hex: "#705898", emoji: "👻" },
  { name: "dark", hex: "#705848", emoji: "🌑" },
  { name: "fairy", hex: "#EE99AC", emoji: "✨" },
  { name: "steel", hex: "#B8B8D0", emoji: "⚙️" },
  { name: "ice", hex: "#98D8D8", emoji: "❄️" },
  { name: "fighting", hex: "#C03028", emoji: "🥊" },
  { name: "poison", hex: "#A040A0", emoji: "☠️" },
  { name: "ground", hex: "#E0C068", emoji: "🌍" },
  { name: "flying", hex: "#A890F0", emoji: "🦅" },
  { name: "bug", hex: "#A8B820", emoji: "🐛" },
  { name: "rock", hex: "#B8A038", emoji: "🪨" },
  { name: "normal", hex: "#A8A878", emoji: "⭐" },
];

/* Featured sprites shown in hero */
const FEATURED = [
  {
    id: 6,
    color: "#F08030",
    delay: "0s",
    size: "w-36 lg:w-44",
    pos: "top-[15%] left-[5%]",
    rotate: "-8deg",
  },
  {
    id: 25,
    color: "#F8D030",
    delay: "1.5s",
    size: "w-24 lg:w-32",
    pos: "top-[12%] right-[7%]",
    rotate: "10deg",
  },
  {
    id: 150,
    color: "#7038F8",
    delay: "0.8s",
    size: "w-32 lg:w-40",
    pos: "bottom-[22%] left-[3%]",
    rotate: "12deg",
  },
  {
    id: 245,
    color: "#78C850",
    delay: "2s",
    size: "w-28 lg:w-36",
    pos: "bottom-[18%] right-[4%]",
    rotate: "-6deg",
  },
  {
    id: 448,
    color: "#F8D030",
    delay: "1.2s",
    size: "w-24 lg:w-32",
    pos: "top-[42%] right-[1%]",
    rotate: "4deg",
  },
];

function SearchButton() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(
      () => window.dispatchEvent(new Event("focus-navbar-search")),
      350,
    );
    setTimeout(() => setActive(false), 600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-black text-sm
        uppercase tracking-wider border transition-all duration-300
        hover:scale-105 active:scale-95 backdrop-blur-sm overflow-hidden"
      style={
        active
          ? {
              color: "#fff",
              borderColor: "rgba(239,68,68,0.6)",
              background: "rgba(239,68,68,0.15)",
              boxShadow: "0 0 24px rgba(239,68,68,0.4)",
            }
          : {
              color: "#cbd5e1",
              borderColor: "rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
            }
      }>
      {/* ripple */}
      {active && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: "rgba(239,68,68,0.5)" }}
        />
      )}
      <svg
        className={`h-4 w-4 transition-transform duration-300 ${active ? "scale-125 text-red-400" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      Cerca un Pokémon
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        {/* Deep atmospheric blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-225 h-225 bg-red-700/8 rounded-full blur-[200px]" />
          <div className="absolute top-1/3 -left-40 w-150 h-150 bg-orange-600/6 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-175 h-175 bg-violet-800/6 rounded-full blur-[180px]" />
        </div>

        {/* Rotating pokeball watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-175 h-175 opacity-[0.025] animate-rotate-slow"
            fill="none"
            stroke="white"
            strokeWidth="3">
            <circle cx="100" cy="100" r="90" />
            <line x1="10" y1="100" x2="190" y2="100" />
            <circle cx="100" cy="100" r="22" fill="white" stroke="none" />
            <circle cx="100" cy="100" r="13" fill="#030712" stroke="none" />
          </svg>
        </div>

        {/* Floating sprites — desktop only */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          {FEATURED.map((p) => (
            <div
              key={p.id}
              className={`absolute ${p.pos} animate-float`}
              style={{
                animationDelay: p.delay,
                filter: `drop-shadow(0 0 32px ${p.color}60)`,
                transform: `rotate(${p.rotate})`,
                opacity: 0.28,
              }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.id}.png`}
                alt=""
                className={`${p.size} object-contain`}
              />
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          {/* Live badge */}
          <div
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full
            px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            Powered by PokéAPI v2 · Dati in tempo reale
          </div>

          {/* Main title */}
          <h1 className="font-black tracking-tight leading-[1.05] mb-6">
            <span className="block text-4xl sm:text-6xl lg:text-8xl text-white mb-2">
              Il tuo Pokédex
            </span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl shimmer-text">
              Definitivo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Oltre <strong className="text-white font-bold">1025 Pokémon</strong>{" "}
            con statistiche complete, abilità, mosse e navigazione fluida tra
            generazioni. Tutto in un&#39;interfaccia dark e professionale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/all-pokemon"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-black text-sm
                text-white uppercase tracking-wider transition-all duration-300
                hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #ea580c 100%)",
                boxShadow:
                  "0 8px 32px rgba(220,38,38,0.4), 0 2px 8px rgba(0,0,0,0.4)",
              }}>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Esplora il Pokédex
            </Link>
            {/* <SearchButton /> */}
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-10 inset-x-0 flex justify-center px-4 pointer-events-none">
          <div className="flex items-center gap-0 divide-x divide-white/8">
            {STATS_STRIP.map((s, i) => (
              <div key={s.label} className="text-center px-6 sm:px-10">
                <p className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                  {s.value}
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-4 py-20 sm:py-24 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-3">
            Funzionalità
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Tutto quello che ti serve
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
            Un Pokédex moderno progettato per essere veloce, preciso e piacevole
            da usare.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="relative rounded-2xl p-6 overflow-hidden border transition-all duration-300 group cursor-default hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                borderColor: "rgba(255,255,255,0.07)",
              }}>
              {/* Corner glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: f.color }}
              />
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${f.color}18`,
                  color: f.color,
                  boxShadow: `0 4px 16px ${f.color}20`,
                }}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-base mb-2 relative z-10">
                {f.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                {f.desc}
              </p>
              {/* Bottom accent */}
              <div
                className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${f.color}50, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── TYPE EXPLORER ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-3">
            Tipi
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Esplora per Tipo
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Seleziona un tipo per filtrare istantaneamente il Pokédex
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {TYPES.map((t) => (
            <Link
              key={t.name}
              to={`/all-pokemon?type=${t.name}`}
              className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 group"
              style={{
                backgroundColor: `${t.hex}0a`,
                borderColor: `${t.hex}18`,
              }}>
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200 leading-none">
                {t.emoji}
              </span>
              <span
                className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: `${t.hex}cc` }}>
                {t.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS COMPARISON CTA ── */}
      <section className="px-4 pb-28 max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden border p-10 sm:p-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(244,63,94,0.06) 100%)",
            borderColor: "rgba(255,255,255,0.07)",
          }}>
          {/* Background blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-rose-600/10 blur-[80px] pointer-events-none" />

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 relative z-10">
            Novità
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4 relative z-10">
            Confronta le Statistiche
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed relative z-10">
            Metti a confronto due Pokémon fianco a fianco. Vedi chi ha HP,
            Attacco, Velocità e BST totale migliori — con barre animate e
            vincitore evidenziato.
          </p>

          {/* Two sprite previews */}
          <div className="flex justify-center items-center gap-6 mb-8 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full" />
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png"
                alt="Charizard"
                className="relative w-24 h-24 object-contain drop-shadow-[0_8px_20px_rgba(99,102,241,0.4)]"
              />
            </div>
            <span className="text-2xl font-black text-slate-600">VS</span>
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500/20 blur-2xl rounded-full" />
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/9.png"
                alt="Blastoise"
                className="relative w-24 h-24 object-contain drop-shadow-[0_8px_20px_rgba(244,63,94,0.4)]"
              />
            </div>
          </div>

          <Link
            to="/compare"
            className="relative z-10 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-black text-sm
              text-white uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #f43f5e 100%)",
              boxShadow:
                "0 8px 32px rgba(99,102,241,0.35), 0 2px 8px rgba(0,0,0,0.4)",
            }}>
            <svg
              className="h-4 w-4"
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
            Inizia il Confronto
          </Link>
        </div>
      </section>
    </div>
  );
}
