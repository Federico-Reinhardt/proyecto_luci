"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card, Badge, PageHeader, badgeColorClasses, type BadgeColor } from "@/components/ui";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { mesas, intervenciones, getInstitucion, getAlumno } from "@/data/mock";
import { getMonthMatrix, toISODate } from "@/lib/calendar";
import { formatFecha } from "@/lib/format";
import { colorEstadoMesa } from "@/lib/badges";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

type EventoCalendario = {
  id: string;
  fecha: string;
  titulo: string;
  subtitulo: string;
  href: string;
  color: BadgeColor;
};

export default function CalendarioPage() {
  const [cursor, setCursor] = useState(new Date(2026, 6, 1));

  const eventos: EventoCalendario[] = useMemo(() => {
    const eventosMesas: EventoCalendario[] = mesas
      .filter((m) => m.estado !== "Suspendida")
      .map((m) => ({
        id: `mesa-${m.id}`,
        fecha: m.fecha,
        titulo: getInstitucion(m.institucionId)?.nombre ?? "Mesa",
        subtitulo: `Mesa de coordinación · ${m.modalidad}`,
        href: `/mesas/${m.id}`,
        color: colorEstadoMesa(m.estado),
      }));
    const eventosSeguimiento: EventoCalendario[] = intervenciones
      .filter((i): i is typeof i & { fechaProximoSeguimiento: string } => Boolean(i.fechaProximoSeguimiento))
      .map((i) => {
        const alumno = getAlumno(i.alumnoId);
        return {
          id: `seg-${i.id}`,
          fecha: i.fechaProximoSeguimiento,
          titulo: `${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`.trim(),
          subtitulo: "Próximo seguimiento",
          href: `/intervenciones/${i.id}`,
          color: "amber" as BadgeColor,
        };
      });
    return [...eventosMesas, ...eventosSeguimiento];
  }, []);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const weeks = getMonthMatrix(year, month);
  const hoy = toISODate(new Date());
  const prefijoMes = `${year}-${String(month + 1).padStart(2, "0")}`;
  const eventosDelMes = eventos
    .filter((e) => e.fecha.startsWith(prefijoMes))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));

  function cambiarMes(delta: number) {
    setCursor(new Date(year, month + delta, 1));
  }

  return (
    <div>
      <PageHeader title="Calendario" description="Mesas programadas y próximos seguimientos." />

      <Card className="p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => cambiarMes(-1)}
            aria-label="Mes anterior"
            className="rounded-lg border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-base font-semibold text-slate-900 capitalize">
            {MESES[month]} {year}
          </h2>
          <button
            onClick={() => cambiarMes(1)}
            aria-label="Mes siguiente"
            className="rounded-lg border border-slate-300 p-1.5 text-slate-600 hover:bg-slate-50"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-slate-200 text-xs">
          {DIAS.map((d) => (
            <div key={d} className="bg-slate-50 px-1 py-2 text-center font-medium text-slate-500">
              {d}
            </div>
          ))}
          {weeks.flatMap((week, wi) =>
            week.map((date, di) => {
              const iso = date ? toISODate(date) : null;
              const eventosDia = iso ? eventos.filter((e) => e.fecha === iso) : [];
              return (
                <div key={`${wi}-${di}`} className={`min-h-[80px] bg-white p-1 sm:min-h-[110px] sm:p-1.5 ${!date ? "bg-slate-50" : ""}`}>
                  {date && (
                    <>
                      <p className={`mb-1 text-right text-xs ${iso === hoy ? "font-bold text-teal-600" : "text-slate-400"}`}>
                        {date.getDate()}
                      </p>
                      <div className="flex flex-col gap-1">
                        {eventosDia.slice(0, 3).map((ev) => (
                          <Link
                            key={ev.id}
                            href={ev.href}
                            title={`${ev.titulo} — ${ev.subtitulo}`}
                            className={`truncate rounded px-1 py-0.5 text-[10px] leading-tight font-medium ${badgeColorClasses[ev.color]}`}
                          >
                            {ev.titulo}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 text-base font-semibold text-slate-900 capitalize">Eventos de {MESES[month]}</h2>
        {eventosDelMes.length === 0 ? (
          <p className="text-sm text-slate-500">No hay eventos este mes.</p>
        ) : (
          <div className="grid gap-3">
            {eventosDelMes.map((ev) => (
              <Link key={ev.id} href={ev.href}>
                <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{ev.titulo}</p>
                    <p className="text-xs text-slate-500">{ev.subtitulo}</p>
                  </div>
                  <Badge color={ev.color}>{formatFecha(ev.fecha)}</Badge>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
