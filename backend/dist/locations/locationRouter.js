"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const locationController_1 = require("./locationController");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.locationRouter = new hono_1.Hono();
exports.locationRouter.get("/locations", locationController_1.getLocations);
exports.locationRouter.get("/locations/:id", locationController_1.getLocation);
exports.locationRouter.post("/locations", (0, zod_validator_1.zValidator)("json", validator_1.LocationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), locationController_1.createLocation);
exports.locationRouter.put("/locations/:id", (0, zod_validator_1.zValidator)("json", validator_1.LocationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), locationController_1.updateLocation);
exports.locationRouter.delete("/locations/:id", locationController_1.deleteLocation);
