"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketService = exports.updateTicketService = exports.createTicketService = exports.getTicketById = exports.getTicketsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getTicketsService = async () => {
    const tickets = await db_1.default.query.CustomerSupportTicketsTable.findMany({
        columns: {
            ticketId: true,
            userId: true,
            subject: true,
            description: true,
            status: true,
        },
    });
    return tickets;
};
exports.getTicketsService = getTicketsService;
const getTicketById = async (id) => {
    const ticket = await db_1.default.query.CustomerSupportTicketsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id),
    });
    return ticket;
};
exports.getTicketById = getTicketById;
const createTicketService = async (ticket) => {
    await db_1.default.insert(schema_1.CustomerSupportTicketsTable).values(ticket);
    return ticket;
};
exports.createTicketService = createTicketService;
const updateTicketService = async (id, ticket) => {
    await db_1.default
        .update(schema_1.CustomerSupportTicketsTable)
        .set(ticket)
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id));
    return ticket;
};
exports.updateTicketService = updateTicketService;
const deleteTicketService = async (id) => {
    await db_1.default
        .delete(schema_1.CustomerSupportTicketsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id));
};
exports.deleteTicketService = deleteTicketService;
