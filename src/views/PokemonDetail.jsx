import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "../components/CardDetail";

export default function PokemonDetail() {
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const { pokemonId } = useParams();

  const fetchPokemonDetail = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const data = await response.json();
    setPokemonDetail([data]);
  };

  useEffect(() => {
    fetchPokemonDetail();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex container mx-auto bg-slate-400">
        {pokemonDetail.map((pokemon, i) => (
          <CardDetail key={i} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
