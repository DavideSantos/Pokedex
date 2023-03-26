import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import PokemonDetail from "./views/PokemonDetail";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/all-pokemon" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-detail/:pokemonId" element={<PokemonDetail />} />
      </Routes>
    </>
  );
}
