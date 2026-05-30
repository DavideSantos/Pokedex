import { useEffect, useState } from "react";

const getColor = (v) => {
  if (v >= 120) return "#22c55e";
  if (v >= 90) return "#84cc16";
  if (v >= 60) return "#eab308";
  if (v >= 35) return "#f97316";
  return "#ef4444";
};

export default function StatBar({ label, value, max = 255 }) {
  const [width, setWidth] = useState(0);
  const color = getColor(value);
  const pct = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className="flex items-center gap-3.5">
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider w-20 shrink-0 text-right leading-none">
        {label}
      </span>
      <span className="text-white font-black text-sm w-9 shrink-0 text-right tabular-nums">
        {value}
      </span>
      <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}70`,
          }}
        />
      </div>
      <span className="text-[9px] font-bold text-slate-600 w-8 shrink-0 tabular-nums">
        {Math.round(pct)}%
      </span>
    </div>
  );
}
