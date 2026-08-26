import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { instituciones, mesas, alumnos, intervenciones, docentes, trayectoriasEducativas } from "@/db/schema";

export function listInstituciones() {
  return db.select().from(instituciones).orderBy(instituciones.nombre);
}

export async function getInstitucion(id: string) {
  const [row] = await db.select().from(instituciones).where(eq(instituciones.id, id));
  return row;
}

export function listMesas() {
  return db.select().from(mesas).orderBy(desc(mesas.fecha));
}

export async function getMesa(id: string) {
  const [row] = await db.select().from(mesas).where(eq(mesas.id, id));
  return row;
}

export function mesasDeInstitucion(institucionId: string) {
  return db.select().from(mesas).where(eq(mesas.institucionId, institucionId)).orderBy(desc(mesas.fecha));
}

export function listAlumnos() {
  return db.select().from(alumnos).orderBy(alumnos.apellido, alumnos.nombre);
}

export async function getAlumno(id: string) {
  const [row] = await db.select().from(alumnos).where(eq(alumnos.id, id));
  return row;
}

export function alumnosDeInstitucion(institucionId: string) {
  return db.select().from(alumnos).where(eq(alumnos.institucionId, institucionId));
}

export function listIntervenciones() {
  return db.select().from(intervenciones).orderBy(desc(intervenciones.fecha));
}

export async function getIntervencion(id: string) {
  const [row] = await db.select().from(intervenciones).where(eq(intervenciones.id, id));
  return row;
}

export function intervencionesDeInstitucion(institucionId: string) {
  return db.select().from(intervenciones).where(eq(intervenciones.institucionId, institucionId)).orderBy(desc(intervenciones.fecha));
}

export function intervencionesDeAlumno(alumnoId: string) {
  return db.select().from(intervenciones).where(eq(intervenciones.alumnoId, alumnoId)).orderBy(desc(intervenciones.fecha));
}

export function listDocentes() {
  return db.select().from(docentes).orderBy(docentes.apellido, docentes.nombre);
}

export async function getDocente(id: string) {
  const [row] = await db.select().from(docentes).where(eq(docentes.id, id));
  return row;
}

export function listTrayectorias() {
  return db.select().from(trayectoriasEducativas).orderBy(desc(trayectoriasEducativas.fechaRegistro));
}

export async function getTrayectoria(id: string) {
  const [row] = await db.select().from(trayectoriasEducativas).where(eq(trayectoriasEducativas.id, id));
  return row;
}

export function trayectoriasDeAlumno(alumnoId: string) {
  return db
    .select()
    .from(trayectoriasEducativas)
    .where(eq(trayectoriasEducativas.alumnoId, alumnoId))
    .orderBy(desc(trayectoriasEducativas.fechaRegistro));
}
