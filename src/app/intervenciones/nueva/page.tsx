import { PageHeader } from "@/components/ui";
import IntervencionForm from "@/app/intervenciones/_components/IntervencionForm";

export default function NuevaIntervencionPage() {
  return (
    <div>
      <PageHeader
        backHref="/intervenciones"
        title="Nueva intervención"
        description="Cargá los datos de la intervención. (Prototipo visual: no se guarda información todavía.)"
      />
      <IntervencionForm />
    </div>
  );
}
