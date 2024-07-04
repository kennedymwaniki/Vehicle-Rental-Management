"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const userRouter_1 = require("./users/userRouter");
const bookingsRouter_1 = require("./bookings/bookingsRouter");
const fleetRouter_1 = require("./fleet/fleetRouter");
const locationRouter_1 = require("./locations/locationRouter");
const paymentsRouter_1 = require("./payments/paymentsRouter");
const vehicleRouter_1 = require("./vehicles/vehicleRouter");
const vehicleSpecsRouter_1 = require("./vehiclespecs/vehicleSpecsRouter");
const customerSupportRouter_1 = require("./customerSupport/customerSupportRouter");
const cors_1 = require("hono/cors");
const authRouter_1 = require("./auth/authRouter");
const app = new hono_1.Hono();
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.use((0, cors_1.cors)({
    origin: "*", // specify your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
}));
app.route("/api", userRouter_1.userRouter);
app.route("/api", bookingsRouter_1.bookingRouter);
app.route("/api", fleetRouter_1.fleetRouter);
app.route("/api", locationRouter_1.locationRouter);
app.route("/api", paymentsRouter_1.paymentsRouter);
app.route("/api", vehicleRouter_1.vehicleRouter);
app.route("/api", vehicleSpecsRouter_1.vehicleSpecsRouter);
app.route("/api", customerSupportRouter_1.customerSupportRouter);
app.route("/api/auth", authRouter_1.authRouter);
const port = 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
