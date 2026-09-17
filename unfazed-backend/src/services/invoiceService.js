import PDFDocument from "pdfkit";

export const generateInvoicePDF = (paymentData, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Stream directly to HTTP response or buffer
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `inline; filename=unfazed-invoice-${paymentData.transactionId || Date.now()}.pdf`
  );

  doc.pipe(res);

  // Header
  doc.fillColor("#0F766E").fontSize(24).text("UNFAZED THERAPY SOLUTION", { align: "left" });
  doc.fillColor("#4B5563").fontSize(10).text("Official Tax Invoice (GST Compliant)", { align: "left" });
  doc.moveDown(1.5);

  // Invoice Details Box
  doc.fillColor("#111827").fontSize(12).text(`Invoice No: UNZ-INV-${Date.now().toString().slice(-6)}`);
  doc.text(`Date: ${new Date().toLocaleDateString("en-IN")}`);
  doc.text(`Transaction ID: ${paymentData.transactionId || "TXN_SIMULATED_998"}`);
  doc.moveDown(1);

  // Bill To
  doc.fillColor("#0F766E").fontSize(14).text("Billed To:");
  doc.fillColor("#374151").fontSize(11).text(`Client Name: ${paymentData.clientName || "Valued Client"}`);
  doc.text(`Therapist: ${paymentData.therapistName || "Dr. Unfazed Professional"}`);
  doc.moveDown(1.5);

  // Table Line Items
  doc.fillColor("#111827").fontSize(12).text("Description                                    Qty      Amount (INR)");
  doc.text("------------------------------------------------------------------");
  
  const gross = paymentData.grossAmount || 1500;
  const gst = Math.round(gross * 0.18);
  const net = gross + gst;

  doc.text(`Online Therapy Session Fee                  1         Rs. ${gross}`);
  doc.text(`GST @ 18%                                             Rs. ${gst}`);
  doc.text("------------------------------------------------------------------");
  doc.fontSize(14).fillColor("#0F766E").text(`Total Paid:                                            Rs. ${net}`);

  doc.moveDown(3);
  doc.fillColor("#9CA3AF").fontSize(9).text("This is a computer-generated tax invoice. No signature required.", { align: "center" });
  doc.text("Unfazed Mental Health Platform — www.unfazed.in", { align: "center" });

  doc.end();
};

export default { generateInvoicePDF };
