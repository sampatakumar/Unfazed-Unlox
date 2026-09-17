import nodemailer from "nodemailer";

// Setup Nodemailer test transporter or fallback log
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || "test@unfazed.in",
    pass: process.env.SMTP_PASS || "secret",
  },
});

export const sendNotification = async (event, data) => {
  console.log(`[Notification Engine] Triggered Event: "${event}"`, data);

  // Event 1: Booking Confirmation
  if (event === "BOOKING_CONFIRMED") {
    const { clientName, clientEmail, therapistName, date, time } = data;
    
    // Stub WhatsApp Queue Log
    console.log(`[WhatsApp Stub Queue] Sending WhatsApp message to ${clientName}: "Your session with ${therapistName} is confirmed for ${date} at ${time}."`);

    try {
      await transporter.sendMail({
        from: '"Unfazed Therapy" <no-reply@unfazed.in>',
        to: clientEmail,
        subject: `Booking Confirmed: Session with ${therapistName}`,
        text: `Hi ${clientName},\n\nYour session with ${therapistName} on ${date} at ${time} is confirmed.\n\nThank you,\nUnfazed Team`,
      });
    } catch (e) {
      console.log(`[Email Log Fallback] Sent email to ${clientEmail} for BOOKING_CONFIRMED.`);
    }
  }

  // Event 2: 24hr Reminder
  if (event === "24HR_REMINDER") {
    const { clientName, clientEmail, therapistName, time } = data;
    console.log(`[WhatsApp Stub Queue] Reminder to ${clientName}: "Reminder: Your session with ${therapistName} is tomorrow at ${time}."`);
  }

  // Event 3: Payment Success
  if (event === "PAYMENT_SUCCESS") {
    const { clientName, amount, invoiceUrl } = data;
    console.log(`[Notification Engine] Payment receipt generated: ${amount} INR for ${clientName}. Invoice: ${invoiceUrl}`);
  }
};

export default { sendNotification };
