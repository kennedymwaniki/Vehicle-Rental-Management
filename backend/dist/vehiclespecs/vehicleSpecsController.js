"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpec = exports.updateVehicleSpec = exports.createVehicleSpec = exports.getVehicleSpec = exports.getVehicleSpecs = void 0;
const vehicleSpecsService_1 = require("./vehicleSpecsService");
const getVehicleSpecs = async (c) => {
    const data = await (0, vehicleSpecsService_1.getVehicleSpecsService)();
    return c.json(data);
};
exports.getVehicleSpecs = getVehicleSpecs;
const getVehicleSpec = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const spec = await (0, vehicleSpecsService_1.getVehicleSpecById)(id);
    if (!spec) {
        return c.json({ error: "Vehicle specification not found" }, 404);
    }
    return c.json(spec, 200);
};
exports.getVehicleSpec = getVehicleSpec;
const createVehicleSpec = async (c) => {
    try {
        const spec = await c.req.json();
        console.log(spec);
        const createdSpec = await (0, vehicleSpecsService_1.createVehicleSpecService)(spec);
        if (!createdSpec) {
            return c.text("No vehicle specification created");
        }
        return c.json({ msg: createdSpec }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicleSpec = createVehicleSpec;
const updateVehicleSpec = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const spec = await c.req.json();
    try {
        const searchedSpec = await (0, vehicleSpecsService_1.getVehicleSpecById)(id);
        if (searchedSpec == undefined)
            return c.text("Vehicle specification not found", 404);
        const res = await (0, vehicleSpecsService_1.updateVehicleSpecService)(id, spec);
        if (!res)
            return c.text("Vehicle specification not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicleSpec = updateVehicleSpec;
const deleteVehicleSpec = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const spec = await (0, vehicleSpecsService_1.getVehicleSpecById)(id);
        if (spec === undefined)
            return c.text("Vehicle specification not found", 404);
        const res = await (0, vehicleSpecsService_1.deleteVehicleSpecService)(id);
        if (res === undefined)
            return c.text("Vehicle specification not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicleSpec = deleteVehicleSpec;
