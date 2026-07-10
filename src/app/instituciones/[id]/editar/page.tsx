import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getInstitucion } from "@/data/mock";
import InstitucionForm from "@/app/instituciones/_components/InstitucionForm";

export default async function EditarInstitucionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const institucion = getInstitucion(id);
  if (!institucion) notFound();

  return (
    <div>
      <PageHeader
        backHref={`/instituciones/${institucion.id}`}
        title={`Editar ${institucion.nombre}`}
        description="Actualizá los datos de la institución. (Prototipo visual: no se guarda información todavía.)"
      />
      <InstitucionForm institucion={institucion} />
    </div>
  );
}
