import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, Badge, EmptyState } from "@/components/ui";
import { getAlumno, intervencionesDeAlumno, listInstituciones } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import { colorEstadoIntervencion } from "@/lib/badges";

export default async function IntervencionesDeAlumnoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumno = await getAlumno(id);
  if (!alumno) notFound();

  const [desarrollos, instituciones] = await Promise.all([intervencionesDeAlumno(id), listInstituciones()]);
  const nombreInstitucion = (institucionId: string | null) =>
    instituciones.find((i) => i.id === institucionId)?.nombre;

  return (
    <div>
      <PageHeader
        backHref="/intervenciones"
        title={`${alumno.nombre} ${alumno.apellido}`}
        description="Historial de intervenciones."
        actions={
          <Link
            href={`/intervenciones/nueva?alumnoId=${alumno.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            + Nuevo desarrollo
          </Link>
        }
      />

      {desarrollos.length === 0 ? (
        <EmptyState message="Este alumno todavía no tiene intervenciones registradas." />
      ) : (
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
      )}
    </div>
  );
}
