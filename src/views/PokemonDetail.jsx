import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CardDetail from "../components/CardDetail";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.toLowerCase().trim()}`);
        if (!response.ok) throw new Error("Pokemon not found");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error("Failed to load details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [pokemonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center">
        <LoadingSpinner />
        <p className="text-slate-500 font-bold text-sm mt-4 animate-pulse">
          Caricamento dati del Pokémon...
        </p>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col justify-center items-center px-4 text-center">
        <div className="text-4xl mb-4">👾</div>
        <h2 className="text-white font-black text-xl mb-1">Pokémon non trovato</h2>
        <p className="text-slate-500 text-sm max-w-sm mb-8">
          Il Pokémon <span className="text-slate-300 font-mono">"{pokemonId}"</span> non esiste o si è verificato un errore di connessione.
        </p>
        <Link
          to="/all-pokemon"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full text-sm border border-white/10 transition-all"
        >
          Esplora il Pokédex
        </Link>
      </div>
    );
  }

  return <CardDetail pokemon={pokemon} />;
}

