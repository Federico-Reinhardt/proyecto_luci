"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { alumnos, intervenciones } from "@/db/schema";
import type { SituacionEscolar } from "@/db/schema";
import { str, type ActionState } from "@/lib/form-utils";

function readAlumno(formData: FormData) {
  return {
    nombre: str(formData, "nombre"),
    apellido: str(formData, "apellido"),
    dni: str(formData, "dni"),
    fechaNacimiento: str(formData, "fechaNacimiento"),
    genero: str(formData, "genero"),
    direccion: str(formData, "direccion"),
    localidad: str(formData, "localidad"),
    telefono: str(formData, "telefono"),
    responsableNombre: str(formData, "responsableNombre"),
    responsableVinculo: str(formData, "responsableVinculo"),
    responsableDni: str(formData, "responsableDni"),
    responsableTelefono: str(formData, "responsableTelefono"),
    institucionId: str(formData, "institucionId"),
    nivel: str(formData, "nivel"),
    gradoAnioSala: str(formData, "gradoAnioSala"),
    turno: str(formData, "turno"),
    situacionEscolar: str(formData, "situacionEscolar") as SituacionEscolar,
    trayectoriaPrevia: str(formData, "trayectoriaPrevia"),
    obraSocial: str(formData, "obraSocial"),
    condicionesSalud: str(formData, "condicionesSalud"),
    tratamientos: str(formData, "tratamientos"),
    cud: str(formData, "cud") === "si",
    observaciones: str(formData, "observaciones"),
  };
}

export async function createAlumno(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readAlumno(formData);
  if (!values.nombre || !values.apellido || !values.fechaNacimiento || !values.institucionId || !values.situacionEscolar) {
    return { error: "Nombre, apellido, fecha de nacimiento, institución y situación escolar son obligatorios." };
  }
  const [row] = await db.insert(alumnos).values(values).returning({ id: alumnos.id });
  revalidatePath("/", "layout");
  redirect(`/alumnos/${row.id}`);
}

export async function updateAlumno(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readAlumno(formData);
  if (!values.nombre || !values.apellido || !values.fechaNacimiento || !values.institucionId || !values.situacionEscolar) {
    return { error: "Nombre, apellido, fecha de nacimiento, institución y situación escolar son obligatorios." };
  }
  await db.update(alumnos).set(values).where(eq(alumnos.id, id));
  revalidatePath("/", "layout");
  redirect(`/alumnos/${id}`);
}

export async function deleteAlumno(id: string): Promise<{ error?: string } | void> {
  await db.delete(intervenciones).where(eq(intervenciones.alumnoId, id));
  await db.delete(alumnos).where(eq(alumnos.id, id));
  revalidatePath("/", "layout");
  redirect("/alumnos");
}
