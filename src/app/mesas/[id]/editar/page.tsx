import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui";
import { getMesa, getInstitucion } from "@/data/mock";
import MesaForm from "@/app/mesas/_components/MesaForm";

export default async function EditarMesaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mesa = getMesa(id);
  if (!mesa) notFound();

  const institucion = getInstitucion(mesa.institucionId);

  return (
    <div>
      <PageHeader
        backHref={`/mesas/${mesa.id}`}
        title={`Editar mesa · ${institucion?.nombre ?? ""}`}
        description="Actualizá los datos de la mesa. (Prototipo visual: no se guarda información todavía.)"
      />
      <MesaForm mesa={mesa} />
    </div>
  );
}
