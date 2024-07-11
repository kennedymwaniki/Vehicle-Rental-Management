import { Hono } from "hono";

import {
  getTicket,
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
} from "./customerSupportController";
import { adminRoleAuth, bothRoleAuth } from "../middleware/authBearer";

export const customerSupportRouter = new Hono();


customerSupportRouter.get("/support-tickets", bothRoleAuth, getTickets);
customerSupportRouter.get("/support-tickets/:id", adminRoleAuth, getTicket);
customerSupportRouter.post("/support-tickets", adminRoleAuth, createTicket);
customerSupportRouter.put("/support-tickets/:id", adminRoleAuth, updateTicket);
customerSupportRouter.delete(
  "/support-tickets/:id",
  adminRoleAuth,
  deleteTicket
);
