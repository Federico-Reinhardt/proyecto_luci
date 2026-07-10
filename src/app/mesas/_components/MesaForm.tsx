"use client";

import { useActionState } from "react";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Mesa, ModalidadMesa, EstadoMesa, Institucion } from "@/db/schema";
import { createMesa, updateMesa, deleteMesa } from "@/app/mesas/actions";

const MODALIDADES: ModalidadMesa[] = ["Presencial", "Virtual"];
const ESTADOS: EstadoMesa[] = ["Programada", "Realizada", "Suspendida"];
const BIMESTRES = [1, 2, 3, 4, 5, 6];

export default function MesaForm({ mesa, instituciones }: { mesa?: Mesa; instituciones: Institucion[] }) {
  const action = mesa ? updateMesa.bind(null, mesa.id) : createMesa;
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      <Card className="p-5">
        <SectionTitle>Datos de la mesa</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Institución" className="sm:col-span-2 lg:col-span-1">
            <select name="institucionId" defaultValue={mesa?.institucionId ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná una institución
              </option>
              {instituciones.map((inst) => (
                <option key={inst.id} value={inst.id}>
                  {inst.nombre}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Fecha">
            <input name="fecha" type="date" defaultValue={mesa?.fecha} className={fieldClass} />
          </FormField>
          <FormField label="Modalidad">
            <select name="modalidad" defaultValue={mesa?.modalidad ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná una opción
              </option>
              {MODALIDADES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Bimestre">
            <select name="bimestre" defaultValue={mesa?.bimestre ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná una opción
              </option>
              {BIMESTRES.map((b) => (
                <option key={b} value={b}>
                  {b}° bimestre
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Año lectivo">
            <input name="anioLectivo" type="number" defaultValue={mesa?.anioLectivo ?? 2026} className={fieldClass} />
          </FormField>
          <FormField label="Estado">
            <select name="estado" defaultValue={mesa?.estado ?? "Programada"} className={fieldClass}>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <div className="mt-5">
          <FormField label="Participantes" hint="Nombre y rol de cada participante, separados por coma.">
            <textarea name="participantes" defaultValue={mesa?.participantes} rows={2} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Desarrollo de la mesa</SectionTitle>
        <div className="grid grid-cols-1 gap-5">
          <FormField label="Temas tratados">
            <textarea name="temasTratados" defaultValue={mesa?.temasTratados} rows={3} className={fieldClass} />
          </FormField>
          <FormField label="Acuerdos">
            <textarea name="acuerdos" defaultValue={mesa?.acuerdos} rows={3} className={fieldClass} />
          </FormField>
          <FormField label="Acta" hint="Referencia o transcripción del acta de la reunión.">
            <textarea name="acta" defaultValue={mesa?.acta} rows={2} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      {state?.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

      <FormActions
        cancelHref={mesa ? `/mesas/${mesa.id}` : "/mesas"}
        onDelete={mesa ? deleteMesa.bind(null, mesa.id) : undefined}
        deleteConfirmMessage="¿Seguro que querés borrar esta mesa? No se puede deshacer."
      />
      {pending && <p className="mt-2 text-right text-xs text-slate-400">Guardando...</p>}
    </form>
  );
}
