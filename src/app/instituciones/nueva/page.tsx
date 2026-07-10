import { PageHeader } from "@/components/ui";
import InstitucionForm from "@/app/instituciones/_components/InstitucionForm";

export default function NuevaInstitucionPage() {
  return (
    <div>
      <PageHeader
        backHref="/instituciones"
        title="Nueva institución"
        description="Cargá los datos de la institución."
      />
      <InstitucionForm />
    </div>
  );
}
