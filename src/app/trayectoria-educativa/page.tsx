import Link from "next/link";
import { PageHeader, Card, TableWrapper, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listTrayectorias, listAlumnos, listDocentes } from "@/db/queries";
import { formatFecha } from "@/lib/format";

export default async function TrayectoriaEducativaPage() {
  const [trayectorias, alumnos, docentes] = await Promise.all([listTrayectorias(), listAlumnos(), listDocentes()]);
  const alumno = (id: string) => alumnos.find((a) => a.id === id);
  const docente = (id: string) => docentes.find((d) => d.id === id);

  return (
    <div>
      <PageHeader
        title="Trayectoria educativa"
        description="Registro de seguimiento educativo por alumno, con docentes, acciones y acuerdos."
        actions={
          <Link
            href="/trayectoria-educativa/nueva"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <IconPlus className="h-4 w-4" /> Nuevo registro
          </Link>
        }
      />

      {trayectorias.length === 0 ? (
        <EmptyState message="Todavía no hay registros de trayectoria educativa cargados." />
      ) : (
        <>
          <TableWrapper className="hidden md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Alumno</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Docente</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Fecha de registro</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trayectorias.map((trayectoria) => {
                  const a = alumno(trayectoria.alumnoId);
                  const d = docente(trayectoria.docenteId);
                  return (
                    <tr key={trayectoria.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {a?.nombre} {a?.apellido}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {d?.nombre} {d?.apellido}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{formatFecha(trayectoria.fechaRegistro)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/trayectoria-educativa/${trayectoria.id}`}
                          className="text-sm font-medium text-teal-600 hover:text-teal-700"
                        >
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
            {trayectorias.map((trayectoria) => {
              const a = alumno(trayectoria.alumnoId);
              const d = docente(trayectoria.docenteId);
              return (
                <Link key={trayectoria.id} href={`/trayectoria-educativa/${trayectoria.id}`}>
                  <Card className="p-4">
                    <p className="font-medium text-slate-900">
                      {a?.nombre} {a?.apellido}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {d?.nombre} {d?.apellido} · {formatFecha(trayectoria.fechaRegistro)}
                    </p>
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
