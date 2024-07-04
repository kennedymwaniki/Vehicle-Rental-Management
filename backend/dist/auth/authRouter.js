"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const zod_validator_1 = require("@hono/zod-validator");
const hono_1 = require("hono");
const authController_1 = require("./authController");
const validator_1 = require("../validator");
exports.authRouter = new hono_1.Hono();
//we re going to register a new user and the z validator is going to verify that the data we pass in is correct
exports.authRouter.post("/register", (0, zod_validator_1.zValidator)("json", validator_1.registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authController_1.registerUser);
exports.authRouter.post("/login", (0, zod_validator_1.zValidator)("json", validator_1.loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), authController_1.loginUser);
