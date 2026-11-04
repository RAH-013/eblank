import type { ReactNode, ElementType } from "react";
import { Link, useLocation } from "react-router-dom";

import { ChromeIcon, FacebookIcon, ArrowLeftIcon } from "lucide-animated";

import Logo from "../assets/logo.svg";

type Provider = {
  name: string;
  icon: ElementType;
  className: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
  autoComplete: string;
  children?: ReactNode;
};

function MicrosoftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2 2h9v9H2z" />
      <path d="M13 2h9v9h-9z" />
      <path d="M2 13h9v9H2z" />
      <path d="M13 13h9v9h-9z" />
    </svg>
  );
}

function Providers() {
  const providers = [
    {
      name: "Google",
      icon: ChromeIcon,
      className: "hover:border-red-200 hover:bg-red-50/70 hover:text-red-600",
    },
    {
      name: "Microsoft",
      icon: MicrosoftIcon,
      className:
        "hover:border-slate-300 hover:bg-slate-100/70 hover:text-slate-900",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      className:
        "hover:border-blue-200 hover:bg-blue-50/70 hover:text-blue-600",
    },
  ] satisfies Provider[];

  return (
    <div className="grid grid-cols-3 gap-3">
      {providers.map(({ name, icon: Icon, className }) => (
        <button
          key={name}
          type="button"
          aria-label={`Continuar con ${name}`}
          className={`group flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 ${className}`}
        >
          <Icon size={19} />
          <span className="hidden sm:inline">{name}</span>
        </button>
      ))}
    </div>
  );
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        {children}
      </div>

      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-(--brand-color) focus:bg-white focus:ring-4 focus:ring-(--brand-color)/10"
      />
    </div>
  );
}

export default function Auth() {
  const { pathname } = useLocation();
  const isRegister = pathname === "/sign-up";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
      <div className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-(--brand-color)/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-(--brand-color)/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-110">
        <Link
          to="/"
          aria-label="Volver al inicio"
          className="mb-8 flex justify-center transition-opacity hover:opacity-75"
        >
          <img className="w-36" src={Logo} alt="Logotipo" />
        </Link>

        <section className="rounded-[28px] border border-white/80 bg-white/90 p-7 shadow-2xl shadow-slate-900/6 backdrop-blur-xl sm:p-9">
          <header className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-(--brand-color)/10 px-3 py-1 text-xs font-semibold text-(--brand-color)">
              {isRegister ? "Únete a nosotros" : "Qué bueno tenerte aquí"}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {isRegister ? "Crea tu cuenta" : "Bienvenido de nuevo"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isRegister
                ? "Crea una cuenta y comienza a disfrutar de nuestros servicios."
                : "Ingresa tus credenciales para acceder a tu cuenta."}
            </p>
          </header>

          <Providers />

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              O continúa con tu correo
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form className="space-y-5">
            {isRegister && (
              <FormField
                id="name"
                label="Nombre completo"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
              />
            )}

            <FormField
              id="email"
              label="Correo electrónico"
              type="email"
              placeholder="nombre@ejemplo.com"
              autoComplete="email"
            />

            <FormField
              id="password"
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              autoComplete={isRegister ? "new-password" : "current-password"}
            >
              {!isRegister && (
                <Link
                  to="/auth/forgot-password"
                  className="text-xs font-semibold text-(--brand-color) transition-colors hover:opacity-70"
                >
                  ¿La olvidaste?
                </Link>
              )}
            </FormField>

            <button
              type="submit"
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--brand-color) px-4 text-sm font-semibold text-white shadow-lg shadow-(--brand-color)/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-xl hover:shadow-(--brand-color)/25 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-color)"
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}

              <ArrowLeftIcon
                size={17}
                className="rotate-180 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-6">
            <p className="text-center text-sm text-slate-500">
              {isRegister
                ? "¿Ya tienes una cuenta?"
                : "¿Todavía no tienes una cuenta?"}{" "}
              <Link
                to={isRegister ? "/auth" : "/sign-up"}
                className="font-bold text-(--brand-color) transition-opacity hover:opacity-70"
              >
                {isRegister ? "Inicia sesión" : "Regístrate"}
              </Link>
            </p>
          </div>
        </section>

        <footer className="mt-7 text-center">
          <p className="text-xs leading-6 text-slate-400">
            Al continuar, aceptas nuestros{" "}
            <Link
              to="/terms"
              className="font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-(--brand-color)"
            >
              términos de servicio
            </Link>{" "}
            y{" "}
            <Link
              to="/privacy"
              className="font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-(--brand-color)"
            >
              política de privacidad
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
