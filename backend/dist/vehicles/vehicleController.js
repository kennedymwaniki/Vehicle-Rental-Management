"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleSpecifications = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicle = exports.getVehicles = void 0;
const vehicleService_1 = require("./vehicleService");
const getVehicles = async (c) => {
    const data = await (0, vehicleService_1.getVehiclesService)();
    return c.json(data);
};
exports.getVehicles = getVehicles;
const getVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const vehicle = await (0, vehicleService_1.getVehicleById)(id);
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
        const createdVehicle = await (0, vehicleService_1.createVehicleService)(vehicle);
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
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const vehicle = await c.req.json();
        const searchedVehicle = await (0, vehicleService_1.getVehicleById)(id);
        if (searchedVehicle === undefined)
            return c.text("Vehicle not found", 404);
        const res = await (0, vehicleService_1.updateVehicleService)(id, vehicle);
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
        const vehicle = await (0, vehicleService_1.getVehicleById)(id);
        if (vehicle === undefined)
            return c.text("Vehicle not found", 404);
        const res = await (0, vehicleService_1.deleteVehicleService)(id);
        if (res === undefined)
            return c.text("Vehicle not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicle = deleteVehicle;
const getVehicleSpecifications = async (c) => {
    const vehicleId = parseInt(c.req.param("id"));
    if (isNaN(vehicleId)) {
        return c.json({ error: "Invalid vehicle ID" }, 400);
    }
    const vehicleSpecifications = await (0, vehicleService_1.getVehicleSpecificationsById)(vehicleId);
    if (!vehicleSpecifications) {
        return c.json({ error: "Vehicle not found" }, 404);
    }
    const { vehicleSpec, ...vehicleData } = vehicleSpecifications;
    return c.json({ vehicle: vehicleData, specifications: vehicleSpec }, 200);
};
exports.getVehicleSpecifications = getVehicleSpecifications;
