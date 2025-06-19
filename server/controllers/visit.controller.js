import Visit from "../models/visit.model.js";

// Increment and return updated visit count
export const incrementVisitCount = async (req, res) => {
  try {
    const visit = await Visit.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true }
    );

    if (!visit) {
      return res.status(500).json({ error: "Visit counter not initialized" });
    }

    res.json({ count: visit.count });
  } catch (error) {
    res.status(500).json({ error: "Failed to track visit" });
  }
};

// Get current visit count without incrementing
export const getVisitCount = async (req, res) => {
  try {
    const visit = await Visit.findOne();
    if (!visit) {
      return res.status(404).json({ error: "Visit counter not initialized" });
    }

    res.json({ count: visit.count });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve visit count" });
  }
};
