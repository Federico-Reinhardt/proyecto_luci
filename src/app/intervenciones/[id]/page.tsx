import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, Badge, InfoField } from "@/components/ui";
import { getIntervencion, getAlumno, getInstitucion } from "@/data/mock";
import { formatFecha } from "@/lib/format";
import { colorEstadoIntervencion } from "@/lib/badges";

export default async function IntervencionDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const intervencion = getIntervencion(id);
  if (!intervencion) notFound();

  const alumno = getAlumno(intervencion.alumnoId);
  const institucion = getInstitucion(intervencion.institucionId);

  return (
    <div>
      <PageHeader
        backHref="/intervenciones"
        title={`${intervencion.tipo} · ${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`}
        description={formatFecha(intervencion.fecha)}
        actions={
          <>
            <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
            <Link
              href={`/intervenciones/${intervencion.id}/editar`}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Editar
            </Link>
          </>
        }
      />

      <Card className="p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoField
            label="Alumno"
            value={
              alumno ? (
                <Link href={`/alumnos/${alumno.id}`} className="text-teal-600 hover:text-teal-700">
                  {alumno.nombre} {alumno.apellido}
                </Link>
              ) : (
                "-"
              )
            }
          />
          <InfoField
            label="Institución"
            value={
              institucion ? (
                <Link href={`/instituciones/${institucion.id}`} className="text-teal-600 hover:text-teal-700">
                  {institucion.nombre}
                </Link>
              ) : (
                "-"
              )
            }
          />
          <InfoField label="Responsable" value={intervencion.responsable} />
          <InfoField label="Tipo" value={intervencion.tipo} />
          <InfoField label="Fecha" value={formatFecha(intervencion.fecha)} />
          <InfoField label="Fecha próximo seguimiento" value={formatFecha(intervencion.fechaProximoSeguimiento)} />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-slate-100 pt-5">
          <InfoField label="Descripción" value={intervencion.descripcion} />
          <InfoField label="Acuerdos y acciones" value={intervencion.acuerdosAcciones} />
        </div>
      </Card>
    </div>
  );
}
