import Link from "next/link";
import { PageHeader, Card, TableWrapper, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listIntervenciones, listAlumnos } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import type { Alumno, Intervencion } from "@/db/schema";

const SIN_ALUMNO = "Sin alumno";

export default async function IntervencionesPage() {
  const [intervenciones, alumnos] = await Promise.all([listIntervenciones(), listAlumnos()]);
  const alumno = (id: string | null) => alumnos.find((a) => a.id === id);

  const grupos = new Map<string, { alumno: Alumno | undefined; intervenciones: Intervencion[] }>();
  for (const intervencion of intervenciones) {
    const a = alumno(intervencion.alumnoId);
    const clave = a?.id ?? SIN_ALUMNO;
    const grupo = grupos.get(clave) ?? { alumno: a, intervenciones: [] };
    grupo.intervenciones.push(intervencion);
    grupos.set(clave, grupo);
  }
  // listIntervenciones ya viene ordenada por fecha desc, así que el primer grupo encontrado
  // para cada alumno corresponde a su desarrollo más reciente.
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
        <>
          <TableWrapper className="hidden md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Alumno</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Desarrollos</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Último registro</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {gruposOrdenados.map(({ alumno: a, intervenciones: desarrollos }) => (
                  <tr key={a?.id ?? SIN_ALUMNO} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {a ? `${a.nombre} ${a.apellido}` : SIN_ALUMNO}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{desarrollos.length}</td>
                    <td className="px-4 py-3 text-slate-600">{formatFecha(desarrollos[0].fecha)}</td>
                    <td className="px-4 py-3 text-right">
                      {a ? (
                        <Link href={`/alumnos/${a.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                          Ver intervenciones
                        </Link>
                      ) : (
                        <Link
                          href={`/intervenciones/${desarrollos[0].id}`}
                          className="text-sm font-medium text-teal-600 hover:text-teal-700"
                        >
                          Ver
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>

          <div className="grid gap-3 md:hidden">
            {gruposOrdenados.map(({ alumno: a, intervenciones: desarrollos }) => (
              <Link
                key={a?.id ?? SIN_ALUMNO}
                href={a ? `/alumnos/${a.id}` : `/intervenciones/${desarrollos[0].id}`}
              >
                <Card className="p-4">
                  <p className="font-medium text-slate-900">{a ? `${a.nombre} ${a.apellido}` : SIN_ALUMNO}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {desarrollos.length} {desarrollos.length === 1 ? "desarrollo" : "desarrollos"} · último{" "}
                    {formatFecha(desarrollos[0].fecha)}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
