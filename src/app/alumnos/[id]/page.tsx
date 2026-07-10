import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, Badge, InfoField, EmptyState, SectionTitle } from "@/components/ui";
import { getAlumno, getInstitucion, intervencionesDeAlumno } from "@/data/mock";
import { formatFecha, calcularEdad } from "@/lib/format";
import { colorSituacionEscolar, colorEstadoIntervencion } from "@/lib/badges";

export default async function AlumnoFichaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumno = getAlumno(id);
  if (!alumno) notFound();

  const institucion = getInstitucion(alumno.institucionId);
  const historial = intervencionesDeAlumno(alumno.id).sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <div>
      <PageHeader
        backHref="/alumnos"
        title={`${alumno.nombre} ${alumno.apellido}`}
        description={`DNI ${alumno.dni} · ${calcularEdad(alumno.fechaNacimiento)} años`}
        actions={
          <>
            <Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>
            <Link
              href={`/alumnos/${alumno.id}/editar`}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Editar
            </Link>
          </>
        }
      />

      <div className="grid gap-6">
        <Card className="p-5">
          <SectionTitle>Datos personales</SectionTitle>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoField label="Nombre y apellido" value={`${alumno.nombre} ${alumno.apellido}`} />
            <InfoField label="DNI" value={alumno.dni} />
            <InfoField label="Fecha de nacimiento" value={formatFecha(alumno.fechaNacimiento)} />
            <InfoField label="Edad" value={`${calcularEdad(alumno.fechaNacimiento)} años`} />
            <InfoField label="Género" value={alumno.genero} />
            <InfoField label="Teléfono" value={alumno.telefono} />
            <InfoField label="Dirección" value={alumno.direccion} />
            <InfoField label="Localidad" value={alumno.localidad} />
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Responsable / tutor</SectionTitle>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoField label="Nombre" value={alumno.responsableNombre} />
            <InfoField label="Vínculo" value={alumno.responsableVinculo} />
            <InfoField label="DNI" value={alumno.responsableDni} />
            <InfoField label="Teléfono" value={alumno.responsableTelefono} />
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Datos educativos</SectionTitle>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
            <InfoField label="Nivel" value={alumno.nivel} />
            <InfoField label="Grado / año / sala" value={alumno.gradoAnioSala} />
            <InfoField label="Turno" value={alumno.turno} />
            <InfoField
              label="Situación de escolaridad"
              value={<Badge color={colorSituacionEscolar(alumno.situacionEscolar)}>{alumno.situacionEscolar}</Badge>}
            />
          </div>
          <div className="mt-5 border-t border-slate-100 pt-5">
            <InfoField label="Trayectoria previa" value={alumno.trayectoriaPrevia} />
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle>Salud y otros datos</SectionTitle>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoField label="Obra social" value={alumno.obraSocial} />
            <InfoField label="CUD" value={alumno.cud ? "Sí" : "No"} />
            <InfoField label="Condiciones de salud relevantes" value={alumno.condicionesSalud} />
            <InfoField label="Tratamientos" value={alumno.tratamientos} />
          </div>
          {alumno.observaciones && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <InfoField label="Observaciones" value={alumno.observaciones} />
            </div>
          )}
        </Card>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Historial de intervenciones ({historial.length})</h2>
            <Link href="/intervenciones/nueva" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              + Nueva intervención
            </Link>
          </div>
          {historial.length === 0 ? (
            <EmptyState message="Este alumno todavía no tiene intervenciones registradas." />
          ) : (
            <div className="grid gap-3">
              {historial.map((intervencion) => (
                <Link key={intervencion.id} href={`/intervenciones/${intervencion.id}`}>
                  <Card className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{intervencion.tipo}</p>
                      <p className="text-xs text-slate-500">
                        {formatFecha(intervencion.fecha)} · {intervencion.responsable}
                      </p>
                    </div>
                    <Badge color={colorEstadoIntervencion(intervencion.estado)}>{intervencion.estado}</Badge>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
