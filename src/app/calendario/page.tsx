import { listMesas, listIntervenciones, listInstituciones, listAlumnos } from "@/db/queries";
import CalendarioClient from "@/app/calendario/_components/CalendarioClient";

export default async function CalendarioPage() {
  const [mesas, intervenciones, instituciones, alumnos] = await Promise.all([
    listMesas(),
    listIntervenciones(),
    listInstituciones(),
    listAlumnos(),
  ]);

  return <CalendarioClient mesas={mesas} intervenciones={intervenciones} instituciones={instituciones} alumnos={alumnos} />;
}
