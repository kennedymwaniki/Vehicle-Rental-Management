import { Hono } from "hono";

import {
  getVehicle,
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicleSpecifications,
} from "./vehicleController";
import { adminRoleAuth, bothRoleAuth } from "../middleware/authBearer";

export const vehicleRouter = new Hono();

vehicleRouter.get("/vehicles", adminRoleAuth, getVehicles);
vehicleRouter.get("/vehicles/:id", bothRoleAuth, getVehicle);
vehicleRouter.post("/vehicles", adminRoleAuth, createVehicle);
vehicleRouter.put("/vehicles/:id", adminRoleAuth, updateVehicle);
vehicleRouter.delete("/vehicles/:id", adminRoleAuth, deleteVehicle);
vehicleRouter.get("vehicle/specification/:id", getVehicleSpecifications);
