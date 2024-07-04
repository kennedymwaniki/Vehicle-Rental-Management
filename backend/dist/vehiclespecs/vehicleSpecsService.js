"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecService = exports.updateVehicleSpecService = exports.createVehicleSpecService = exports.getVehicleSpecById = exports.getVehicleSpecsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getVehicleSpecsService = async () => {
    const specs = await db_1.default.query.VehicleSpecificationsTable.findMany();
    return specs;
};
exports.getVehicleSpecsService = getVehicleSpecsService;
const getVehicleSpecById = async (id) => {
    const spec = await db_1.default.query.VehicleSpecificationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpecId, id),
    });
    return spec;
};
exports.getVehicleSpecById = getVehicleSpecById;
const createVehicleSpecService = async (spec) => {
    await db_1.default.insert(schema_1.VehicleSpecificationsTable).values(spec);
    return spec;
};
exports.createVehicleSpecService = createVehicleSpecService;
const updateVehicleSpecService = async (id, spec) => {
    await db_1.default
        .update(schema_1.VehicleSpecificationsTable)
        .set(spec)
        .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpecId, id));
    return spec;
};
exports.updateVehicleSpecService = updateVehicleSpecService;
const deleteVehicleSpecService = async (id) => {
    await db_1.default
        .delete(schema_1.VehicleSpecificationsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleSpecId, id));
};
exports.deleteVehicleSpecService = deleteVehicleSpecService;
