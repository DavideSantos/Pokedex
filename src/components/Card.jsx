import { Link } from "react-router-dom";
import { getTypeColor } from "../utils/typeColors";
import TypeBadge from "./TypeBadge";

export default function Card({ pokemon }) {
  const primaryType = pokemon.types[0].type.name;
  const { hex } = getTypeColor(primaryType);
  const hp = pokemon.stats?.find((s) => s.stat.name === "hp")?.base_stat ?? 0;
  const attack = pokemon.stats?.find((s) => s.stat.name === "attack")?.base_stat ?? 0;
  const speed = pokemon.stats?.find((s) => s.stat.name === "speed")?.base_stat ?? 0;

  const imageUrl =
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.other?.dream_world?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <Link to={`/pokemon-detail/${pokemon.id}`} className="group block h-full">
      <article
        className="relative h-full rounded-3xl overflow-hidden cursor-pointer
          transition-all duration-400 ease-out transform
          group-hover:-translate-y-2 group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(150deg, ${hex}18 0%, #0b1120 55%, #030712 100%)`,
          border: `1px solid ${hex}22`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.5)`,
        }}>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${hex}55, 0 0 40px ${hex}18` }}
        />

        {/* Sweep shine on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent
          translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none z-20 rounded-3xl" />

        {/* ID tag */}
        <span
          className="absolute top-3.5 right-4 text-[9px] font-black tracking-[0.22em] font-mono select-none z-10"
          style={{ color: `${hex}70` }}>
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        {/* Sprite Area */}
        <div className="relative flex justify-center items-end h-[145px] sm:h-[170px] pt-5 select-none">
          {/* Atmospheric radial glow */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full blur-3xl
              opacity-30 group-hover:opacity-55 group-hover:scale-125 transition-all duration-700 ease-out"
            style={{ backgroundColor: hex }}
          />

          {/* Subtle pokeball bg */}
          <svg
            viewBox="0 0 100 100"
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 opacity-[0.04]
              group-hover:opacity-[0.08] group-hover:rotate-[30deg] transition-all duration-1000 ease-out"
            fill="none" stroke="white" strokeWidth="4">
            <circle cx="50" cy="50" r="44" />
            <line x1="6" y1="50" x2="94" y2="50" strokeWidth="4" />
            <circle cx="50" cy="50" r="13" fill="white" stroke="none" />
            <circle cx="50" cy="50" r="7.5" fill="#030712" stroke="none" />
          </svg>

          {/* Pokemon sprite */}
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 object-contain
              drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]
              group-hover:scale-115 group-hover:-translate-y-3
              transition-all duration-500 ease-out"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="px-4 pb-5 pt-3 sm:px-5 sm:pb-6">
          {/* Type badges */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} size="sm" />
            ))}
          </div>

          {/* Name */}
          <h3 className="text-white font-black text-sm sm:text-[15px] capitalize tracking-tight mb-4 truncate">
            {pokemon.name.replace(/-/g, " ")}
          </h3>

          {/* Stat bars */}
          <div className="space-y-2 pt-3 border-t border-white/5">
            {[
              { label: "HP", value: hp, max: 255 },
              { label: "ATT", value: attack, max: 190 },
              { label: "VEL", value: speed, max: 180 },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 w-5 shrink-0">{stat.label}</span>
                <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min((stat.value / stat.max) * 100, 100)}%`,
                      backgroundColor: hex,
                      boxShadow: `0 0 4px ${hex}80`,
                    }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500 font-mono w-5 text-right shrink-0">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
