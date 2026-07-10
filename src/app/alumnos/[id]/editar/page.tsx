import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getAlumno } from "@/data/mock";
import AlumnoForm from "@/app/alumnos/_components/AlumnoForm";

export default async function EditarAlumnoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const alumno = getAlumno(id);
  if (!alumno) notFound();

  return (
    <div>
      <PageHeader
        backHref={`/alumnos/${alumno.id}`}
        title={`Editar ficha · ${alumno.nombre} ${alumno.apellido}`}
        description="Actualizá los datos del alumno. (Prototipo visual: no se guarda información todavía.)"
      />
      <AlumnoForm alumno={alumno} />
    </div>
  );
}
