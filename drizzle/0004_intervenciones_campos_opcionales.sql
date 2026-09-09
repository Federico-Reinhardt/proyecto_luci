ALTER TABLE "intervenciones" ALTER COLUMN "alumno_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "intervenciones" ALTER COLUMN "institucion_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "intervenciones" ALTER COLUMN "fecha" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "intervenciones" ALTER COLUMN "tipo" DROP NOT NULL;
