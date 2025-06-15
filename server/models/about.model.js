import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    description1: { type: String, required: true, trim: true },
    description2: { type: String, required: true, trim: true },
    skills: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
