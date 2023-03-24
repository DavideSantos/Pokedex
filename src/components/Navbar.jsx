import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <nav className="bg-slate-900 w-full h-12 flex fixed top-0 items-center">
        <Sidebar />
        <div className="mx-auto container flex items-center pr-[64px] w-auto gap-x-3">
          <img
            className="w-24"
            src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg"
            alt="logo pokemon"
          />
        </div>
      </nav>
    </>
  );
}
