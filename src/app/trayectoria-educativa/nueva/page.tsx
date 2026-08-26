import { PageHeader } from "@/components/ui";
import { listAlumnos, listDocentes } from "@/db/queries";
import TrayectoriaForm from "@/app/trayectoria-educativa/_components/TrayectoriaForm";

export default async function NuevaTrayectoriaPage() {
  const [alumnos, docentes] = await Promise.all([listAlumnos(), listDocentes()]);

  return (
    <div>
      <PageHeader
        backHref="/trayectoria-educativa"
        title="Nuevo registro de trayectoria educativa"
        description="Cargá los datos del seguimiento educativo."
      />
      <TrayectoriaForm alumnos={alumnos} docentes={docentes} />
    </div>
  );
}
