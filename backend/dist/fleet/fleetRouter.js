"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetRouter = void 0;
const hono_1 = require("hono");
const fleetController_1 = require("./fleetController");
exports.fleetRouter = new hono_1.Hono();
exports.fleetRouter.get("/fleet", fleetController_1.getFleet);
exports.fleetRouter.get("/fleet/:id", fleetController_1.getVehicle);
exports.fleetRouter.post("/fleet", fleetController_1.createVehicle);
exports.fleetRouter.put("/fleet/:id", fleetController_1.updateVehicle);
exports.fleetRouter.delete("/fleet/:id", fleetController_1.deleteVehicle);
