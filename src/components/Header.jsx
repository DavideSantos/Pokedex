// Componente header attaccato al body

import Card from "./Card";

export default function Header() {
  return (
    <>
      <section className="container mx-auto h-screen bg-slate-400 flex mt-12">
        <Card />
      </section>
    </>
  );
}
