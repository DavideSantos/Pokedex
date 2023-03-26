// Componente header attaccato al body

import Card from "./Card";
import { useState, useEffect } from "react";

export default function Header() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20"
  );

  const fetchAllPokemons = async () => {
    const response = await fetch(loadMore);
    const data = await response.json();
    setLoadMore(data.next);

    function createCard(result) {
      result.map(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();
        setAllPokemons((currentList) => [...currentList, data]);
        // await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createCard(data.results);
  };

  useEffect(() => {
    fetchAllPokemons();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mx-auto bg-slate-400 mt-12 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {allPokemons.map((pokemon, i) => (
          <Card key={i} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          className="rounded p-2 my-7 bg-slate-900 text-white"
          onClick={() => fetchAllPokemons()}
        >
          Carica Ancora
        </button>
      </div>
    </>
  );
}
