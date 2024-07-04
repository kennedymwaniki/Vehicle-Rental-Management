"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.AUTH,
    },
});
const sendWelcomeEmail = async (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to,
        subject,
        html,
    };
    //hello
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    }
    catch (error) {
        console.error("Eroor encountered while sending email");
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
