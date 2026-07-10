import Link from "next/link";
import { PageHeader, Card, Badge, TableWrapper, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listAlumnos, listInstituciones } from "@/db/queries";
import { colorSituacionEscolar } from "@/lib/badges";

export default async function AlumnosPage() {
  const [alumnos, instituciones] = await Promise.all([listAlumnos(), listInstituciones()]);
  const nombreInstitucion = (id: string) => instituciones.find((i) => i.id === id)?.nombre;

  return (
    <div>
      <PageHeader
        title="Alumnos"
        description="Alumnos acompañados por el equipo en las distintas instituciones."
        actions={
          <Link
            href="/alumnos/nuevo"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <IconPlus className="h-4 w-4" /> Nuevo alumno
          </Link>
        }
      />

      {alumnos.length === 0 ? (
        <EmptyState message="Todavía no hay alumnos cargados." />
      ) : (
        <>
          <TableWrapper className="hidden md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Nombre y apellido</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">DNI</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Institución</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Nivel</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Situación escolar</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alumnos.map((alumno) => (
                  <tr key={alumno.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {alumno.nombre} {alumno.apellido}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{alumno.dni}</td>
                    <td className="px-4 py-3 text-slate-600">{nombreInstitucion(alumno.institucionId)}</td>
                    <td className="px-4 py-3 text-slate-600">{alumno.nivel}</td>
                    <td className="px-4 py-3">
                      <Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/alumnos/${alumno.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                        Ver ficha
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>

          <div className="grid gap-3 md:hidden">
            {alumnos.map((alumno) => (
              <Link key={alumno.id} href={`/alumnos/${alumno.id}`}>
                <Card className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">
                      {alumno.nombre} {alumno.apellido}
                    </p>
                    <Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">DNI {alumno.dni}</p>
                  <p className="text-sm text-slate-600">
                    {nombreInstitucion(alumno.institucionId)} · {alumno.nivel}
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
