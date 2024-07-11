import { Hono } from "hono";

import {
  getVehicleSpec,
  getVehicleSpecs,
  createVehicleSpec,
  updateVehicleSpec,
  deleteVehicleSpec,
} from "./vehicleSpecsController";
import { zValidator } from "@hono/zod-validator";
import { VehicleSpecificationSchema } from "../validator";
import { adminRoleAuth, bothRoleAuth } from "../middleware/authBearer";

export const vehicleSpecsRouter = new Hono();

vehicleSpecsRouter.get("/vehicleSpecs",adminRoleAuth ,getVehicleSpecs);
vehicleSpecsRouter.get("/vehicleSpecs/:id",bothRoleAuth ,getVehicleSpec);
vehicleSpecsRouter.post(
  "/vehicleSpecs",
  zValidator("json", VehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),adminRoleAuth,
  createVehicleSpec
);
vehicleSpecsRouter.put("/vehicleSpecs/:id", adminRoleAuth,updateVehicleSpec);
vehicleSpecsRouter.delete("/vehicleSpecs/:id",adminRoleAuth, deleteVehicleSpec);
