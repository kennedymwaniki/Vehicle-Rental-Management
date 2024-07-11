import { Hono } from "hono";

import {
  getVehicle,
  getFleet,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "./fleetController";
import { adminRoleAuth, bothRoleAuth } from "../middleware/authBearer";

export const fleetRouter = new Hono();

fleetRouter.get("/fleet",adminRoleAuth ,getFleet);
fleetRouter.get("/fleet/:id",bothRoleAuth, getVehicle);
fleetRouter.post("/fleet",adminRoleAuth, createVehicle);
fleetRouter.put("/fleet/:id", adminRoleAuth,updateVehicle);
fleetRouter.delete("/fleet/:id",adminRoleAuth, deleteVehicle);