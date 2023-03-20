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
      result.forEach(async (pokemon) => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await response.json();
        setAllPokemons((currentList) => [...currentList, data]);
        await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createCard(data.results);
  };

  useEffect(() => {
    fetchAllPokemons();
  }, []);
  // useEffect(() => {
  //   const url = "https://pokeapi.co/api/v2/pokemon/raichu";
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       setPokemon(json);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <section className="container mx-auto h-screen bg-slate-400 flex mt-12">
        {allPokemons.map((pokemon, i) => (
          <Card key={i} pokemon={pokemon} />
        ))}
        <button className="load-more" onClick={() => fetchAllPokemons()}>
          Carica ancora
        </button>
      </section>
    </>
  );
}
