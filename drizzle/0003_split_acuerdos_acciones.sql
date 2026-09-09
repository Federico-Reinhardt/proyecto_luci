ALTER TABLE "intervenciones" ADD COLUMN IF NOT EXISTS "acuerdo" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "intervenciones" ADD COLUMN IF NOT EXISTS "acciones" text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE "intervenciones" SET "acuerdo" = "acuerdos_acciones";--> statement-breakpoint
ALTER TABLE "intervenciones" DROP COLUMN IF EXISTS "acuerdos_acciones";
