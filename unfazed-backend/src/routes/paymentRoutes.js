import express from "express";
import {
  createOrder,
  verifyPayment,
  downloadInvoice,
  handleWebhook,
  getPackages,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/invoice/:paymentId", downloadInvoice);
router.post("/webhook", handleWebhook);
router.get("/packages", getPackages);

export default router;
