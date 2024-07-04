"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicket = exports.getTickets = void 0;
const customerSupportService_1 = require("./customerSupportService");
const getTickets = async (c) => {
    const data = await (0, customerSupportService_1.getTicketsService)();
    return c.json(data);
};
exports.getTickets = getTickets;
const getTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const ticket = await (0, customerSupportService_1.getTicketById)(id);
    if (!ticket) {
        return c.json({ error: "Support ticket not found" }, 404);
    }
    return c.json(ticket, 200);
};
exports.getTicket = getTicket;
const createTicket = async (c) => {
    try {
        const ticket = await c.req.json();
        console.log(ticket);
        const createdTicket = await (0, customerSupportService_1.createTicketService)(ticket);
        if (!createdTicket) {
            return c.text("No support ticket created");
        }
        return c.json({ msg: createdTicket }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createTicket = createTicket;
const updateTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const ticket = await c.req.json();
    try {
        const searchedTicket = await (0, customerSupportService_1.getTicketById)(id);
        if (searchedTicket == undefined)
            return c.text("Support ticket not found", 404);
        const res = await (0, customerSupportService_1.updateTicketService)(id, ticket);
        if (!res)
            return c.text("Support ticket not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateTicket = updateTicket;
const deleteTicket = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const ticket = await (0, customerSupportService_1.getTicketById)(id);
        if (ticket === undefined)
            return c.text("Support ticket not found", 404);
        const res = await (0, customerSupportService_1.deleteTicketService)(id);
        if (res === undefined)
            return c.text("Support ticket not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteTicket = deleteTicket;
