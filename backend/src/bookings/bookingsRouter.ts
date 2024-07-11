import { bothRoleAuth } from "../middleware/authBearer";
import { adminRoleAuth } from "./../middleware/authBearer";
import { Hono } from "hono";

import {
  getBooking,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "./bookingController";

export const bookingRouter = new Hono();

bookingRouter.get("/bookings", bothRoleAuth, getBookings);
bookingRouter.get("/bookings/:id", bothRoleAuth, getBooking);
bookingRouter.post("/bookings", adminRoleAuth, createBooking);
bookingRouter.put("/bookings/:id", adminRoleAuth, updateBooking);
bookingRouter.delete("/bookings/:id", adminRoleAuth, deleteBooking);
