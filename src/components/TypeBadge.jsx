import { getTypeColor } from "../utils/typeColors";

const sizeClasses = {
  sm: "px-2.5 py-0.5 text-[9px] gap-1",
  md: "px-3 py-1 text-[10px] gap-1",
  lg: "px-4 py-1.5 text-xs gap-1.5",
};

const TYPE_EMOJI = {
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  psychic: "🔮",
  dragon: "🐉",
  ghost: "👻",
  dark: "🌑",
  fairy: "✨",
  steel: "⚙️",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌍",
  flying: "🦅",
  bug: "🐛",
  rock: "🪨",
  normal: "⭐",
};

export default function TypeBadge({ type, size = "md" }) {
  const { hex } = getTypeColor(type);
  const emoji = TYPE_EMOJI[type];
  return (
    <span
      className={`inline-flex items-center font-black uppercase tracking-widest rounded-full text-white ${sizeClasses[size]}`}
      style={{ backgroundColor: `${hex}cc`, boxShadow: `0 2px 10px ${hex}50` }}>
      {emoji && (
        <span
          className="leading-none"
          style={{ fontSize: size === "lg" ? "11px" : "9px" }}>
          {emoji}
        </span>
      )}
      {type}
    </span>
  );
}
