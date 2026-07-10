import { pgTable, text, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const id = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

export type TipoInstitucion = "Jardín" | "Primaria" | "Secundaria" | "Especial" | "Otro";
export type ModalidadMesa = "Presencial" | "Virtual";
export type EstadoMesa = "Programada" | "Realizada" | "Suspendida";
export type SituacionEscolar =
  | "Escolarizado"
  | "Con inasistencias"
  | "Desescolarizado"
  | "En proceso de inclusión";
export type TipoIntervencion = "Entrevista" | "Derivación" | "Seguimiento" | "Articulación" | "Otro";
export type EstadoIntervencion = "Abierta" | "En seguimiento" | "Cerrada";

export const instituciones = pgTable("instituciones", {
  id: id(),
  nombre: text("nombre").notNull(),
  tipo: text("tipo").$type<TipoInstitucion>().notNull(),
  nivel: text("nivel").notNull().default(""),
  direccion: text("direccion").notNull().default(""),
  telefono: text("telefono").notNull().default(""),
  email: text("email").notNull().default(""),
  referente: text("referente").notNull().default(""),
  cargoReferente: text("cargo_referente").notNull().default(""),
  telefonoReferente: text("telefono_referente").notNull().default(""),
  observaciones: text("observaciones").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const mesas = pgTable("mesas", {
  id: id(),
  institucionId: text("institucion_id")
    .notNull()
    .references(() => instituciones.id),
  fecha: date("fecha", { mode: "string" }).notNull(),
  bimestre: integer("bimestre").notNull(),
  anioLectivo: integer("anio_lectivo").notNull(),
  modalidad: text("modalidad").$type<ModalidadMesa>().notNull(),
  participantes: text("participantes").notNull().default(""),
  temasTratados: text("temas_tratados").notNull().default(""),
  acuerdos: text("acuerdos").notNull().default(""),
  acta: text("acta").notNull().default(""),
  estado: text("estado").$type<EstadoMesa>().notNull().default("Programada"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const alumnos = pgTable("alumnos", {
  id: id(),
  nombre: text("nombre").notNull(),
  apellido: text("apellido").notNull(),
  dni: text("dni").notNull().default(""),
  fechaNacimiento: date("fecha_nacimiento", { mode: "string" }).notNull(),
  genero: text("genero").notNull().default(""),
  direccion: text("direccion").notNull().default(""),
  localidad: text("localidad").notNull().default(""),
  telefono: text("telefono").notNull().default(""),
  responsableNombre: text("responsable_nombre").notNull().default(""),
  responsableVinculo: text("responsable_vinculo").notNull().default(""),
  responsableDni: text("responsable_dni").notNull().default(""),
  responsableTelefono: text("responsable_telefono").notNull().default(""),
  institucionId: text("institucion_id")
    .notNull()
    .references(() => instituciones.id),
  nivel: text("nivel").notNull().default(""),
  gradoAnioSala: text("grado_anio_sala").notNull().default(""),
  turno: text("turno").notNull().default(""),
  situacionEscolar: text("situacion_escolar").$type<SituacionEscolar>().notNull(),
  trayectoriaPrevia: text("trayectoria_previa").notNull().default(""),
  obraSocial: text("obra_social").notNull().default(""),
  condicionesSalud: text("condiciones_salud").notNull().default(""),
  tratamientos: text("tratamientos").notNull().default(""),
  cud: boolean("cud").notNull().default(false),
  observaciones: text("observaciones").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const intervenciones = pgTable("intervenciones", {
  id: id(),
  alumnoId: text("alumno_id")
    .notNull()
    .references(() => alumnos.id),
  institucionId: text("institucion_id")
    .notNull()
    .references(() => instituciones.id),
  fecha: date("fecha", { mode: "string" }).notNull(),
  tipo: text("tipo").$type<TipoIntervencion>().notNull(),
  descripcion: text("descripcion").notNull().default(""),
  acuerdosAcciones: text("acuerdos_acciones").notNull().default(""),
  responsable: text("responsable").notNull().default(""),
  estado: text("estado").$type<EstadoIntervencion>().notNull().default("Abierta"),
  fechaProximoSeguimiento: date("fecha_proximo_seguimiento", { mode: "string" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const institucionesRelations = relations(instituciones, ({ many }) => ({
  mesas: many(mesas),
  alumnos: many(alumnos),
  intervenciones: many(intervenciones),
}));

export const alumnosRelations = relations(alumnos, ({ many, one }) => ({
  institucion: one(instituciones, { fields: [alumnos.institucionId], references: [instituciones.id] }),
  intervenciones: many(intervenciones),
}));

export const mesasRelations = relations(mesas, ({ one }) => ({
  institucion: one(instituciones, { fields: [mesas.institucionId], references: [instituciones.id] }),
}));

export const intervencionesRelations = relations(intervenciones, ({ one }) => ({
  alumno: one(alumnos, { fields: [intervenciones.alumnoId], references: [alumnos.id] }),
  institucion: one(instituciones, { fields: [intervenciones.institucionId], references: [instituciones.id] }),
}));

export type Institucion = typeof instituciones.$inferSelect;
export type Mesa = typeof mesas.$inferSelect;
export type Alumno = typeof alumnos.$inferSelect;
export type Intervencion = typeof intervenciones.$inferSelect;
