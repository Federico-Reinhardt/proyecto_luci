import Link from "next/link";
import { PageHeader, Card, Badge, EmptyState, StatCard } from "@/components/ui";
import { IconBuilding, IconMeeting, IconUsers, IconClipboard } from "@/components/icons";
import { listInstituciones, listMesas, listAlumnos, listIntervenciones } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import { colorEstadoMesa } from "@/lib/badges";

const BIMESTRE_ACTUAL = 4;
const ANIO_ACTUAL = 2026;

export default async function DashboardPage() {
  const [instituciones, mesas, alumnos, intervenciones] = await Promise.all([
    listInstituciones(),
    listMesas(),
    listAlumnos(),
    listIntervenciones(),
  ]);
  const getInstitucion = (id: string) => instituciones.find((i) => i.id === id);
  const getAlumno = (id: string) => alumnos.find((a) => a.id === id);

  const mesasBimestre = mesas.filter((m) => m.anioLectivo === ANIO_ACTUAL && m.bimestre === BIMESTRE_ACTUAL);
  const alumnosActivos = alumnos.filter((a) => a.situacionEscolar !== "Desescolarizado");
  const intervencionesAbiertas = intervenciones.filter((i) => i.estado !== "Cerrada");

  const proximasMesas = mesas.filter((m) => m.estado === "Programada").sort((a, b) => a.fecha.localeCompare(b.fecha));

  const proximosSeguimientos = intervenciones
    .filter((i) => i.fechaProximoSeguimiento)
    .sort((a, b) => (a.fechaProximoSeguimiento ?? "").localeCompare(b.fechaProximoSeguimiento ?? ""));

  return (
    <div>
      <PageHeader title="Inicio" description="Resumen general de la actividad del equipo de psicopedagogía." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Instituciones" value={instituciones.length} icon={IconBuilding} href="/instituciones" />
        <StatCard label={`Mesas del ${BIMESTRE_ACTUAL}° bimestre`} value={mesasBimestre.length} icon={IconMeeting} href="/mesas" />
        <StatCard label="Alumnos activos" value={alumnosActivos.length} icon={IconUsers} href="/alumnos" />
        <StatCard label="Intervenciones abiertas" value={intervencionesAbiertas.length} icon={IconClipboard} href="/intervenciones" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Próximas mesas</h2>
            <Link href="/mesas" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              Ver todas
            </Link>
          </div>
          {proximasMesas.length === 0 ? (
            <EmptyState message="No hay mesas programadas." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {proximasMesas.map((mesa) => {
                const inst = getInstitucion(mesa.institucionId);
                return (
                  <li key={mesa.id}>
                    <Link
                      href={`/mesas/${mesa.id}`}
                      className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-slate-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">{inst?.nombre}</p>
                        <p className="text-xs text-slate-500">
                          {formatFecha(mesa.fecha)} · {mesa.bimestre}° bimestre · {mesa.modalidad}
                        </p>
                      </div>
                      <Badge color={colorEstadoMesa(mesa.estado)}>{mesa.estado}</Badge>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900">Próximos seguimientos</h2>
            <Link href="/intervenciones" className="text-sm font-medium text-teal-600 hover:text-teal-700">
              Ver todas
            </Link>
          </div>
          {proximosSeguimientos.length === 0 ? (
            <EmptyState message="No hay seguimientos programados." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {proximosSeguimientos.map((intervencion) => {
                const alumno = getAlumno(intervencion.alumnoId);
                return (
                  <li key={intervencion.id}>
                    <Link
                      href={`/intervenciones/${intervencion.id}`}
                      className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3 hover:bg-slate-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {alumno?.nombre} {alumno?.apellido}
                        </p>
                        <p className="text-xs text-slate-500">{intervencion.tipo}</p>
                      </div>
                      <Badge color="blue">{formatFecha(intervencion.fechaProximoSeguimiento)}</Badge>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
