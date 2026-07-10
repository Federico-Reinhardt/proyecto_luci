import { PageHeader } from "@/components/ui";
import { listAlumnos, listInstituciones } from "@/db/queries";
import IntervencionForm from "@/app/intervenciones/_components/IntervencionForm";

export default async function NuevaIntervencionPage() {
  const [alumnos, instituciones] = await Promise.all([listAlumnos(), listInstituciones()]);

  return (
    <div>
      <PageHeader backHref="/intervenciones" title="Nueva intervención" description="Cargá los datos de la intervención." />
      <IntervencionForm alumnos={alumnos} instituciones={instituciones} />
    </div>
  );
}
