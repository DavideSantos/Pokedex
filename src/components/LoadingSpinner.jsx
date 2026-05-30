export default function LoadingSpinner({ text = "Caricamento..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-20">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        {/* Spinning arc */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 border-r-red-500/30 animate-spin" />
        {/* Inner pokeball center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-[#030712] border-2 border-white/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
      <p className="text-slate-600 text-xs font-bold uppercase tracking-widest animate-pulse">
        {text}
      </p>
    </div>
  );
}
