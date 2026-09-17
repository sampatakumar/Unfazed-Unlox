import Client from "../models/Client.js";

// Get client CRM list for logged in therapist
export const getTherapistClients = async (req, res, next) => {
  try {
    const therapistId = req.user?.id || req.headers["x-therapist-id"] || "66e01a9b4000000000000001";
    const clients = await Client.find({ therapist_id: therapistId }).sort({ updatedAt: -1 });

    if (clients.length === 0) {
      // Demo clients for rich CRM view
      const demoClients = [
        {
          _id: "66e01a9b4000000000000101",
          name: "Rohan Verma",
          email: "rohan.verma@example.com",
          phone: "+91 98765 43210",
          therapist_id: therapistId,
          status: "active",
          tags: ["Anxiety", "CBT", "Weekly"],
          lastSessionDate: new Date("2026-09-02"),
          intake: {
            age: 28,
            gender: "Male",
            presentingConcern: "Workplace burnout & panic attacks during presentations.",
            medicalHistory: "No prior psychiatric hospitalizations.",
            emergencyContact: "+91 98765 00000 (Spouse)",
          },
          consent: {
            accepted: true,
            timestamp: new Date("2026-08-15"),
            ipAddress: "103.21.124.8",
          },
        },
        {
          _id: "66e01a9b4000000000000102",
          name: "Ananya Deshmukh",
          email: "ananya.d@example.com",
          phone: "+91 98123 45678",
          therapist_id: therapistId,
          status: "active",
          tags: ["Relationship", "Couples"],
          lastSessionDate: new Date("2026-09-07"),
          intake: {
            age: 32,
            gender: "Female",
            presentingConcern: "Communication breakdown & in-law boundary friction.",
            medicalHistory: "Mild insomnia.",
            emergencyContact: "+91 98123 11111 (Brother)",
          },
          consent: {
            accepted: true,
            timestamp: new Date("2026-08-20"),
            ipAddress: "49.207.198.12",
          },
        },
      ];
      return res.json(demoClients);
    }

    res.json(clients);
  } catch (error) {
    next(error);
  }
};

// Create or register new client intake + consent
export const createClientIntake = async (req, res, next) => {
  try {
    const { name, email, phone, therapist_id, intake, consent } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    const client = await Client.create({
      name,
      email,
      phone,
      therapist_id: therapist_id || req.user?.id || "66e01a9b4000000000000001",
      status: "active",
      tags: [intake?.presentingConcern ? intake.presentingConcern.slice(0, 15) : "New Client"],
      intake: intake || {},
      consent: {
        accepted: consent?.accepted || true,
        timestamp: new Date(),
        ipAddress: req.ip || "127.0.0.1",
      },
    });

    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};

// Get individual client details
export const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    next(error);
  }
};
