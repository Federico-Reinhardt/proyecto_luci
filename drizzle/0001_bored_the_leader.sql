CREATE TABLE "docentes" (
	"id" text PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"apellido" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trayectorias_educativas" (
	"id" text PRIMARY KEY NOT NULL,
	"alumno_id" text NOT NULL,
	"docente_id" text NOT NULL,
	"fecha_registro" date NOT NULL,
	"descripcion" text DEFAULT '' NOT NULL,
	"acciones_acuerdos_educativos" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "trayectorias_educativas" ADD CONSTRAINT "trayectorias_educativas_alumno_id_alumnos_id_fk" FOREIGN KEY ("alumno_id") REFERENCES "public"."alumnos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trayectorias_educativas" ADD CONSTRAINT "trayectorias_educativas_docente_id_docentes_id_fk" FOREIGN KEY ("docente_id") REFERENCES "public"."docentes"("id") ON DELETE no action ON UPDATE no action;