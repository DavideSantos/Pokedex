export default function CardDetail(props) {
  const statsContent = [
    { title: "HP", field: "hp" },
    { title: "Attack", field: "attack" },
    { title: "Defense", field: "defense" },
    { title: "Special Attack", field: "specialAttack" },
    { title: "Special Defense", field: "specialDefense" },
    { title: "Speed", field: "speed" },
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto mt-12 bg-slate-400">
        <div className="bg-white shadow-2xl border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <img
            className="rounded-t-lg mx-auto w-48 h-48"
            src={props.pokemon.sprites.other.home.front_default}
            alt={props.pokemon.name}
          />
          <div className="p-5">
            <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white capitalize">
              Nome: {props.pokemon.name}
            </h5>
            <p className="font-normal text-white mb-3 capitalize">
              Ordine nel Pokèdex:{" "}
              <span className="text-gray-700 dark:text-gray-400">
                {props.pokemon.order} posto
              </span>
            </p>
            <p className="font-normal text-white mb-3 capitalize">
              Peso:{" "}
              <span className="text-gray-700 dark:text-gray-400">
                {props.pokemon.weight} lb
              </span>
            </p>
            <p className="font-normal text-white mb-3 capitalize">
              Tipo di Pokèmon:{" "}
              <span className="text-gray-700 dark:text-gray-400">
                {props.pokemon.types[0].type.name}
              </span>
            </p>
            <div>
              <strong className="text-white mt-3">Attacchi Base</strong>
              {props.pokemon.abilities.map((item, i) => {
                return (
                  <h2
                    className="font-normal text-gray-700 dark:text-gray-400 capitalize my-3"
                    key={i}
                  >
                    {item.ability.name}
                  </h2>
                );
              })}
            </div>
            <div>
              {statsContent &&
                statsContent.map((stat, i) => (
                  <div key={stat.field}>
                    <strong className="text-white">{stat.title}: </strong>
                    <span className="font-normal text-gray-700 dark:text-gray-400">
                      {props.pokemon.stats[i].base_stat} /100
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
