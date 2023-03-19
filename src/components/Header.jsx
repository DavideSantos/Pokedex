// Componente header attaccato al body

import Card from "./Card";
import { useState, useEffect } from "react";

export default function Header() {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon/raichu";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setPokemon(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="container mx-auto h-screen bg-slate-400 flex mt-12">
        <Card pokemon={pokemon} />
      </section>
    </>
  );
}
