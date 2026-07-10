import { PageHeader } from "@/components/ui";
import AlumnoForm from "@/app/alumnos/_components/AlumnoForm";

export default function NuevoAlumnoPage() {
  return (
    <div>
      <PageHeader
        backHref="/alumnos"
        title="Nuevo alumno"
        description="Cargá la ficha del alumno. (Prototipo visual: no se guarda información todavía.)"
      />
      <AlumnoForm />
    </div>
  );
}
