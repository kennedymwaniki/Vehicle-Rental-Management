import { adminRoleAuth, bothRoleAuth } from "./../middleware/authBearer";
import { Hono } from "hono";

import {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "./paymentsController";

export const paymentsRouter = new Hono();

paymentsRouter.get("/payments", adminRoleAuth, getPayments);
paymentsRouter.get("/payments/:id", bothRoleAuth, getPayment);
// paymentsRouter.post("/payments", createPayment);
paymentsRouter.put("/payments/:id", adminRoleAuth, updatePayment);
paymentsRouter.delete("/payments/:id", adminRoleAuth, deletePayment);

paymentsRouter.post(
  "/create-checkout-session",
  createPayment.createCheckoutSession
);
paymentsRouter.post("/webhook", createPayment.handleWebhook);
paymentsRouter.get(
  "/test-checkout-session",
  createPayment.testCreateCheckoutSession
);
