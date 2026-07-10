import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getIntervencion, getAlumno } from "@/data/mock";
import IntervencionForm from "@/app/intervenciones/_components/IntervencionForm";

export default async function EditarIntervencionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const intervencion = getIntervencion(id);
  if (!intervencion) notFound();

  const alumno = getAlumno(intervencion.alumnoId);

  return (
    <div>
      <PageHeader
        backHref={`/intervenciones/${intervencion.id}`}
        title={`Editar intervención · ${alumno?.nombre ?? ""} ${alumno?.apellido ?? ""}`}
        description="Actualizá los datos de la intervención. (Prototipo visual: no se guarda información todavía.)"
      />
      <IntervencionForm intervencion={intervencion} />
    </div>
  );
}
