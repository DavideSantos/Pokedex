export const TYPE_COLORS = {
  normal: { hex: "#A8A878" },
  fire: { hex: "#F08030" },
  water: { hex: "#6890F0" },
  electric: { hex: "#F8D030" },
  grass: { hex: "#78C850" },
  ice: { hex: "#98D8D8" },
  fighting: { hex: "#C03028" },
  poison: { hex: "#A040A0" },
  ground: { hex: "#E0C068" },
  flying: { hex: "#A890F0" },
  psychic: { hex: "#F85888" },
  bug: { hex: "#A8B820" },
  rock: { hex: "#B8A038" },
  ghost: { hex: "#705898" },
  dragon: { hex: "#7038F8" },
  dark: { hex: "#705848" },
  steel: { hex: "#B8B8D0" },
  fairy: { hex: "#EE99AC" },
};

export const getTypeColor = (type) => TYPE_COLORS[type] || { hex: "#A8A878" };
