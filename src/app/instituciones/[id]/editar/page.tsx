import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getInstitucion } from "@/db/queries";
import InstitucionForm from "@/app/instituciones/_components/InstitucionForm";

export default async function EditarInstitucionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const institucion = await getInstitucion(id);
  if (!institucion) notFound();

  return (
    <div>
      <PageHeader
        backHref={`/instituciones/${institucion.id}`}
        title={`Editar ${institucion.nombre}`}
        description="Actualizá los datos de la institución."
      />
      <InstitucionForm institucion={institucion} />
    </div>
  );
}
