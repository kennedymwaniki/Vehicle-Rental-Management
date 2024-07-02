import { Hono } from "hono";

import {
  getPayment,
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "./paymentsController";

export const paymentsRouter = new Hono();

paymentsRouter.get("/payments", getPayments);
paymentsRouter.get("/payments/:id", getPayment);
paymentsRouter.post("/payments", createPayment);
paymentsRouter.put("/payments/:id", updatePayment);
paymentsRouter.delete("/payments/:id", deletePayment);