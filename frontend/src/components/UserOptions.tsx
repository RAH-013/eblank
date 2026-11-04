import { Link } from "react-router-dom";

export default function UserOptions() {
  return (
    <nav className="flex shrink-0 items-center gap-3">
      <Link
        to="/sign-in"
        className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
      >
        Iniciar sesión
      </Link>

      <Link
        to="/sign-up"
        className="rounded-xl bg-(--brand-color) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
      >
        Crear cuenta
      </Link>
    </nav>
  );
}
