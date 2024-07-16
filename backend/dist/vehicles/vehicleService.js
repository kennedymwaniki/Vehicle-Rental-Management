"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleSpecificationsById = exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getVehicleById = exports.getVehiclesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getVehiclesService = async () => {
    const vehicles = await db_1.default.query.VehiclesTable.findMany({
        columns: {
            vehicleId: true,
            vehicleSpecsId: true,
            availability: true,
            rentalRate: true,
        },
    });
    return vehicles;
};
exports.getVehiclesService = getVehiclesService;
const getVehicleById = async (id) => {
    const vehicle = await db_1.default.query.VehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id),
    });
    return vehicle;
};
exports.getVehicleById = getVehicleById;
const createVehicleService = async (vehicle) => {
    await db_1.default.insert(schema_1.VehiclesTable).values(vehicle);
    return vehicle;
};
exports.createVehicleService = createVehicleService;
const updateVehicleService = async (id, vehicle) => {
    await db_1.default
        .update(schema_1.VehiclesTable)
        .set(vehicle)
        .where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id));
    return vehicle;
};
exports.updateVehicleService = updateVehicleService;
const deleteVehicleService = async (id) => {
    await db_1.default.delete(schema_1.VehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id));
};
exports.deleteVehicleService = deleteVehicleService;
const getVehicleSpecificationsById = async (vehicleId) => {
    const vehicleSpecifications = await db_1.default.query.VehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, vehicleId),
        columns: {
            vehicleId: true,
            vehicleSpecsId: true,
            rentalRate: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
        },
        with: {
            vehicleSpec: {
                columns: {
                    manufacturer: true,
                    model: true,
                    year: true,
                    fuelType: true,
                    engineCapacity: true,
                    transmission: true,
                    seatingCapacity: true,
                    color: true,
                    features: true,
                },
            },
        },
    });
    return vehicleSpecifications;
};
exports.getVehicleSpecificationsById = getVehicleSpecificationsById;
