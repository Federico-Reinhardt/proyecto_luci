import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getIntervencion, getAlumno, listAlumnos, listInstituciones } from "@/db/queries";
import IntervencionForm from "@/app/intervenciones/_components/IntervencionForm";

export default async function EditarIntervencionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const intervencion = await getIntervencion(id);
  if (!intervencion) notFound();

  const [alumno, alumnos, instituciones] = await Promise.all([
    getAlumno(intervencion.alumnoId),
    listAlumnos(),
    listInstituciones(),
  ]);

  return (
    <div>
      <PageHeader
        backHref={`/intervenciones/${intervencion.id}`}
        title={`Editar intervención · ${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`}
        description="Actualizá los datos de la intervención."
      />
      <IntervencionForm intervencion={intervencion} alumnos={alumnos} instituciones={instituciones} />
    </div>
  );
}
