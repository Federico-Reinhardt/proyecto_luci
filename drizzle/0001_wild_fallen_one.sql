ALTER TABLE "alumnos" ALTER COLUMN "nombre" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "alumnos" ALTER COLUMN "apellido" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "alumnos" ALTER COLUMN "fecha_nacimiento" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "alumnos" ALTER COLUMN "institucion_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "alumnos" ALTER COLUMN "situacion_escolar" DROP NOT NULL;