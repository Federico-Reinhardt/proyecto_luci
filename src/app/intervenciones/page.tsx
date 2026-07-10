import Link from "next/link";
import { PageHeader, Card, Badge, TableWrapper, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listIntervenciones, listAlumnos, listInstituciones } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import { colorEstadoIntervencion } from "@/lib/badges";

export default async function IntervencionesPage() {
  const [intervenciones, alumnos, instituciones] = await Promise.all([
    listIntervenciones(),
    listAlumnos(),
    listInstituciones(),
  ]);
  const alumno = (id: string) => alumnos.find((a) => a.id === id);
  const nombreInstitucion = (id: string) => instituciones.find((i) => i.id === id)?.nombre;

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
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Institución</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Fecha</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Tipo</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {intervenciones.map((intervencion) => {
                  const a = alumno(intervencion.alumnoId);
                  return (
                    <tr key={intervencion.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {a?.nombre} {a?.apellido}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{nombreInstitucion(intervencion.institucionId)}</td>
                      <td className="px-4 py-3 text-slate-600">{formatFecha(intervencion.fecha)}</td>
                      <td className="px-4 py-3 text-slate-600">{intervencion.tipo}</td>
                      <td className="px-4 py-3">
                        <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/intervenciones/${intervencion.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                          Ver
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrapper>

          <div className="grid gap-3 md:hidden">
            {intervenciones.map((intervencion) => {
              const a = alumno(intervencion.alumnoId);
              return (
                <Link key={intervencion.id} href={`/intervenciones/${intervencion.id}`}>
                  <Card className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-medium text-slate-900">
                        {a?.nombre} {a?.apellido}
                      </p>
                      <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {intervencion.tipo} · {formatFecha(intervencion.fecha)}
                    </p>
                    <p className="text-sm text-slate-600">{nombreInstitucion(intervencion.institucionId)}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
