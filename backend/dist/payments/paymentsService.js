"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentById = exports.getPaymentsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const stripe_1 = __importDefault(require("../stripe/stripe"));
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
// export const createPaymentService = async (payment: TIPayment) => {
//   await db.insert(PaymentsTable).values(payment);
//   return payment;
// };
const createPaymentService = () => {
    return {
        async createCheckoutSession(bookingId, amount) {
            const session = await stripe_1.default.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Car Booking",
                            },
                            unit_amount: amount * 100, // Stripe expects amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
                metadata: {
                    bookingId: bookingId.toString(),
                },
            });
            return session;
        },
        async handleSuccessfulPayment(sessionId) {
            const session = await stripe_1.default.checkout.sessions.retrieve(sessionId);
            const bookingId = parseInt(session.metadata.bookingId);
            // Handle possible null value for session.amount_total
            const amountTotal = session.amount_total;
            if (amountTotal === null) {
                throw new Error("session.amount_total is null");
            }
            // Update booking status
            await db_1.default
                .update(schema_1.BookingsTable)
                .set({ bookingStatus: "Completed" })
                .where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, bookingId));
            // Create payment record
            await db_1.default
                .insert(schema_1.PaymentsTable)
                .values({
                bookingId,
                amount: amountTotal / 100,
                paymentStatus: "Completed",
                paymentMethod: session.payment_method_types[0],
                transactionId: session.payment_intent,
            })
                .returning();
        },
    };
};
exports.createPaymentService = createPaymentService;
const updatePaymentService = async (id, payment) => {
    await db_1.default
        .update(schema_1.PaymentsTable)
        .set(payment)
        .where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
    return payment;
};
exports.updatePaymentService = updatePaymentService;
const deletePaymentService = async (id) => {
    await db_1.default.delete(schema_1.PaymentsTable).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
};
exports.deletePaymentService = deletePaymentService;
