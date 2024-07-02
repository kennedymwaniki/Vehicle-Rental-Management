ALTER TABLE "vehiclespecifications" RENAME COLUMN "vehicle_id" TO "vehicleSpec_id";--> statement-breakpoint
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicle_spec_vehiclespecifications_vehicle_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_spec_vehiclespecifications_vehicleSpec_id_fk" FOREIGN KEY ("vehicle_spec") REFERENCES "public"."vehiclespecifications"("vehicleSpec_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
