import { createContext, useState, useEffect, useContext } from "react";

const PokemonContext = createContext();
const PAGE_SIZE = 20;

export function usePokemon() {
  return useContext(PokemonContext);
}

export function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [globalIndex, setGlobalIndex] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [typePokemonList, setTypePokemonList] = useState([]); // holds { name, url, type }

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // Fetch all Pokemon names and IDs on mount to build the global index for instant search/autocomplete
  useEffect(() => {
    const fetchGlobalIndex = async () => {
      try {
        const cached = localStorage.getItem("pokedex_global_index");
        if (cached) {
          setGlobalIndex(JSON.parse(cached));
          return;
        }
        // PokeAPI limit of 2000 easily covers all ~1025 currently released species + forms
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
        const data = await res.json();
        const mapped = data.results.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return {
            name: p.name,
            id: parseInt(id, 10),
            url: p.url,
          };
        });
        setGlobalIndex(mapped);
        localStorage.setItem("pokedex_global_index", JSON.stringify(mapped));
      } catch (err) {
        console.error("Failed to build global Pokédex index:", err);
      }
    };
    fetchGlobalIndex();
  }, []);

  const fetchPokemons = async (page, typeName) => {
    setLoading(true);
    try {
      if (typeName === "all") {
        const offset = (page - 1) * PAGE_SIZE;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${offset}`
        );
        const data = await res.json();
        setTotalCount(data.count);

        const details = await Promise.all(
          data.results.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemons(details);
        setCurrentPage(page);
      } else {
        let list = typePokemonList;
        // If type changed or list is empty, fetch the entire list for this type
        if (!list.length || list[0].type !== typeName) {
          const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
          const data = await res.json();
          list = data.pokemon.map((p) => ({ ...p.pokemon, type: typeName }));
          setTypePokemonList(list);
        }

        setTotalCount(list.length);
        const offset = (page - 1) * PAGE_SIZE;
        const sliced = list.slice(offset, offset + PAGE_SIZE);

        const details = await Promise.all(
          sliced.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemons(details);
        setCurrentPage(page);
      }
    } catch (err) {
      console.error("Error fetching pokemons:", err);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const changeType = (type) => {
    setSelectedType(type);
    setTypePokemonList([]); // Reset to force refetch
    fetchPokemons(1, type);
  };

  const goToPage = (page) => {
    fetchPokemons(page, selectedType);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchPokemons(1, "all");
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        globalIndex,
        totalCount,
        totalPages,
        currentPage,
        selectedType,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        loading,
        nextPage,
        prevPage,
        goToPage,
        changeType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

