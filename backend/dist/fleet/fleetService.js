"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getVehicleById = exports.getFleetService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getFleetService = async () => {
    const fleet = await db_1.default.query.FleetManagementTable.findMany({
        columns: {
            fleetId: true,
            vehicleId: true,
            depreciationRate: true,
            currentValue: true,
            acquisitionDate: true,
            maintenanceCost: true,
            status: true,
        },
    });
    return fleet;
};
exports.getFleetService = getFleetService;
const getVehicleById = async (id) => {
    const vehicle = await db_1.default.query.FleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.vehicleId, id),
    });
    return vehicle;
};
exports.getVehicleById = getVehicleById;
const createVehicleService = async (vehicle) => {
    await db_1.default.insert(schema_1.FleetManagementTable).values(vehicle);
    return vehicle;
};
exports.createVehicleService = createVehicleService;
const updateVehicleService = async (id, vehicle) => {
    await db_1.default
        .update(schema_1.FleetManagementTable)
        .set(vehicle)
        .where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.vehicleId, id));
    return vehicle;
};
exports.updateVehicleService = updateVehicleService;
const deleteVehicleService = async (id) => {
    await db_1.default
        .delete(schema_1.FleetManagementTable)
        .where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.vehicleId, id));
};
exports.deleteVehicleService = deleteVehicleService;
