"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import {
  IconHome,
  IconBuilding,
  IconMeeting,
  IconUsers,
  IconClipboard,
  IconCalendar,
  IconRoute,
  IconMenu,
  IconClose,
} from "@/components/icons";

const navItems = [
  { href: "/", label: "Inicio", icon: IconHome },
  { href: "/instituciones", label: "Instituciones", icon: IconBuilding },
  { href: "/mesas", label: "Mesas", icon: IconMeeting },
  { href: "/alumnos", label: "Alumnos", icon: IconUsers },
  { href: "/intervenciones", label: "Intervenciones", icon: IconClipboard },
  { href: "/trayectoria-educativa", label: "Trayectoria educativa", icon: IconRoute },
  { href: "/calendario", label: "Calendario", icon: IconCalendar },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
        TE
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-slate-900">Trayectorias</p>
        <p className="text-xs text-slate-500">Educativas</p>
      </div>
    </div>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-teal-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-5">
          <Brand />
        </div>
        <div className="flex flex-1 flex-col py-4">
          <NavLinks pathname={pathname} />
        </div>
        <div className="border-t border-slate-200 p-4">
          <p className="mb-2 text-xs text-slate-400">Equipo de Psicopedagogía</p>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs font-medium text-slate-500 hover:text-slate-700"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
          <Brand />
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
          >
            <IconMenu className="h-6 w-6" />
          </button>
        </header>

        {open && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-xl">
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
                <Brand />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                  className="rounded-md p-2 text-slate-600 hover:bg-slate-100"
                >
                  <IconClose className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col py-4">
                <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
