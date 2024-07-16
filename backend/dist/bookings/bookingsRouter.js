"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const hono_1 = require("hono");
const bookingController_1 = require("./bookingController");
exports.bookingRouter = new hono_1.Hono();
exports.bookingRouter.get("/bookings", bookingController_1.getBookings);
exports.bookingRouter.get("/bookings/:id", bookingController_1.getBooking);
exports.bookingRouter.post("/bookings", bookingController_1.createBooking);
exports.bookingRouter.put("/bookings/:id", 
// zValidator("json", BookingSchema, (result, c) => {
//   if (!result.success) {
//     return c.json(result.error, 400);
//   }
// }),
bookingController_1.updateBooking);
exports.bookingRouter.delete("/bookings/:id", bookingController_1.deleteBooking);
