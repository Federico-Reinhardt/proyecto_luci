"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { intervenciones } from "@/db/schema";
import type { TipoIntervencion, EstadoIntervencion } from "@/db/schema";
import { str, optStr, type ActionState } from "@/lib/form-utils";

function readIntervencion(formData: FormData) {
  return {
    alumnoId: optStr(formData, "alumnoId"),
    institucionId: optStr(formData, "institucionId"),
    fecha: optStr(formData, "fecha"),
    tipo: optStr(formData, "tipo") as TipoIntervencion | null,
    descripcion: str(formData, "descripcion"),
    acuerdo: str(formData, "acuerdo"),
    acciones: str(formData, "acciones"),
    responsable: str(formData, "responsable"),
    estado: str(formData, "estado") as EstadoIntervencion,
    fechaProximoSeguimiento: optStr(formData, "fechaProximoSeguimiento"),
  };
}

export async function createIntervencion(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readIntervencion(formData);
  const [row] = await db.insert(intervenciones).values(values).returning({ id: intervenciones.id });
  revalidatePath("/", "layout");
  redirect(`/intervenciones/${row.id}`);
}

export async function updateIntervencion(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readIntervencion(formData);
  await db.update(intervenciones).set(values).where(eq(intervenciones.id, id));
  revalidatePath("/", "layout");
  redirect(`/intervenciones/${id}`);
}

export async function deleteIntervencion(id: string): Promise<{ error?: string } | void> {
  await db.delete(intervenciones).where(eq(intervenciones.id, id));
  revalidatePath("/", "layout");
  redirect("/intervenciones");
}

export async function toggleSeguimientoHecho(id: string, hecho: boolean): Promise<void> {
  await db.update(intervenciones).set({ seguimientoHecho: hecho }).where(eq(intervenciones.id, id));
  revalidatePath("/", "layout");
}
