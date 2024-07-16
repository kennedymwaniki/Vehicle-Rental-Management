"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetRouter = void 0;
const hono_1 = require("hono");
const fleetController_1 = require("./fleetController");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.fleetRouter = new hono_1.Hono();
exports.fleetRouter.get("/fleet", fleetController_1.getFleet);
exports.fleetRouter.get("/fleet/:id", fleetController_1.getVehicle);
exports.fleetRouter.post("/fleet", (0, zod_validator_1.zValidator)("json", validator_1.FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), fleetController_1.createVehicle);
exports.fleetRouter.put("/fleet/:id", (0, zod_validator_1.zValidator)("json", validator_1.FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), fleetController_1.updateVehicle);
exports.fleetRouter.delete("/fleet/:id", fleetController_1.deleteVehicle);
