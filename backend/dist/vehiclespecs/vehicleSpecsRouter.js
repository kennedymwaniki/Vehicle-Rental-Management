"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecsRouter = void 0;
const hono_1 = require("hono");
const vehicleSpecsController_1 = require("./vehicleSpecsController");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.vehicleSpecsRouter = new hono_1.Hono();
exports.vehicleSpecsRouter.get("/vehicleSpecs", vehicleSpecsController_1.getVehicleSpecs);
exports.vehicleSpecsRouter.get("/vehicleSpecs/:id", vehicleSpecsController_1.getVehicleSpec);
exports.vehicleSpecsRouter.post("/vehicleSpecs", (0, zod_validator_1.zValidator)("json", validator_1.VehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), vehicleSpecsController_1.createVehicleSpec);
exports.vehicleSpecsRouter.put("/vehicleSpecs/:id", vehicleSpecsController_1.updateVehicleSpec);
exports.vehicleSpecsRouter.delete("/vehicleSpecs/:id", vehicleSpecsController_1.deleteVehicleSpec);
