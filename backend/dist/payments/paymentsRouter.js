"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const hono_1 = require("hono");
const paymentsController_1 = require("./paymentsController");
exports.paymentsRouter = new hono_1.Hono();
exports.paymentsRouter.get("/payments", paymentsController_1.getPayments);
exports.paymentsRouter.get("/payments/:id", paymentsController_1.getPayment);
exports.paymentsRouter.put("/payments/:id", paymentsController_1.updatePayment);
exports.paymentsRouter.delete("/payments/:id", paymentsController_1.deletePayment);
exports.paymentsRouter.post("/create-checkout-session", paymentsController_1.createPayment.createCheckoutSession);
exports.paymentsRouter.post("/webhook", paymentsController_1.createPayment.handleWebhook);
exports.paymentsRouter.get("/test-checkout-session", paymentsController_1.createPayment.testCreateCheckoutSession);
