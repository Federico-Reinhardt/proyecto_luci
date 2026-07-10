"use client";

import { useActionState } from "react";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Alumno, SituacionEscolar, Institucion } from "@/db/schema";
import { createAlumno, updateAlumno, deleteAlumno } from "@/app/alumnos/actions";

const SITUACIONES: SituacionEscolar[] = [
  "Escolarizado",
  "Con inasistencias",
  "Desescolarizado",
  "En proceso de inclusión",
];

export default function AlumnoForm({ alumno, instituciones }: { alumno?: Alumno; instituciones: Institucion[] }) {
  const action = alumno ? updateAlumno.bind(null, alumno.id) : createAlumno;
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction}>
      <Card className="p-5">
        <SectionTitle>Datos personales</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Nombre">
            <input name="nombre" type="text" defaultValue={alumno?.nombre} className={fieldClass} />
          </FormField>
          <FormField label="Apellido">
            <input name="apellido" type="text" defaultValue={alumno?.apellido} className={fieldClass} />
          </FormField>
          <FormField label="DNI">
            <input name="dni" type="text" defaultValue={alumno?.dni} className={fieldClass} />
          </FormField>
          <FormField label="Fecha de nacimiento">
            <input name="fechaNacimiento" type="date" defaultValue={alumno?.fechaNacimiento} className={fieldClass} />
          </FormField>
          <FormField label="Género">
            <input name="genero" type="text" defaultValue={alumno?.genero} className={fieldClass} placeholder="Ej: Femenino" />
          </FormField>
          <FormField label="Teléfono">
            <input name="telefono" type="tel" defaultValue={alumno?.telefono} className={fieldClass} />
          </FormField>
          <FormField label="Dirección">
            <input name="direccion" type="text" defaultValue={alumno?.direccion} className={fieldClass} />
          </FormField>
          <FormField label="Localidad">
            <input name="localidad" type="text" defaultValue={alumno?.localidad} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Responsable / tutor</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Nombre">
            <input name="responsableNombre" type="text" defaultValue={alumno?.responsableNombre} className={fieldClass} />
          </FormField>
          <FormField label="Vínculo" hint="Ej: Madre, Padre, Tutor/a">
            <input name="responsableVinculo" type="text" defaultValue={alumno?.responsableVinculo} className={fieldClass} />
          </FormField>
          <FormField label="DNI">
            <input name="responsableDni" type="text" defaultValue={alumno?.responsableDni} className={fieldClass} />
          </FormField>
          <FormField label="Teléfono">
            <input name="responsableTelefono" type="tel" defaultValue={alumno?.responsableTelefono} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Datos educativos</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Institución">
            <select name="institucionId" defaultValue={alumno?.institucionId ?? ""} className={fieldClass}>
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
          <FormField label="Nivel">
            <input name="nivel" type="text" defaultValue={alumno?.nivel} className={fieldClass} placeholder="Ej: Primario" />
          </FormField>
          <FormField label="Grado / año / sala">
            <input name="gradoAnioSala" type="text" defaultValue={alumno?.gradoAnioSala} className={fieldClass} placeholder="Ej: 4° grado" />
          </FormField>
          <FormField label="Turno">
            <input name="turno" type="text" defaultValue={alumno?.turno} className={fieldClass} placeholder="Ej: Mañana" />
          </FormField>
          <FormField label="Situación de escolaridad">
            <select name="situacionEscolar" defaultValue={alumno?.situacionEscolar ?? ""} className={fieldClass}>
              <option value="" disabled>
                Seleccioná una opción
              </option>
              {SITUACIONES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FormField>
        </div>
        <div className="mt-5">
          <FormField label="Trayectoria previa">
            <textarea name="trayectoriaPrevia" defaultValue={alumno?.trayectoriaPrevia} rows={3} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Salud y otros datos</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Obra social">
            <input name="obraSocial" type="text" defaultValue={alumno?.obraSocial} className={fieldClass} />
          </FormField>
          <FormField label="CUD">
            <select name="cud" defaultValue={alumno?.cud ? "si" : "no"} className={fieldClass}>
              <option value="no">No</option>
              <option value="si">Sí</option>
            </select>
          </FormField>
          <FormField label="Tratamientos" className="sm:col-span-2 lg:col-span-1">
            <input name="tratamientos" type="text" defaultValue={alumno?.tratamientos} className={fieldClass} />
          </FormField>
          <FormField label="Condiciones de salud relevantes" className="sm:col-span-2 lg:col-span-3">
            <textarea name="condicionesSalud" defaultValue={alumno?.condicionesSalud} rows={2} className={fieldClass} />
          </FormField>
          <FormField label="Observaciones" className="sm:col-span-2 lg:col-span-3">
            <textarea name="observaciones" defaultValue={alumno?.observaciones} rows={3} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      {state?.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

      <FormActions
        cancelHref={alumno ? `/alumnos/${alumno.id}` : "/alumnos"}
        onDelete={alumno ? deleteAlumno.bind(null, alumno.id) : undefined}
        deleteConfirmMessage="¿Seguro que querés borrar este alumno? También se borran sus intervenciones. No se puede deshacer."
      />
      {pending && <p className="mt-2 text-right text-xs text-slate-400">Guardando...</p>}
    </form>
  );
}
