import Link from "next/link";
import { PageHeader, Card, Badge, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listIntervenciones, listAlumnos, listInstituciones } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import { colorEstadoIntervencion } from "@/lib/badges";
import type { Alumno, Intervencion } from "@/db/schema";

const SIN_ALUMNO = "Sin alumno";

export default async function IntervencionesPage() {
  const [intervenciones, alumnos, instituciones] = await Promise.all([
    listIntervenciones(),
    listAlumnos(),
    listInstituciones(),
  ]);
  const alumno = (id: string | null) => alumnos.find((a) => a.id === id);
  const nombreInstitucion = (id: string | null) => instituciones.find((i) => i.id === id)?.nombre;

  const grupos = new Map<string, { alumno: Alumno | undefined; intervenciones: Intervencion[] }>();
  for (const intervencion of intervenciones) {
    const a = alumno(intervencion.alumnoId);
    const clave = a?.id ?? SIN_ALUMNO;
    const grupo = grupos.get(clave) ?? { alumno: a, intervenciones: [] };
    grupo.intervenciones.push(intervencion);
    grupos.set(clave, grupo);
  }
  const gruposOrdenados = [...grupos.values()];

  return (
    <div>
      <PageHeader
        title="Intervenciones"
        description="Entrevistas, derivaciones, seguimientos y articulaciones realizadas con alumnos."
        actions={
          <Link
            href="/intervenciones/nueva"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <IconPlus className="h-4 w-4" /> Nueva intervención
          </Link>
        }
      />

      {intervenciones.length === 0 ? (
        <EmptyState message="Todavía no hay intervenciones cargadas." />
      ) : (
        <div className="grid gap-8">
          {gruposOrdenados.map(({ alumno: a, intervenciones: desarrollos }) => (
            <div key={a?.id ?? SIN_ALUMNO}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  {a ? (
                    <Link href={`/alumnos/${a.id}`} className="hover:text-teal-600">
                      {a.nombre} {a.apellido}
                    </Link>
                  ) : (
                    SIN_ALUMNO
                  )}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                    {desarrollos.length}
                  </span>
                </h2>
                {a && (
                  <Link
                    href={`/intervenciones/nueva?alumnoId=${a.id}`}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700"
                  >
                    + Nuevo desarrollo
                  </Link>
                )}
              </div>

              <div className="grid gap-3">
                {desarrollos.map((intervencion) => (
                  <Link key={intervencion.id} href={`/intervenciones/${intervencion.id}`}>
                    <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                      <div>
                        <p className="text-sm font-medium text-slate-900">{intervencion.tipo}</p>
                        <p className="text-xs text-slate-500">
                          {formatFecha(intervencion.fecha)} · {nombreInstitucion(intervencion.institucionId)}
                        </p>
                      </div>
                      <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
