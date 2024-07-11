import { Hono } from "hono";

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserBookings,
  getUserSupportTickets,
} from "./userController";
import { adminRoleAuth, bothRoleAuth } from "../middleware/authBearer";

export const userRouter = new Hono();
// userRouter.use("*");

// get users route
userRouter.get("/users", adminRoleAuth, getUsers);
userRouter.get("/users/:id", bothRoleAuth, getUser);
userRouter.post("/users", adminRoleAuth, createUser);
// userRouter.post("/users/register", createUser);

// create a user

//update a user
userRouter.put("/users/:id", bothRoleAuth, updateUser);
// delete user
userRouter.delete("/users/:id", adminRoleAuth, deleteUser);

userRouter.get("/user/bookings/:id", getUserBookings);
userRouter.get("/user/support-tickets/:id", getUserSupportTickets);
