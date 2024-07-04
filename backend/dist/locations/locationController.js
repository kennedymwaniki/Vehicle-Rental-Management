"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocation = exports.getLocations = void 0;
const locationService_1 = require("./locationService");
const getLocations = async (c) => {
    const data = await (0, locationService_1.getLocationsService)();
    return c.json(data);
};
exports.getLocations = getLocations;
const getLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const location = await (0, locationService_1.getLocationById)(id);
    if (!location) {
        return c.json({ error: "Location not found" }, 404);
    }
    return c.json(location, 200);
};
exports.getLocation = getLocation;
const createLocation = async (c) => {
    try {
        const location = await c.req.json();
        console.log(location);
        const createdLocation = await (0, locationService_1.createLocationService)(location);
        if (!createdLocation) {
            return c.text("No location created");
        }
        return c.json({ msg: createdLocation }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLocation = createLocation;
const updateLocation = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const location = await c.req.json();
    try {
        const searchedLocation = await (0, locationService_1.getLocationById)(id);
        if (searchedLocation == undefined)
            return c.text("Location not found", 404);
        const res = await (0, locationService_1.updateLocationService)(id, location);
        if (!res)
            return c.text("Location not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLocation = updateLocation;
const deleteLocation = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const location = await (0, locationService_1.getLocationById)(id);
        if (location === undefined)
            return c.text("Location not found", 404);
        const res = await (0, locationService_1.deleteLocationService)(id);
        if (res === undefined)
            return c.text("Location not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocation = deleteLocation;
