export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-900 w-full h-12 flex">
        <div className="container mx-auto flex items-center justify-between p-4 w-auto gap-x-6">
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-4 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
          </div>
          <div className="text-white">Home</div>
          <div className="text-white">Servizi</div>
          <div className="text-white">Contattaci</div>
          <div className="text-white">Accedi/registrati</div>
        </div>
      </nav>
    </>
  );
}
