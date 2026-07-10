import { PageHeader } from "@/components/ui";
import { listInstituciones } from "@/db/queries";
import AlumnoForm from "@/app/alumnos/_components/AlumnoForm";

export default async function NuevoAlumnoPage() {
  const instituciones = await listInstituciones();

  return (
    <div>
      <PageHeader backHref="/alumnos" title="Nuevo alumno" description="Cargá la ficha del alumno." />
      <AlumnoForm instituciones={instituciones} />
    </div>
  );
}
