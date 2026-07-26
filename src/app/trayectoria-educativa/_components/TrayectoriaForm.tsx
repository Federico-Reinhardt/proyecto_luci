"use client";

import { useActionState, useState } from "react";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { TrayectoriaEducativa, Alumno, Docente } from "@/db/schema";
import { createTrayectoria, updateTrayectoria, deleteTrayectoria } from "@/app/trayectoria-educativa/actions";

export default function TrayectoriaForm({
  trayectoria,
  alumnos,
  docentes,
}: {
  trayectoria?: TrayectoriaEducativa;
  alumnos: Alumno[];
  docentes: Docente[];
}) {
  const action = trayectoria ? updateTrayectoria.bind(null, trayectoria.id) : createTrayectoria;
  const [state, formAction, pending] = useActionState(action, undefined);
  const [nuevoDocente, setNuevoDocente] = useState(false);

  return (
    <form action={formAction}>
      <Card className="p-5">
        <SectionTitle>Datos de la trayectoria educativa</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Alumno">
            <select name="alumnoId" defaultValue={trayectoria?.alumnoId ?? ""} className={fieldClass}>
              <option value="" disabled>
                Buscá y seleccioná un alumno
              </option>
              {alumnos.map((alumno) => (
                <option key={alumno.id} value={alumno.id}>
                  {alumno.nombre} {alumno.apellido}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Fecha de registro">
            <input name="fechaRegistro" type="date" defaultValue={trayectoria?.fechaRegistro} className={fieldClass} />
          </FormField>

          {!nuevoDocente ? (
            <FormField label="Docente">
              <select name="docenteId" defaultValue={trayectoria?.docenteId ?? ""} className={fieldClass}>
                <option value="" disabled>
                  Seleccioná un docente
                </option>
                {docentes.map((docente) => (
                  <option key={docente.id} value={docente.id}>
                    {docente.nombre} {docente.apellido}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setNuevoDocente(true)}
                className="mt-1 text-xs font-medium text-teal-600 hover:text-teal-700"
              >
                + Agregar un docente nuevo
              </button>
            </FormField>
          ) : (
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="mb-1 block text-sm font-medium text-slate-700">Docente nuevo</span>
              <div className="grid grid-cols-2 gap-2">
                <input name="docenteNombre" type="text" placeholder="Nombre" className={fieldClass} />
                <input name="docenteApellido" type="text" placeholder="Apellido" className={fieldClass} />
              </div>
              <button
                type="button"
                onClick={() => setNuevoDocente(false)}
                className="mt-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                Elegir un docente ya cargado
              </button>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Desarrollo</SectionTitle>
        <div className="grid grid-cols-1 gap-5">
          <FormField label="Descripción">
            <textarea name="descripcion" defaultValue={trayectoria?.descripcion} rows={3} className={fieldClass} />
          </FormField>
          <FormField label="Acciones y acuerdos educativos">
            <textarea
              name="accionesAcuerdosEducativos"
              defaultValue={trayectoria?.accionesAcuerdosEducativos}
              rows={3}
              className={fieldClass}
            />
          </FormField>
        </div>
      </Card>

      {state?.error && <p className="mt-4 text-sm text-red-600">{state.error}</p>}

      <FormActions
        cancelHref={trayectoria ? `/trayectoria-educativa/${trayectoria.id}` : "/trayectoria-educativa"}
        onDelete={trayectoria ? deleteTrayectoria.bind(null, trayectoria.id) : undefined}
        deleteConfirmMessage="¿Seguro que querés borrar este registro de trayectoria educativa? No se puede deshacer."
      />
      {pending && <p className="mt-2 text-right text-xs text-slate-400">Guardando...</p>}
    </form>
  );
}
