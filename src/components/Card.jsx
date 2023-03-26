import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <div className="max-w-2xl mx-auto mt-2">
        <div className="bg-white shadow-2xl border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg mx-auto w-48 h-48"
            src={props.pokemon.sprites.other.home.front_default}
            alt={props.name}
          />
          <div className="p-5">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white capitalize">
              Nome: {props.pokemon.name}
            </h5>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400 capitalize">
              Ordine nel Pokèdex: {props.pokemon.order} posto
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400 capitalize">
              Peso: {props.pokemon.weight} lb
            </p>
            <p className="font-normal text-gray-700 mb-3 dark:text-gray-400 capitalize">
              Tipo di Pokèmon: {props.pokemon.types[0].type.name}
            </p>
            <Link
              to={`/pokemon-detail/${props.pokemon.id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Dettagli
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
