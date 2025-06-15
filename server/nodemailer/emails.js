import {
  CONTACT_FORM_SUBMISSION_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import { transporter, sender } from "./nodemailer.config.js";

export const sendPasswordResetEmail = async (resetURL) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: "aakash.cerestha90@gmail.com",
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
    console.log("Password reset success email sent");
  } catch (error) {
    console.error("Error sending reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};

export const submitMessage = async (name, email, phone, message) => {
  try {
    await transporter.sendMail({
      from: email,
      to: "aakash.078.godawari.edu.np",
      subject: `New contact form message from ${name}`,
      html: CONTACT_FORM_SUBMISSION_TEMPLATE.replace("{name}", name)
        .replace("{email}", email)
        .replace("{phone}", phone || "N/A")
        .replace("{message}", message),
    });
    console.log("Contact message email sent successfully");
  } catch (error) {
    console.error("Error sending contact form message:", error);
    throw new Error("Failed to send contact form message");
  }
};
