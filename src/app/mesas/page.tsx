import Link from "next/link";
import { PageHeader, Card, Badge, TableWrapper, EmptyState } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { listMesas, listInstituciones } from "@/db/queries";
import { formatFecha } from "@/lib/format";
import { colorEstadoMesa } from "@/lib/badges";

export default async function MesasPage() {
  const [mesas, instituciones] = await Promise.all([listMesas(), listInstituciones()]);
  const nombreInstitucion = (id: string) => instituciones.find((i) => i.id === id)?.nombre;

  return (
    <div>
      <PageHeader
        title="Mesas de coordinación"
        description="Mesas bimestrales de coordinación con las instituciones."
        actions={
          <Link
            href="/mesas/nueva"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <IconPlus className="h-4 w-4" /> Nueva mesa
          </Link>
        }
      />

      {mesas.length === 0 ? (
        <EmptyState message="Todavía no hay mesas cargadas." />
      ) : (
        <>
          <TableWrapper className="hidden md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Institución</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Fecha</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Bimestre</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Año</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Modalidad</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-500">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mesas.map((mesa) => (
                  <tr key={mesa.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{nombreInstitucion(mesa.institucionId)}</td>
                    <td className="px-4 py-3 text-slate-600">{formatFecha(mesa.fecha)}</td>
                    <td className="px-4 py-3 text-slate-600">{mesa.bimestre}°</td>
                    <td className="px-4 py-3 text-slate-600">{mesa.anioLectivo}</td>
                    <td className="px-4 py-3 text-slate-600">{mesa.modalidad}</td>
                    <td className="px-4 py-3">
                      <Badge color={colorEstadoMesa(mesa.estado)}>{mesa.estado}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/mesas/${mesa.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>

          <div className="grid gap-3 md:hidden">
            {mesas.map((mesa) => (
              <Link key={mesa.id} href={`/mesas/${mesa.id}`}>
                <Card className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">{nombreInstitucion(mesa.institucionId)}</p>
                    <Badge color={colorEstadoMesa(mesa.estado)}>{mesa.estado}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatFecha(mesa.fecha)} · {mesa.bimestre}° bimestre {mesa.anioLectivo}
                  </p>
                  <p className="text-sm text-slate-600">{mesa.modalidad}</p>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
