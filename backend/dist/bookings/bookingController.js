"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = void 0;
const bookingService_1 = require("./bookingService");
const getBookings = async (c) => {
    const data = await (0, bookingService_1.getBookingsService)();
    return c.json(data);
};
exports.getBookings = getBookings;
const getBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const booking = await (0, bookingService_1.getBookingById)(id);
    if (!booking) {
        return c.json({ error: "Booking not found" }, 404);
    }
    return c.json(booking, 200);
};
exports.getBooking = getBooking;
const createBooking = async (c) => {
    try {
        const booking = await c.req.json();
        console.log(booking);
        const createdBooking = await (0, bookingService_1.createBookingService)(booking);
        if (!createdBooking) {
            return c.text("No booking created");
        }
        return c.json({ msg: createdBooking }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBooking = createBooking;
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const booking = await c.req.json();
    try {
        const searchedBooking = await (0, bookingService_1.getBookingById)(id);
        if (searchedBooking == undefined)
            return c.text("Booking not found", 404);
        const res = await (0, bookingService_1.updateBookingService)(id, booking);
        if (!res)
            return c.text("Booking not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const booking = await (0, bookingService_1.getBookingById)(id);
        if (booking === undefined)
            return c.text("Booking not found", 404);
        const res = await (0, bookingService_1.deleteBookingService)(id);
        if (res === undefined)
            return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
