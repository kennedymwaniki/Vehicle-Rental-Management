ALTER TABLE "vehicles" RENAME COLUMN "vehicleSpec_id" TO "vehicle_id";--> statement-breakpoint
ALTER TABLE "vehicles" RENAME COLUMN "vehicle_spec" TO "vehicle_specId";--> statement-breakpoint
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_vehicle_id_vehicles_vehicleSpec_id_fk";
--> statement-breakpoint
ALTER TABLE "fleetmanagement" DROP CONSTRAINT "fleetmanagement_vehicle_id_vehicles_vehicleSpec_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicle_spec_vehiclespecifications_vehicleSpec_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleetmanagement" ADD CONSTRAINT "fleetmanagement_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_specId_vehiclespecifications_vehicleSpec_id_fk" FOREIGN KEY ("vehicle_specId") REFERENCES "public"."vehiclespecifications"("vehicleSpec_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
