import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getAlumno, listInstituciones } from "@/db/queries";
import AlumnoForm from "@/app/alumnos/_components/AlumnoForm";

export default async function EditarAlumnoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumno = await getAlumno(id);
  if (!alumno) notFound();

  const instituciones = await listInstituciones();

  return (
    <div>
      <PageHeader
        backHref={`/alumnos/${alumno.id}`}
        title={`Editar ficha · ${alumno.nombre} ${alumno.apellido}`}
        description="Actualizá los datos del alumno."
      />
      <AlumnoForm alumno={alumno} instituciones={instituciones} />
    </div>
  );
}
