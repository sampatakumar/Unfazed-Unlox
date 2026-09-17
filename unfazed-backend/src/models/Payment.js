import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    therapist_id: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist", required: true },
    session_id: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
    gateway_transaction_id: { type: String, required: true },
    order_id: { type: String, default: "" },
    gross_amount: { type: Number, required: true },
    platform_fee: { type: Number, default: 0 },
    gst_amount: { type: Number, default: 0 },
    net_amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["created", "captured", "failed", "refunded"], default: "captured" },
    paymentMethod: { type: String, default: "UPI / Card" },
    invoiceUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
