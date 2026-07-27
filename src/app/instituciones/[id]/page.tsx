import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, Badge, InfoField, EmptyState } from "@/components/ui";
import DeleteButton from "@/components/DeleteButton";
import {
  getInstitucion,
  mesasDeInstitucion,
  alumnosDeInstitucion,
  intervencionesDeInstitucion,
} from "@/db/queries";
import { deleteInstitucion } from "@/app/instituciones/actions";
import { formatFecha } from "@/lib/format";
import { colorEstadoMesa, colorEstadoIntervencion, colorSituacionEscolar } from "@/lib/badges";

export default async function InstitucionDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const institucion = await getInstitucion(id);
  if (!institucion) notFound();

  const [mesas, alumnos, intervenciones] = await Promise.all([
    mesasDeInstitucion(institucion.id),
    alumnosDeInstitucion(institucion.id),
    intervencionesDeInstitucion(institucion.id),
  ]);

  return (
    <div>
      <PageHeader
        backHref="/instituciones"
        title={institucion.nombre}
        description={institucion.tipo}
        actions={
          <>
            <Link
              href={`/instituciones/${institucion.id}/editar`}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Editar
            </Link>
            <DeleteButton
              action={deleteInstitucion.bind(null, institucion.id)}
              confirmMessage="¿Seguro que querés borrar esta institución? No se puede deshacer."
            />
          </>
        }
      />

      <Card className="p-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoField label="Dirección" value={institucion.direccion} />
          <InfoField label="Teléfono" value={institucion.telefono} />
          <InfoField label="Email" value={institucion.email} />
          <InfoField label="Referente" value={institucion.referente} />
          <InfoField label="Cargo del referente" value={institucion.cargoReferente} />
          <InfoField label="Teléfono del referente" value={institucion.telefonoReferente} />
        </div>
        {institucion.observaciones && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            <InfoField label="Observaciones" value={institucion.observaciones} />
          </div>
        )}
      </Card>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Mesas de coordinación ({mesas.length})</h2>
        {mesas.length === 0 ? (
          <EmptyState message="Todavía no hay mesas registradas para esta institución." />
        ) : (
          <div className="grid gap-3">
            {mesas.map((mesa) => (
              <Link key={mesa.id} href={`/mesas/${mesa.id}`}>
                <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {formatFecha(mesa.fecha)} · {mesa.bimestre}° bimestre {mesa.anioLectivo}
                    </p>
                    <p className="text-xs text-slate-500">{mesa.modalidad}</p>
                  </div>
                  <Badge color={colorEstadoMesa(mesa.estado)}>{mesa.estado}</Badge>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Alumnos ({alumnos.length})</h2>
        {alumnos.length === 0 ? (
          <EmptyState message="Todavía no hay alumnos registrados en esta institución." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {alumnos.map((alumno) => (
              <Link key={alumno.id} href={`/alumnos/${alumno.id}`}>
                <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {alumno.nombre} {alumno.apellido}
                    </p>
                    <p className="text-xs text-slate-500">
                      {alumno.gradoAnioSala} · DNI {alumno.dni}
                    </p>
                  </div>
                  <Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-base font-semibold text-slate-900">Intervenciones ({intervenciones.length})</h2>
        {intervenciones.length === 0 ? (
          <EmptyState message="Todavía no hay intervenciones registradas para esta institución." />
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
