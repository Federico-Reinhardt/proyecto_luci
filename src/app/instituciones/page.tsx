import Link from "next/link";
import { PageHeader, Card, TableWrapper } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { instituciones } from "@/data/mock";

export default function InstitucionesPage() {
  return (
    <div>
      <PageHeader
        title="Instituciones"
        description="Jardines, escuelas y centros educativos con los que trabaja el equipo."
        actions={
          <Link
            href="/instituciones/nueva"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            <IconPlus className="h-4 w-4" /> Nueva institución
          </Link>
        }
      />

      <TableWrapper className="hidden md:block">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Nombre</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Tipo</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Nivel</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Referente</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Teléfono</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {instituciones.map((inst) => (
              <tr key={inst.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{inst.nombre}</td>
                <td className="px-4 py-3 text-slate-600">{inst.tipo}</td>
                <td className="px-4 py-3 text-slate-600">{inst.nivel}</td>
                <td className="px-4 py-3 text-slate-600">{inst.referente}</td>
                <td className="px-4 py-3 text-slate-600">{inst.telefono}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/instituciones/${inst.id}`} className="text-sm font-medium text-teal-600 hover:text-teal-700">
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      <div className="grid gap-3 md:hidden">
        {instituciones.map((inst) => (
          <Link key={inst.id} href={`/instituciones/${inst.id}`}>
            <Card className="p-4">
              <p className="font-medium text-slate-900">{inst.nombre}</p>
              <p className="mt-1 text-sm text-slate-500">
                {inst.tipo} · {inst.nivel}
              </p>
              <p className="mt-2 text-sm text-slate-600">Referente: {inst.referente}</p>
              <p className="text-sm text-slate-600">{inst.telefono}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
