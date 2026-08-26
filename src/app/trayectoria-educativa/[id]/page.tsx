import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, Card, InfoField } from "@/components/ui";
import DeleteButton from "@/components/DeleteButton";
import { getTrayectoria, getAlumno, getDocente } from "@/db/queries";
import { deleteTrayectoria } from "@/app/trayectoria-educativa/actions";
import { formatFecha } from "@/lib/format";

export default async function TrayectoriaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trayectoria = await getTrayectoria(id);
  if (!trayectoria) notFound();

  const [alumno, docente] = await Promise.all([getAlumno(trayectoria.alumnoId), getDocente(trayectoria.docenteId)]);

  return (
    <div>
      <PageHeader
        backHref="/trayectoria-educativa"
        title={`${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`}
        description={formatFecha(trayectoria.fechaRegistro)}
        actions={
          <>
            <Link
              href={`/trayectoria-educativa/${trayectoria.id}/editar`}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Editar
            </Link>
            <DeleteButton
              action={deleteTrayectoria.bind(null, trayectoria.id)}
              confirmMessage="¿Seguro que querés borrar este registro de trayectoria educativa? No se puede deshacer."
            />
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
          <InfoField label="Docente" value={docente ? `${docente.nombre} ${docente.apellido}` : "-"} />
          <InfoField label="Fecha de registro" value={formatFecha(trayectoria.fechaRegistro)} />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 border-t border-slate-100 pt-5">
          <InfoField label="Descripción" value={trayectoria.descripcion} />
          <InfoField label="Acciones y acuerdos educativos" value={trayectoria.accionesAcuerdosEducativos} />
        </div>
      </Card>
    </div>
  );
}
