"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { intervenciones } from "@/db/schema";
import type { TipoIntervencion, EstadoIntervencion } from "@/db/schema";
import { str, optStr, type ActionState } from "@/lib/form-utils";

function readIntervencion(formData: FormData) {
  return {
    alumnoId: str(formData, "alumnoId"),
    institucionId: str(formData, "institucionId"),
    fecha: str(formData, "fecha"),
    tipo: str(formData, "tipo") as TipoIntervencion,
    descripcion: str(formData, "descripcion"),
    acuerdosAcciones: str(formData, "acuerdosAcciones"),
    responsable: str(formData, "responsable"),
    estado: str(formData, "estado") as EstadoIntervencion,
    fechaProximoSeguimiento: optStr(formData, "fechaProximoSeguimiento"),
  };
}

export async function createIntervencion(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readIntervencion(formData);
  if (!values.alumnoId || !values.institucionId || !values.fecha || !values.tipo) {
    return { error: "Alumno, institución, fecha y tipo son obligatorios." };
  }
  const [row] = await db.insert(intervenciones).values(values).returning({ id: intervenciones.id });
  redirect(`/intervenciones/${row.id}`);
}

export async function updateIntervencion(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readIntervencion(formData);
  if (!values.alumnoId || !values.institucionId || !values.fecha || !values.tipo) {
    return { error: "Alumno, institución, fecha y tipo son obligatorios." };
  }
  await db.update(intervenciones).set(values).where(eq(intervenciones.id, id));
  redirect(`/intervenciones/${id}`);
}

export async function deleteIntervencion(id: string): Promise<{ error?: string } | void> {
  await db.delete(intervenciones).where(eq(intervenciones.id, id));
  redirect("/intervenciones");
}
