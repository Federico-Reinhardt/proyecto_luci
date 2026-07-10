import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getMesa, getInstitucion, listInstituciones } from "@/db/queries";
import MesaForm from "@/app/mesas/_components/MesaForm";

export default async function EditarMesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mesa = await getMesa(id);
  if (!mesa) notFound();

  const [institucion, instituciones] = await Promise.all([getInstitucion(mesa.institucionId), listInstituciones()]);

  return (
    <div>
      <PageHeader
        backHref={`/mesas/${mesa.id}`}
        title={`Editar mesa · ${institucion?.nombre ?? ""}`}
        description="Actualizá los datos de la mesa."
      />
      <MesaForm mesa={mesa} instituciones={instituciones} />
    </div>
  );
}
