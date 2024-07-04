"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicle = exports.getFleet = void 0;
const fleetService_1 = require("./fleetService");
const getFleet = async (c) => {
    const data = await (0, fleetService_1.getFleetService)();
    return c.json(data);
};
exports.getFleet = getFleet;
const getVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const vehicle = await (0, fleetService_1.getVehicleById)(id);
    if (!vehicle) {
        return c.json({ error: "Vehicle not found" }, 404);
    }
    return c.json(vehicle, 200);
};
exports.getVehicle = getVehicle;
const createVehicle = async (c) => {
    try {
        const vehicle = await c.req.json();
        console.log(vehicle);
        const createdVehicle = await (0, fleetService_1.createVehicleService)(vehicle);
        if (!createdVehicle) {
            return c.text("No vehicle created");
        }
        return c.json({ msg: createdVehicle }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicle = createVehicle;
const updateVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicle = await c.req.json();
    try {
        const searchedVehicle = await (0, fleetService_1.getVehicleById)(id);
        if (searchedVehicle == undefined)
            return c.text("Vehicle not found", 404);
        const res = await (0, fleetService_1.updateVehicleService)(id, vehicle);
        if (!res)
            return c.text("Vehicle not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const vehicle = await (0, fleetService_1.getVehicleById)(id);
        if (vehicle === undefined)
            return c.text("Vehicle not found", 404);
        const res = await (0, fleetService_1.deleteVehicleService)(id);
        if (res === undefined)
            return c.text("Vehicle not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicle = deleteVehicle;
