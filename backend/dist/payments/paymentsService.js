"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentById = exports.getPaymentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const getPaymentsService = async () => {
    const payments = await db_1.default.query.PaymentsTable.findMany();
    return payments;
};
exports.getPaymentsService = getPaymentsService;
const getPaymentById = async (id) => {
    const payment = await db_1.default.query.PaymentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id),
    });
    return payment;
};
exports.getPaymentById = getPaymentById;
const createPaymentService = async (payment) => {
    await db_1.default.insert(schema_1.PaymentsTable).values(payment);
    return payment;
};
exports.createPaymentService = createPaymentService;
const updatePaymentService = async (id, payment) => {
    await db_1.default.update(schema_1.PaymentsTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
    return payment;
};
exports.updatePaymentService = updatePaymentService;
const deletePaymentService = async (id) => {
    await db_1.default.delete(schema_1.PaymentsTable).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
};
exports.deletePaymentService = deletePaymentService;
