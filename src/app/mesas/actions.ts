"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { mesas } from "@/db/schema";
import type { ModalidadMesa, EstadoMesa } from "@/db/schema";
import { str, num, type ActionState } from "@/lib/form-utils";

function readMesa(formData: FormData) {
  return {
    institucionId: str(formData, "institucionId"),
    fecha: str(formData, "fecha"),
    bimestre: num(formData, "bimestre"),
    anioLectivo: num(formData, "anioLectivo"),
    modalidad: str(formData, "modalidad") as ModalidadMesa,
    participantes: str(formData, "participantes"),
    temasTratados: str(formData, "temasTratados"),
    acuerdos: str(formData, "acuerdos"),
    acta: str(formData, "acta"),
    estado: str(formData, "estado") as EstadoMesa,
  };
}

export async function createMesa(_state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readMesa(formData);
  if (!values.institucionId || !values.fecha || !values.modalidad || !values.bimestre || !values.anioLectivo) {
    return { error: "Institución, fecha, bimestre, año y modalidad son obligatorios." };
  }
  const [row] = await db.insert(mesas).values(values).returning({ id: mesas.id });
  revalidatePath("/", "layout");
  redirect(`/mesas/${row.id}`);
}

export async function updateMesa(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const values = readMesa(formData);
  if (!values.institucionId || !values.fecha || !values.modalidad || !values.bimestre || !values.anioLectivo) {
    return { error: "Institución, fecha, bimestre, año y modalidad son obligatorios." };
  }
  await db.update(mesas).set(values).where(eq(mesas.id, id));
  revalidatePath("/", "layout");
  redirect(`/mesas/${id}`);
}

export async function deleteMesa(id: string): Promise<{ error?: string } | void> {
  await db.delete(mesas).where(eq(mesas.id, id));
  revalidatePath("/", "layout");
  redirect("/mesas");
}
