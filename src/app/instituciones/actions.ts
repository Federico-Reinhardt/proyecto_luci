"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { instituciones, mesas, alumnos, intervenciones } from "@/db/schema";
import type { TipoInstitucion } from "@/db/schema";
import { str, type ActionState } from "@/lib/form-utils";

function readInstitucion(formData: FormData) {
  return {
    nombre: str(formData, "nombre"),
    tipo: str(formData, "tipo") as TipoInstitucion,
    nivel: str(formData, "nivel"),
    direccion: str(formData, "direccion"),
    telefono: str(formData, "telefono"),
    email: str(formData, "email"),
    referente: str(formData, "referente"),
    cargoReferente: str(formData, "cargoReferente"),
    telefonoReferente: str(formData, "telefonoReferente"),
    observaciones: str(formData, "observaciones"),
  };
}

export async function createInstitucion(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readInstitucion(formData);
  if (!values.nombre || !values.tipo) {
    return { error: "Nombre y tipo son obligatorios." };
  }
  const [row] = await db.insert(instituciones).values(values).returning({ id: instituciones.id });
  redirect(`/instituciones/${row.id}`);
}

export async function updateInstitucion(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readInstitucion(formData);
  if (!values.nombre || !values.tipo) {
    return { error: "Nombre y tipo son obligatorios." };
  }
  await db.update(instituciones).set(values).where(eq(instituciones.id, id));
  redirect(`/instituciones/${id}`);
}

export async function deleteInstitucion(id: string): Promise<{ error?: string } | void> {
  const [tieneMesas] = await db.select({ id: mesas.id }).from(mesas).where(eq(mesas.institucionId, id)).limit(1);
  const [tieneAlumnos] = await db.select({ id: alumnos.id }).from(alumnos).where(eq(alumnos.institucionId, id)).limit(1);
  const [tieneIntervenciones] = await db
    .select({ id: intervenciones.id })
    .from(intervenciones)
    .where(eq(intervenciones.institucionId, id))
    .limit(1);

  if (tieneMesas || tieneAlumnos || tieneIntervenciones) {
    return { error: "No se puede borrar: la institución tiene mesas, alumnos o intervenciones relacionadas." };
  }

  await db.delete(instituciones).where(eq(instituciones.id, id));
  redirect("/instituciones");
}
