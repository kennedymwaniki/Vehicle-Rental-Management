"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportRouter = void 0;
const hono_1 = require("hono");
const customerSupportController_1 = require("./customerSupportController");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.customerSupportRouter = new hono_1.Hono();
exports.customerSupportRouter.get("/support-tickets", customerSupportController_1.getTickets);
exports.customerSupportRouter.get("/support-tickets/:id", customerSupportController_1.getTicket);
exports.customerSupportRouter.post("/support-tickets", (0, zod_validator_1.zValidator)("json", validator_1.CustomerSupportTicketSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), customerSupportController_1.createTicket);
exports.customerSupportRouter.put("/support-tickets/:id", (0, zod_validator_1.zValidator)("json", validator_1.CustomerSupportTicketSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), customerSupportController_1.updateTicket);
exports.customerSupportRouter.delete("/support-tickets/:id", customerSupportController_1.deleteTicket);
