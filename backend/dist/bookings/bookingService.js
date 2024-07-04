"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.createBookingService = exports.getBookingById = exports.getBookingsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getBookingsService = async () => {
    const bookings = await db_1.default.query.BookingsTable.findMany({
        columns: {
            bookingId: true,
            userId: true,
            bookingDate: true,
            returnDate: true,
            bookingStatus: true,
            totalAmount: true,
        },
    });
    return bookings;
};
exports.getBookingsService = getBookingsService;
const getBookingById = async (id) => {
    const booking = await db_1.default.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id),
    });
    return booking;
};
exports.getBookingById = getBookingById;
const createBookingService = async (booking) => {
    await db_1.default.insert(schema_1.BookingsTable).values(booking);
    return booking;
};
exports.createBookingService = createBookingService;
const updateBookingService = async (id, booking) => {
    await db_1.default
        .update(schema_1.BookingsTable)
        .set(booking)
        .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id));
    return booking;
};
exports.updateBookingService = updateBookingService;
const deleteBookingService = async (id) => {
    await db_1.default.delete(schema_1.BookingsTable).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id));
};
exports.deleteBookingService = deleteBookingService;
