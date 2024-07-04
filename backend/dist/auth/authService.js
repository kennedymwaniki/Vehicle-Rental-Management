"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInAuthService = exports.createAuthUserService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const createAuthUserService = async (user) => {
    try {
        console.log("AuthService:", user);
        // Insert user into `UsersTable` table
        // Check if user already exists by email
        const existingUser = await db_1.db.query.UsersTable.findFirst({
            where: (0, drizzle_orm_1.sql) `${schema_1.UsersTable.email} = ${user.email}`,
        });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const createdUser = await db_1.db
            .insert(schema_1.UsersTable)
            .values({
            fullName: user.fullName,
            email: user.email,
            contactPhone: user.contactPhone,
            password: user.password,
            address: user.address,
            role: user.role || "user",
        })
            .returning();
        console.log("Authservices:", createdUser);
        // Extract the created user ID
        const userId = createdUser[0].userId;
        // Insert user into `AuthUsersTable` table
        await db_1.db.insert(schema_1.AuthUsersTable).values({
            userId,
            password: user.password,
            role: user.role || "user",
        });
        return createdUser[0]; // Return the created user
    }
    catch (error) {
        console.error("Error creating user:", error);
        throw new Error("User creation failed");
    }
};
exports.createAuthUserService = createAuthUserService;
//login service
const logInAuthService = async (user) => {
    try {
        const { email } = user;
        console.log(user);
        const authUser = await db_1.db.query.UsersTable.findFirst({
            columns: {
                role: true,
                fullName: true,
                email: true,
                password: true,
            },
            where: (0, drizzle_orm_1.sql) `${schema_1.UsersTable.email} = ${email}`,
        });
        if (!authUser) {
            throw new Error("User not found");
        }
        return authUser;
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Login failed");
    }
};
exports.logInAuthService = logInAuthService;
