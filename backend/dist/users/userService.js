"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserById = exports.getUsersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getUsersService = async () => {
    const users = await db_1.default.query.UsersTable.findMany({
        columns: {
            userId: true,
            fullName: true,
            email: true,
            role: true,
            contactPhone: true,
        },
    });
    return users;
};
exports.getUsersService = getUsersService;
const getUserById = async (id) => {
    const user = await db_1.default.query.UsersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.UsersTable.userId, id),
    });
    return user;
};
exports.getUserById = getUserById;
const createUserService = async (user) => {
    await db_1.default.insert(schema_1.UsersTable).values(user);
    return user;
};
exports.createUserService = createUserService;
const updateUserService = async (id, user) => {
    await db_1.default.update(schema_1.UsersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.userId, id));
    return user;
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.UsersTable).where((0, drizzle_orm_1.eq)(schema_1.UsersTable.userId, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
