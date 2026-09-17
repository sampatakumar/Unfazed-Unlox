import SessionNote from "../models/SessionNote.js";

// Therapist endpoint: Get ALL notes (private + shared) for a session or client
export const getTherapistNotes = async (req, res, next) => {
  try {
    const therapistId = req.user?.id || req.headers["x-therapist-id"] || "66e01a9b4000000000000001";
    const { clientId, sessionId } = req.query;

    const filter = { therapist_id: therapistId };
    if (clientId) filter.client_id = clientId;
    if (sessionId) filter.session_id = sessionId;

    const notes = await SessionNote.find(filter).sort({ createdAt: -1 });

    if (notes.length === 0) {
      // Demo notes
      const demoNotes = [
        {
          _id: "66e01a9b4000000000000301",
          session_id: "66e01a9b4000000000000201",
          therapist_id: therapistId,
          client_id: "66e01a9b4000000000000101",
          type: "private",
          templateFormat: "soap",
          soap: {
            subjective: "Client reports severe anxiety prior to quarterly reviews. Sleep disruption 3x/week.",
            objective: "Fidgety posture, rapid speech pattern, visible tension in neck.",
            assessment: "CBT intervention indicates cognitive distortion of catastrophizing outcome.",
            plan: "Assigned 4-7-8 breathing exercises & thought diary before next session.",
          },
          freeformContent: "Private reflection: Monitor suicidal ideation history if work stress escalates.",
          createdAt: new Date("2026-09-02"),
        },
        {
          _id: "66e01a9b4000000000000302",
          session_id: "66e01a9b4000000000000201",
          therapist_id: therapistId,
          client_id: "66e01a9b4000000000000101",
          type: "shared",
          templateFormat: "freeform",
          freeformContent: "Shared Takeaway: Practice progressive muscle relaxation 10 mins every evening. Review thought log on Monday.",
          createdAt: new Date("2026-09-02"),
        },
      ];
      return res.json(demoNotes);
    }

    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// Client endpoint: STRICT ENFORCEMENT - NEVER return private notes
export const getClientSharedNotes = async (req, res, next) => {
  try {
    const { clientId } = req.params;

    // Hard guarantee: ONLY query type: "shared"
    const sharedNotes = await SessionNote.find({
      client_id: clientId,
      type: "shared",
    }).select("-soap.objective -soap.assessment"); // Exclude diagnostic fields if any

    res.json(sharedNotes);
  } catch (error) {
    next(error);
  }
};

// Create or update clinical note
export const saveNote = async (req, res, next) => {
  try {
    const therapistId = req.user?.id || req.headers["x-therapist-id"] || "66e01a9b4000000000000001";
    const { sessionId, clientId, type, templateFormat, soap, freeformContent } = req.body;

    if (!sessionId || !clientId) {
      return res.status(400).json({ error: "Session ID and Client ID are required." });
    }

    const note = await SessionNote.create({
      session_id: sessionId,
      therapist_id: therapistId,
      client_id: clientId,
      type: type || "private",
      templateFormat: templateFormat || "soap",
      soap: soap || {},
      freeformContent: freeformContent || "",
    });

    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};
