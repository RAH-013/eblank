import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon, ArrowBigRightDashIcon } from "lucide-animated";

export default function Search() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);
  const searchIconRef = useRef(null);
  const clearIconRef = useRef(null);
  const submitIconRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!searchRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (query.trim()) {
      setIsOpen(true);
    }
  }

  function handleClear() {
    setQuery("");
    setIsOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <form
        onSubmit={handleSubmit}
        onMouseEnter={() => searchIconRef.current?.startAnimation()}
        onKeyDown={handleKeyDown}
        role="search"
        className="group flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-300 hover:border-slate-300 focus-within:border-(--brand-color) focus-within:ring-4 focus-within:ring-(--brand-color)/10"
      >
        <SearchIcon
          ref={searchIconRef}
          animateOnHover={false}
          size={20}
          aria-hidden="true"
          className="shrink-0 text-slate-400 transition-colors duration-300 group-hover:text-(--brand-color) group-focus-within:text-(--brand-color)"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            setIsOpen(value.trim().length > 0);
          }}
          onFocus={() => {
            if (query.trim()) setIsOpen(true);
          }}
          placeholder="¿Qué estás buscando?"
          aria-label="Buscar productos"
          aria-controls="search-results"
          aria-expanded={isOpen}
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            onMouseEnter={() => clearIconRef.current?.startAnimation()}
            aria-label="Limpiar búsqueda"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-700 active:scale-90"
          >
            <XIcon ref={clearIconRef} animateOnHover={false} size={17} />
          </button>
        )}

        <button
          type="submit"
          onMouseEnter={() => submitIconRef.current?.startAnimation()}
          aria-label="Buscar"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-(--brand-color) text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
        >
          <ArrowBigRightDashIcon
            ref={submitIconRef}
            animateOnHover={false}
            size={19}
          />
        </button>
      </form>

      {isOpen && (
        <section
          id="search-results"
          aria-label="Resultados de búsqueda"
          className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Resultados
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Buscando:{" "}
                <span className="font-medium text-slate-700">{query}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              Cerrar
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto p-3">
            <div className="flex flex-col items-center px-4 py-10 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <SearchIcon size={24} />
              </div>

              <p className="text-sm font-medium text-slate-700">
                Aquí aparecerán tus productos
              </p>

              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                Conecta este buscador con tu API para mostrar imágenes, nombres
                y precios de los productos encontrados.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
