import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imgURL: { type: String, required: true, trim: true },
    githubURL: { type: String, trim: true },
    figmaURL: { type: String, trim: true },
    websiteURL: { type: String, trim: true },
    techUsed: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
