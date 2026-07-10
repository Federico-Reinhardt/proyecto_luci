"use client";

import { useActionState } from "react";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Intervencion, TipoIntervencion, EstadoIntervencion, Alumno, Institucion } from "@/db/schema";
import { createIntervencion, updateIntervencion, deleteIntervencion } from "@/app/intervenciones/actions";

const TIPOS: TipoIntervencion[] = ["Entrevista", "Derivación", "Seguimiento", "Articulación", "Otro"];
const ESTADOS: EstadoIntervencion[] = ["Abierta", "En seguimiento", "Cerrada"];

export default function IntervencionForm({
  intervencion,
  alumnos,
  instituciones,
}: {
  intervencion?: Intervencion;
  alumnos: Alumno[];
  instituciones: Institucion[];
}) {
  const action = intervencion ? updateIntervencion.bind(null, intervencion.id) : createIntervencion;
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      <Card className="p-5">
        <SectionTitle>Datos de la intervención</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Alumno">
            <select name="alumnoId" defaultValue={intervencion?.alumnoId ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná un alumno
              </option>
              {alumnos.map((alumno) => (
                <option key={alumno.id} value={alumno.id}>
                  {alumno.nombre} {alumno.apellido}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Institución">
            <select name="institucionId" defaultValue={intervencion?.institucionId ?? ""} className={fieldClass}>
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
          <FormField label="Tipo">
            <select name="tipo" defaultValue={intervencion?.tipo ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná una opción
              </option>
              {TIPOS.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Fecha">
            <input name="fecha" type="date" defaultValue={intervencion?.fecha} className={fieldClass} />
          </FormField>
          <FormField label="Responsable">
            <input
              name="responsable"
              type="text"
              defaultValue={intervencion?.responsable}
              className={fieldClass}
              placeholder="Ej: Federico (Psicopedagogía)"
            />
          </FormField>
          <FormField label="Estado">
            <select name="estado" defaultValue={intervencion?.estado ?? "Abierta"} className={fieldClass}>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Fecha próximo seguimiento">
            <input
              name="fechaProximoSeguimiento"
              type="date"
              defaultValue={intervencion?.fechaProximoSeguimiento ?? ""}
              className={fieldClass}
            />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Desarrollo</SectionTitle>
        <div className="grid grid-cols-1 gap-5">
          <FormField label="Descripción">
            <textarea name="descripcion" defaultValue={intervencion?.descripcion} rows={3} className={fieldClass} />
          </FormField>
          <FormField label="Acuerdos y acciones">
            <textarea name="acuerdosAcciones" defaultValue={intervencion?.acuerdosAcciones} rows={3} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      {state?.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

      <FormActions
        cancelHref={intervencion ? `/intervenciones/${intervencion.id}` : "/intervenciones"}
        onDelete={intervencion ? deleteIntervencion.bind(null, intervencion.id) : undefined}
        deleteConfirmMessage="¿Seguro que querés borrar esta intervención? No se puede deshacer."
      />
      {pending && <p className="mt-2 text-right text-xs text-slate-400">Guardando...</p>}
    </form>
  );
}
