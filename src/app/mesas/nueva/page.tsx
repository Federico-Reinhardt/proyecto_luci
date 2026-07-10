import { PageHeader } from "@/components/ui";
import MesaForm from "@/app/mesas/_components/MesaForm";

export default function NuevaMesaPage() {
  return (
    <div>
      <PageHeader
        backHref="/mesas"
        title="Nueva mesa de coordinación"
        description="Cargá los datos de la mesa. (Prototipo visual: no se guarda información todavía.)"
      />
      <MesaForm />
    </div>
  );
}
