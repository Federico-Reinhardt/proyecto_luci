import { PageHeader } from "@/components/ui";
import { listInstituciones } from "@/db/queries";
import MesaForm from "@/app/mesas/_components/MesaForm";

export default async function NuevaMesaPage() {
  const instituciones = await listInstituciones();

  return (
    <div>
      <PageHeader backHref="/mesas" title="Nueva mesa de coordinación" description="Cargá los datos de la mesa." />
      <MesaForm instituciones={instituciones} />
    </div>
  );
}
