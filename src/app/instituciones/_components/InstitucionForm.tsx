"use client";

import { useActionState } from "react";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Institucion, TipoInstitucion } from "@/db/schema";
import { createInstitucion, updateInstitucion, deleteInstitucion } from "@/app/instituciones/actions";

const TIPOS: TipoInstitucion[] = ["Jardín", "Primaria", "Secundaria", "Especial", "Otro"];

export default function InstitucionForm({ institucion }: { institucion?: Institucion }) {
  const action = institucion ? updateInstitucion.bind(null, institucion.id) : createInstitucion;
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      <Card className="p-5">
        <SectionTitle>Datos de la institución</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Nombre" className="sm:col-span-2">
            <input name="nombre" type="text" defaultValue={institucion?.nombre} className={fieldClass} placeholder="Ej: Escuela Primaria N°12" />
          </FormField>
          <FormField label="Nivel">
            <select name="tipo" defaultValue={institucion?.tipo ?? ""} className={fieldClass}>
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
          <FormField label="Dirección" className="sm:col-span-2">
            <input name="direccion" type="text" defaultValue={institucion?.direccion} className={fieldClass} />
          </FormField>
          <FormField label="Teléfono">
            <input name="telefono" type="tel" defaultValue={institucion?.telefono} className={fieldClass} />
          </FormField>
          <FormField label="Email">
            <input name="email" type="email" defaultValue={institucion?.email} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Referente</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Referente">
            <input name="referente" type="text" defaultValue={institucion?.referente} className={fieldClass} />
          </FormField>
          <FormField label="Cargo del referente">
            <input name="cargoReferente" type="text" defaultValue={institucion?.cargoReferente} className={fieldClass} />
          </FormField>
          <FormField label="Teléfono del referente">
            <input name="telefonoReferente" type="tel" defaultValue={institucion?.telefonoReferente} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Observaciones</SectionTitle>
        <FormField label="Observaciones">
          <textarea name="observaciones" defaultValue={institucion?.observaciones} rows={4} className={fieldClass} />
        </FormField>
      </Card>

      {state?.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

      <FormActions
        cancelHref={institucion ? `/instituciones/${institucion.id}` : "/instituciones"}
        onDelete={institucion ? deleteInstitucion.bind(null, institucion.id) : undefined}
        deleteConfirmMessage="¿Seguro que querés borrar esta institución? No se puede deshacer."
      />
      {pending && <p className="mt-2 text-right text-xs text-slate-400">Guardando...</p>}
    </form>
  );
}
