import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, Badge, InfoField, EmptyState } from "@/components/ui";
import { getMesa, getInstitucion, alumnosDeInstitucion, intervencionesDeInstitucion } from "@/data/mock";
import { formatFecha } from "@/lib/format";
import { colorEstadoMesa, colorEstadoIntervencion, colorSituacionEscolar } from "@/lib/badges";

export default async function MesaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mesa = getMesa(id);
  if (!mesa) notFound();

  const institucion = getInstitucion(mesa.institucionId);
  const alumnos = alumnosDeInstitucion(mesa.institucionId);
  const intervenciones = intervencionesDeInstitucion(mesa.institucionId);

  return (
    <div>
      <PageHeader
        backHref="/mesas"
        title={`Mesa · ${institucion?.nombre ?? ""}`}
        description={`${formatFecha(mesa.fecha)} · ${mesa.bimestre}° bimestre ${mesa.anioLectivo} · ${mesa.modalidad}`}
        actions={
          <>
            <Badge color={colorEstadoMesa(mesa.estado)}>{mesa.estado}</Badge>
            <Link
              href={`/mesas/${mesa.id}/editar`}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Editar
            </Link>
          </>
        }
      />

      <Card className="p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          <InfoField label="Modalidad" value={mesa.modalidad} />
          <InfoField label="Participantes" value={mesa.participantes} />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-slate-100 pt-5">
          <InfoField label="Temas tratados" value={mesa.temasTratados} />
          <InfoField label="Acuerdos" value={mesa.acuerdos} />
          <InfoField label="Acta" value={mesa.acta} />
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Alumnos de la institución ({alumnos.length})</h2>
        {alumnos.length === 0 ? (
          <EmptyState message="Esta institución todavía no tiene alumnos registrados." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {alumnos.map((alumno) => (
              <Link key={alumno.id} href={`/alumnos/${alumno.id}`}>
                <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {alumno.nombre} {alumno.apellido}
                    </p>
                    <p className="text-xs text-slate-500">{alumno.gradoAnioSala}</p>
                  </div>
                  <Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Intervenciones relacionadas ({intervenciones.length})</h2>
        {intervenciones.length === 0 ? (
          <EmptyState message="No hay intervenciones registradas para esta institución." />
        ) : (
          <div className="grid gap-3">
            {intervenciones.map((intervencion) => {
              const alumno = alumnos.find((a) => a.id === intervencion.alumnoId);
              return (
                <Link key={intervencion.id} href={`/intervenciones/${intervencion.id}`}>
                  <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {intervencion.tipo} · {alumno?.nombre} {alumno?.apellido}
                      </p>
                      <p className="text-xs text-slate-500">{formatFecha(intervencion.fecha)}</p>
                    </div>
                    <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
