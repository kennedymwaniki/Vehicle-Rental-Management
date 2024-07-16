"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const userController_1 = require("./userController");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.userRouter = new hono_1.Hono();
// userRouter.use("*");
// get users route
exports.userRouter.get("/users", userController_1.getUsers);
exports.userRouter.get("/users/:id", userController_1.getUser);
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)("json", validator_1.UserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), userController_1.createUser);
// userRouter.post("/users/register", createUser);
// create a user
//update a user
exports.userRouter.put("/users/:id", (0, zod_validator_1.zValidator)("json", validator_1.UserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), userController_1.updateUser);
// delete user
exports.userRouter.delete("/users/:id", userController_1.deleteUser);
exports.userRouter.get("/users/bookings/:id", userController_1.getUserBookings);
exports.userRouter.get("/users/support-tickets/:id", userController_1.getUserSupportTickets);
