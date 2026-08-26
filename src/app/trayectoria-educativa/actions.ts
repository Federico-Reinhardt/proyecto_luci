"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { docentes, trayectoriasEducativas } from "@/db/schema";
import { str, type ActionState } from "@/lib/form-utils";

async function resolveDocenteId(formData: FormData): Promise<string | null> {
  const docenteId = str(formData, "docenteId");
  if (docenteId) return docenteId;

  const nombre = str(formData, "docenteNombre");
  const apellido = str(formData, "docenteApellido");
  if (!nombre || !apellido) return null;

  const [row] = await db.insert(docentes).values({ nombre, apellido }).returning({ id: docentes.id });
  return row.id;
}

function readTrayectoria(formData: FormData) {
  return {
    alumnoId: str(formData, "alumnoId"),
    fechaRegistro: str(formData, "fechaRegistro"),
    descripcion: str(formData, "descripcion"),
    accionesAcuerdosEducativos: str(formData, "accionesAcuerdosEducativos"),
  };
}

export async function createTrayectoria(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readTrayectoria(formData);
  const docenteId = await resolveDocenteId(formData);
  if (!values.alumnoId || !docenteId || !values.fechaRegistro) {
    return { error: "Alumno, docente y fecha de registro son obligatorios." };
  }
  const [row] = await db
    .insert(trayectoriasEducativas)
    .values({ ...values, docenteId })
    .returning({ id: trayectoriasEducativas.id });
  revalidatePath("/", "layout");
  redirect(`/trayectoria-educativa/${row.id}`);
}

export async function updateTrayectoria(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readTrayectoria(formData);
  const docenteId = await resolveDocenteId(formData);
  if (!values.alumnoId || !docenteId || !values.fechaRegistro) {
    return { error: "Alumno, docente y fecha de registro son obligatorios." };
  }
  await db
    .update(trayectoriasEducativas)
    .set({ ...values, docenteId })
    .where(eq(trayectoriasEducativas.id, id));
  revalidatePath("/", "layout");
  redirect(`/trayectoria-educativa/${id}`);
}

export async function deleteTrayectoria(id: string): Promise<{ error?: string } | void> {
  await db.delete(trayectoriasEducativas).where(eq(trayectoriasEducativas.id, id));
  revalidatePath("/", "layout");
  redirect("/trayectoria-educativa");
}
