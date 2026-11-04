import { Link } from "react-router-dom";

import Logo from "../assets/logo.svg";

import Search from "./Search";
import UserOptions from "./UserOptions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-300 bg-slate-100 backdrop-blur-lg transition-colors duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="shrink-0">
          <img className="w-28 sm:w-32" src={Logo} alt="Logotipo" />
        </Link>

        <section className="flex flex-1 justify-center">
          <div className="w-full max-w-xl">
            <Search />
          </div>
        </section>

        <div className="shrink-0">
          <UserOptions />
        </div>
      </nav>
    </header>
  );
}
