import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const boysTransporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.PRIMARY_GMAIL_ID!,
    pass: process.env.PRIMARY_GMAIL_PWD!,
  },
});
