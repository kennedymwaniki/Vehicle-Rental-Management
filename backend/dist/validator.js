"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FleetManagementSchema = exports.CustomerSupportTicketSchema = exports.loginUserSchema = exports.registerUserSchema = exports.PaymentSchema = exports.BookingSchema = exports.LocationSchema = exports.VehicleSchema = exports.VehicleSpecificationSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string(),
});
exports.VehicleSpecificationSchema = zod_1.z.object({
    manufacturer: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    fuelType: zod_1.z.string().nullable(),
    engineCapacity: zod_1.z.string().nullable(),
    transmission: zod_1.z.string().nullable(),
    seatingCapacity: zod_1.z.number().nullable(),
    color: zod_1.z.string().nullable(),
    features: zod_1.z.string().nullable(),
});
exports.VehicleSchema = zod_1.z.object({
    rentalRate: zod_1.z.number(),
    availability: zod_1.z.boolean(),
});
exports.LocationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    address: zod_1.z.string().nullable(),
    contactPhone: zod_1.z.string().nullable(),
});
exports.BookingSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    vehicleId: zod_1.z.number(),
    locationId: zod_1.z.number(),
    bookingDate: zod_1.z.string(),
    returnDate: zod_1.z.string(),
    totalAmount: zod_1.z.number(),
    bookingStatus: zod_1.z.string(),
});
exports.PaymentSchema = zod_1.z.object({
    bookingId: zod_1.z.number(),
    amount: zod_1.z.number(),
    paymentStatus: zod_1.z.string(),
    paymentDate: zod_1.z.string(),
    paymentMethod: zod_1.z.string().nullable(),
    transactionId: zod_1.z.string().nullable(),
});
exports.registerUserSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
    password: zod_1.z.string(),
    address: zod_1.z.string(),
    role: zod_1.z.string().optional(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.CustomerSupportTicketSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    subject: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.string(),
});
exports.FleetManagementSchema = zod_1.z.object({
    vehicleId: zod_1.z.number(),
    acquisitionDate: zod_1.z.string(),
    depreciationRate: zod_1.z.number().nullable(),
    currentValue: zod_1.z.number().nullable(),
    maintenanceCost: zod_1.z.number().nullable(),
    status: zod_1.z.string(),
});
