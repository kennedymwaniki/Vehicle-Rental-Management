"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSupportTickets = exports.getUserBookings = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userService_1 = require("./userService");
const getUsers = async (c) => {
    const data = await (0, userService_1.getUsersService)();
    return c.json(data);
};
exports.getUsers = getUsers;
//get one user
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const user = await (0, userService_1.getUserById)(id);
    if (!user) {
        return c.json({ error: "User not found" }, 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
// create a new user
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        console.log(user);
        const createdUser = await (0, userService_1.createUserService)(user);
        if (!createdUser) {
            return c.text("no user created");
        }
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
const updateUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log("controller:", id);
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const user = await c.req.json();
        // search for the user
        const searchedUser = await (0, userService_1.getUserById)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, userService_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
//delete user
const deleteUser = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        //search for the user
        const user = await (0, userService_1.getUserById)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, userService_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
const getUserBookings = async (c) => {
    const userId = parseInt(c.req.param("id"));
    if (isNaN(userId)) {
        return c.json({ error: "Invalid user ID" }, 400);
    }
    const userBookings = await (0, userService_1.getUserBookingsById)(userId);
    if (!userBookings) {
        return c.json({ error: "User not found" }, 404);
    }
    const { bookings, ...userData } = userBookings;
    return c.json({ user: userData, bookings }, 200);
};
exports.getUserBookings = getUserBookings;
const getUserSupportTickets = async (c) => {
    const userId = parseInt(c.req.param("id"));
    if (isNaN(userId)) {
        return c.json({ error: "Invalid user ID" }, 400);
    }
    const userSupportTickets = await (0, userService_1.getUserSupportTicketsById)(userId);
    if (!userSupportTickets) {
        return c.json({ error: "User not found" }, 404);
    }
    const { customerSupportTickets, ...userData } = userSupportTickets;
    return c.json({ user: userData, supportTickets: customerSupportTickets }, 200);
};
exports.getUserSupportTickets = getUserSupportTickets;
