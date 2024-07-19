"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.getPayments = void 0;
const stripe_1 = __importDefault(require("../stripe/stripe"));
const paymentsService_1 = require("./paymentsService");
const getPayments = async (c) => {
    const data = await (0, paymentsService_1.getPaymentsService)();
    return c.json(data);
};
exports.getPayments = getPayments;
// In paymentsController.ts
const getPayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.json({ error: "Invalid ID" }, 400); // Return a 400 error for invalid ID
    }
    console.log(id);
    const payment = await (0, paymentsService_1.getPaymentById)(id);
    if (!payment) {
        return c.json({ error: "Payment not found" }, 404);
    }
    return c.json(payment, 200);
};
exports.getPayment = getPayment;
// export const createPayment = async (c: Context) => {
//   try {
//     const payment = await c.req.json();
//     console.log(payment);
//     const createdPayment = await createPaymentService(payment);
//     if (!createdPayment) {
//       return c.text("No payment created");
//     }
//     return c.json({ msg: createdPayment }, 201);
//   } catch (error: any) {
//     return c.json({ error: error?.message }, 400);
//   }
// };
const paymentService = (0, paymentsService_1.createPaymentService)();
exports.createPayment = {
    async createCheckoutSession(c) {
        try {
            const { bookingId, amount } = await c.req.json();
            //! i am checking how the id and amount is received
            console.log(`this is how we receive the bookingId in the controller ${bookingId} as a :`, typeof bookingId);
            console.log(`this is how we receive the amount in the controller ${amount} as a :`, typeof amount);
            //!converting our received booking id and amount into numbers
            const validBookingId = Number(bookingId);
            const validAmount = Number(amount);
            console.log(`this is the validBookingId ${validBookingId} in the controller which is receiced as :`, `${bookingId}`);
            console.log(`this is the validAmount ${validBookingId} in the controller which is receiced as :`, `${bookingId}`);
            if (isNaN(validBookingId) || isNaN(validAmount)) {
                return c.json({ success: false, error: "Invalid bookingId or amount" }, 400);
            }
            const session = await paymentService.createCheckoutSession(validBookingId, validAmount);
            //!check the session
            console.log(session);
            return c.json({
                success: true,
                sessionId: session.id,
                checkoutUrl: session.url,
            });
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            return c.json({ success: false, error: "Failed to create checkout session" }, 500);
        }
    },
    async testCreateCheckoutSession(c) {
        try {
            const bookingId = 8;
            const amount = 90000;
            const session = await paymentService.createCheckoutSession(bookingId, amount);
            await paymentService.handleSuccessfulPayment(session.id);
            return c.json({
                success: true,
                sessionId: session.id,
                checkoutUrl: session.url,
            });
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            return c.json({ success: false, error: "Failed to create checkout session" }, 500);
        }
    },
    async handleWebhook(c) {
        try {
            const sig = c.req.header("stripe-signature");
            const rawBody = await c.req.raw.text();
            const event = stripe_1.default.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            console.log("Received event:", event);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                console.log("Session data:", session);
                await paymentService.handleSuccessfulPayment(session.id);
            }
            return c.json({ received: true });
        }
        catch (err) {
            console.error(err);
            return c.json({ error: "Webhook error" }, 400);
        }
    },
};
const updatePayment = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const payment = await c.req.json();
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
