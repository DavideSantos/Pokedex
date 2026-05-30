import "./App.css";
import PokemonList from "./views/PokemonList";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import PokemonDetail from "./views/PokemonDetail";
import SearchResults from "./views/SearchResults";
import StatsComparison from "./views/StatsComparison";
import { Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";

export default function App() {
  return (
    <PokemonProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-pokemon" element={<PokemonList />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/pokemon-detail/:pokemonId"
              element={<PokemonDetail />}
            />
            <Route path="/compare" element={<StatsComparison />} />
          </Routes>
        </main>
      </div>
    </PokemonProvider>
  );
}
