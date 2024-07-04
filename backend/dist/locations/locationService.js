"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationService = exports.updateLocationService = exports.createLocationService = exports.getLocationById = exports.getLocationsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getLocationsService = async () => {
    const locations = await db_1.default.query.LocationsTable.findMany();
    return locations;
};
exports.getLocationsService = getLocationsService;
const getLocationById = async (id) => {
    const location = await db_1.default.query.LocationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.LocationsTable.locationId, id),
    });
    return location;
};
exports.getLocationById = getLocationById;
const createLocationService = async (location) => {
    await db_1.default.insert(schema_1.LocationsTable).values(location);
    return location;
};
exports.createLocationService = createLocationService;
const updateLocationService = async (id, location) => {
    await db_1.default.update(schema_1.LocationsTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.locationId, id));
    return location;
};
exports.updateLocationService = updateLocationService;
const deleteLocationService = async (id) => {
    await db_1.default.delete(schema_1.LocationsTable).where((0, drizzle_orm_1.eq)(schema_1.LocationsTable.locationId, id));
};
exports.deleteLocationService = deleteLocationService;
