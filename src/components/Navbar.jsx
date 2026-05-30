import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { usePokemon } from "../context/PokemonContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { globalIndex } = usePokemon();

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchHighlighted, setSearchHighlighted] = useState(false);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Focus search input when triggered from outside (e.g. Home CTA button)
  useEffect(() => {
    const handler = () => {
      searchInputRef.current?.focus();
      setSearchHighlighted(true);
      setTimeout(() => setSearchHighlighted(false), 1500);
    };
    window.addEventListener("focus-navbar-search", handler);
    return () => window.removeEventListener("focus-navbar-search", handler);
  }, []);

  // Monitor scroll for glass navbar effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile dropdown and search suggestion on page navigation
  useEffect(() => {
    setMobileOpen(false);
    setShowSuggestions(false);
    setSearchInput("");
  }, [location.pathname]);

  // Click outside to close autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (!value.trim() || !globalIndex.length) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const valLower = value.toLowerCase().trim();
    // Filter index for matches
    const filtered = globalIndex
      .filter(
        (p) => p.name.includes(valLower) || String(p.id).includes(valLower),
      )
      .slice(0, 6);

    setSuggestions(filtered);
    setShowSuggestions(true);
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (id) => {
    navigate(`/pokemon-detail/${id}`);
    setSearchInput("");
    setShowSuggestions(false);
    setMobileOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || !suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex].id);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setSearchInput("");
    setShowSuggestions(false);
    setMobileOpen(false);
  };

  const handleClear = () => {
    setSearchInput("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/all-pokemon", label: "Pokédex" },
    { to: "/compare", label: "Confronto" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-3 pointer-events-none">
      <nav
        ref={containerRef}
        className={`mx-auto max-w-7xl w-full rounded-2xl border transition-all duration-300 pointer-events-auto ${
          scrolled
            ? "bg-slate-950/75 backdrop-blur-md border-white/10 shadow-2xl shadow-black/40 py-2.5 px-6"
            : "bg-slate-950/40 backdrop-blur-xs border-white/5 py-4 px-6"
        }`}>
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full" />
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt="Pokéball"
                className="h-8 w-8 relative z-10 group-hover:rotate-180 transition-transform duration-700 ease-out"
              />
            </div>
            <span className="font-black text-lg tracking-tight text-white">
              Poké
              <span className="text-red-500 group-hover:text-red-400 transition-colors">
                dex
              </span>
            </span>
          </Link>

          {/* Autocomplete Search Bar - Tablet & Desktop */}
          <div className="hidden md:block relative flex-1 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
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
                ref={searchInputRef}
                type="text"
                placeholder="Cerca Pokémon per nome o numero..."
                value={searchInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="search-input w-full bg-slate-900/60 border placeholder-slate-400
                  rounded-full pl-10 pr-9 py-2 text-sm text-white focus:outline-none
                  transition-all duration-300 backdrop-blur-sm"
                style={
                  searchHighlighted
                    ? {
                        borderColor: "rgba(239,68,68,0.8)",
                        boxShadow:
                          "0 0 0 3px rgba(239,68,68,0.25), 0 0 20px rgba(239,68,68,0.3)",
                      }
                    : {
                        borderColor: "rgba(255,255,255,0.1)",
                      }
                }
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 transition-all duration-200">
                <div className="p-1.5 space-y-0.5">
                  {suggestions.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handleSuggestionClick(p.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all ${
                        activeIndex === idx
                          ? "bg-white/10 text-white pl-4"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                        alt={p.name}
                        className="w-9 h-9 object-contain drop-shadow-md bg-white/5 rounded-lg p-0.5 shrink-0"
                        onError={(e) => {
                          e.target.src =
                            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm capitalize truncate">
                          {p.name.replace(/-/g, " ")}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono">
                          #{String(p.id).padStart(3, "0")}
                        </p>
                      </div>
                      <svg
                        className="w-4 h-4 text-slate-500 opacity-60"
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
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-5 py-2 rounded-full text-sm font-black tracking-wide uppercase transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-900/30 scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all">
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[380px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}>
          <div className="border-t border-white/5 pt-4 space-y-4">
            {/* Search Input for Mobile */}
            <div className="relative">
              <form onSubmit={handleSubmit} className="relative">
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
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
                  placeholder="Cerca Pokémon..."
                  value={searchInput}
                  onChange={handleInputChange}
                  className="search-input w-full bg-slate-900/80 border border-white/10 placeholder-slate-400
                    rounded-xl pl-10 pr-9 py-2.5 text-sm text-white focus:outline-none focus:border-red-500/50"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </form>

              {/* Mobile Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-1 space-y-0.5">
                    {suggestions.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handleSuggestionClick(p.id)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-slate-300 hover:bg-white/5 hover:text-white">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                          alt={p.name}
                          className="w-8 h-8 object-contain bg-white/5 rounded p-0.5"
                        />
                        <span className="font-bold text-sm capitalize flex-1 truncate">
                          {p.name.replace(/-/g, " ")}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          #{String(p.id).padStart(3, "0")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-1 pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                    location.pathname === link.to
                      ? "bg-red-600/20 text-red-400 border border-red-500/20"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
