"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.getPayments = void 0;
const paymentsService_1 = require("./paymentsService");
const getPayments = async (c) => {
    const data = await (0, paymentsService_1.getPaymentsService)();
    return c.json(data);
};
exports.getPayments = getPayments;
const getPayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    const payment = await (0, paymentsService_1.getPaymentById)(id);
    if (!payment) {
        return c.json({ error: "Payment not found" }, 404);
    }
    return c.json(payment, 200);
};
exports.getPayment = getPayment;
const createPayment = async (c) => {
    try {
        const payment = await c.req.json();
        console.log(payment);
        const createdPayment = await (0, paymentsService_1.createPaymentService)(payment);
        if (!createdPayment) {
            return c.text("No payment created");
        }
        return c.json({ msg: createdPayment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createPayment = createPayment;
const updatePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const payment = await c.req.json();
    try {
        const searchedPayment = await (0, paymentsService_1.getPaymentById)(id);
        if (searchedPayment == undefined)
            return c.text("Payment not found", 404);
        const res = await (0, paymentsService_1.updatePaymentService)(id, payment);
        if (!res)
            return c.text("Payment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (c) => {
    try {
        const id = Number(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const payment = await (0, paymentsService_1.getPaymentById)(id);
        if (payment === undefined)
            return c.text("Payment not found", 404);
        const res = await (0, paymentsService_1.deletePaymentService)(id);
        if (res === undefined)
            return c.text("Payment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePayment = deletePayment;
