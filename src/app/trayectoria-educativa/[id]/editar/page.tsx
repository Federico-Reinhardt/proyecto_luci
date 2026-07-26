import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getTrayectoria, getAlumno, listAlumnos, listDocentes } from "@/db/queries";
import TrayectoriaForm from "@/app/trayectoria-educativa/_components/TrayectoriaForm";

export default async function EditarTrayectoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trayectoria = await getTrayectoria(id);
  if (!trayectoria) notFound();

  const [alumno, alumnos, docentes] = await Promise.all([
    getAlumno(trayectoria.alumnoId),
    listAlumnos(),
    listDocentes(),
  ]);

  return (
    <div>
      <PageHeader
        backHref={`/trayectoria-educativa/${trayectoria.id}`}
        title={`Editar trayectoria educativa · ${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`}
        description="Actualizá los datos del registro."
      />
      <TrayectoriaForm trayectoria={trayectoria} alumnos={alumnos} docentes={docentes} />
    </div>
  );
}
