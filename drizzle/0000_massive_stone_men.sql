CREATE TABLE "alumnos" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"apellido" text NOT NULL,
	"dni" text DEFAULT '' NOT NULL,
	"fecha_nacimiento" date NOT NULL,
	"genero" text DEFAULT '' NOT NULL,
	"direccion" text DEFAULT '' NOT NULL,
	"localidad" text DEFAULT '' NOT NULL,
	"telefono" text DEFAULT '' NOT NULL,
	"responsable_nombre" text DEFAULT '' NOT NULL,
	"responsable_vinculo" text DEFAULT '' NOT NULL,
	"responsable_dni" text DEFAULT '' NOT NULL,
	"responsable_telefono" text DEFAULT '' NOT NULL,
	"institucion_id" text NOT NULL,
	"nivel" text DEFAULT '' NOT NULL,
	"grado_anio_sala" text DEFAULT '' NOT NULL,
	"turno" text DEFAULT '' NOT NULL,
	"situacion_escolar" text NOT NULL,
	"trayectoria_previa" text DEFAULT '' NOT NULL,
	"obra_social" text DEFAULT '' NOT NULL,
	"condiciones_salud" text DEFAULT '' NOT NULL,
	"tratamientos" text DEFAULT '' NOT NULL,
	"cud" boolean DEFAULT false NOT NULL,
	"observaciones" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instituciones" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"tipo" text NOT NULL,
	"nivel" text DEFAULT '' NOT NULL,
	"direccion" text DEFAULT '' NOT NULL,
	"telefono" text DEFAULT '' NOT NULL,
	"email" text DEFAULT '' NOT NULL,
	"referente" text DEFAULT '' NOT NULL,
	"cargo_referente" text DEFAULT '' NOT NULL,
	"telefono_referente" text DEFAULT '' NOT NULL,
	"observaciones" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "intervenciones" (
	"id" text PRIMARY KEY NOT NULL,
	"alumno_id" text NOT NULL,
	"institucion_id" text NOT NULL,
	"fecha" date NOT NULL,
	"tipo" text NOT NULL,
	"descripcion" text DEFAULT '' NOT NULL,
	"acuerdos_acciones" text DEFAULT '' NOT NULL,
	"responsable" text DEFAULT '' NOT NULL,
	"estado" text DEFAULT 'Abierta' NOT NULL,
	"fecha_proximo_seguimiento" date,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mesas" (
	"id" text PRIMARY KEY NOT NULL,
	"institucion_id" text NOT NULL,
	"fecha" date NOT NULL,
	"bimestre" integer NOT NULL,
	"anio_lectivo" integer NOT NULL,
	"modalidad" text NOT NULL,
	"participantes" text DEFAULT '' NOT NULL,
	"temas_tratados" text DEFAULT '' NOT NULL,
	"acuerdos" text DEFAULT '' NOT NULL,
	"acta" text DEFAULT '' NOT NULL,
	"estado" text DEFAULT 'Programada' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alumnos" ADD CONSTRAINT "alumnos_institucion_id_instituciones_id_fk" FOREIGN KEY ("institucion_id") REFERENCES "public"."instituciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "intervenciones" ADD CONSTRAINT "intervenciones_alumno_id_alumnos_id_fk" FOREIGN KEY ("alumno_id") REFERENCES "public"."alumnos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "intervenciones" ADD CONSTRAINT "intervenciones_institucion_id_instituciones_id_fk" FOREIGN KEY ("institucion_id") REFERENCES "public"."instituciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mesas" ADD CONSTRAINT "mesas_institucion_id_instituciones_id_fk" FOREIGN KEY ("institucion_id") REFERENCES "public"."instituciones"("id") ON DELETE no action ON UPDATE no action;