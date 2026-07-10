import MockForm from "@/components/MockForm";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Intervencion, TipoIntervencion, EstadoIntervencion } from "@/data/mock";
import { alumnos, instituciones } from "@/data/mock";

const TIPOS: TipoIntervencion[] = ["Entrevista", "Derivación", "Seguimiento", "Articulación", "Otro"];
const ESTADOS: EstadoIntervencion[] = ["Abierta", "En seguimiento", "Cerrada"];

export default function IntervencionForm({ intervencion }: { intervencion?: Intervencion }) {
  return (
    <MockForm>
      <Card className="p-5">
        <SectionTitle>Datos de la intervención</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Alumno">
            <select defaultValue={intervencion?.alumnoId ?? ""} className={fieldClass}>
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
            <select defaultValue={intervencion?.institucionId ?? ""} className={fieldClass}>
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
            <select defaultValue={intervencion?.tipo ?? ""} className={fieldClass}>
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
            <input type="date" defaultValue={intervencion?.fecha} className={fieldClass} />
          </FormField>
          <FormField label="Responsable">
            <input type="text" defaultValue={intervencion?.responsable} className={fieldClass} placeholder="Ej: Federico (Psicopedagogía)" />
          </FormField>
          <FormField label="Estado">
            <select defaultValue={intervencion?.estado ?? "Abierta"} className={fieldClass}>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Fecha próximo seguimiento">
            <input type="date" defaultValue={intervencion?.fechaProximoSeguimiento ?? ""} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Desarrollo</SectionTitle>
        <div className="grid grid-cols-1 gap-5">
          <FormField label="Descripción">
            <textarea defaultValue={intervencion?.descripcion} rows={3} className={fieldClass} />
          </FormField>
          <FormField label="Acuerdos y acciones">
            <textarea defaultValue={intervencion?.acuerdosAcciones} rows={3} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <FormActions cancelHref={intervencion ? `/intervenciones/${intervencion.id}` : "/intervenciones"} />
    </MockForm>
  );
}
