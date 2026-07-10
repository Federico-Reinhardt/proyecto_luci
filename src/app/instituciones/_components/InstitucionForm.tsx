import MockForm from "@/components/MockForm";
import { Card, FormField, FormActions, SectionTitle, fieldClass } from "@/components/ui";
import type { Institucion, TipoInstitucion } from "@/data/mock";

const TIPOS: TipoInstitucion[] = ["Jardín", "Primaria", "Secundaria", "Especial", "Otro"];

export default function InstitucionForm({ institucion }: { institucion?: Institucion }) {
  return (
    <MockForm>
      <Card className="p-5">
        <SectionTitle>Datos de la institución</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Nombre" className="sm:col-span-2">
            <input type="text" defaultValue={institucion?.nombre} className={fieldClass} placeholder="Ej: Escuela Primaria N°12" />
          </FormField>
          <FormField label="Tipo">
            <select defaultValue={institucion?.tipo ?? ""} className={fieldClass}>
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
          <FormField label="Nivel">
            <input type="text" defaultValue={institucion?.nivel} className={fieldClass} placeholder="Ej: Primario" />
          </FormField>
          <FormField label="Dirección" className="sm:col-span-2">
            <input type="text" defaultValue={institucion?.direccion} className={fieldClass} />
          </FormField>
          <FormField label="Teléfono">
            <input type="tel" defaultValue={institucion?.telefono} className={fieldClass} />
          </FormField>
          <FormField label="Email">
            <input type="email" defaultValue={institucion?.email} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Referente</SectionTitle>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Referente">
            <input type="text" defaultValue={institucion?.referente} className={fieldClass} />
          </FormField>
          <FormField label="Cargo del referente">
            <input type="text" defaultValue={institucion?.cargoReferente} className={fieldClass} />
          </FormField>
          <FormField label="Teléfono del referente">
            <input type="tel" defaultValue={institucion?.telefonoReferente} className={fieldClass} />
          </FormField>
        </div>
      </Card>

      <Card className="mt-6 p-5">
        <SectionTitle>Observaciones</SectionTitle>
        <FormField label="Observaciones">
          <textarea defaultValue={institucion?.observaciones} rows={4} className={fieldClass} />
        </FormField>
      </Card>

      <FormActions cancelHref={institucion ? `/instituciones/${institucion.id}` : "/instituciones"} />
    </MockForm>
  );
}
