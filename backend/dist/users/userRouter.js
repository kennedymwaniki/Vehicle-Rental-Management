"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const userController_1 = require("./userController");
exports.userRouter = new hono_1.Hono();
// userRouter.use("*");
// get users route
exports.userRouter.get("/users", userController_1.getUsers);
exports.userRouter.get("/users/:id", userController_1.getUser);
exports.userRouter.post("/users", userController_1.createUser);
// userRouter.post("/users/register", createUser);
// create a user
//update a user
exports.userRouter.put("/users/:id", userController_1.updateUser);
// delete user
exports.userRouter.delete("/users/:id", userController_1.deleteUser);
