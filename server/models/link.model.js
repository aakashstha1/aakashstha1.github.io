import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    fbURL: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    instaURL: { type: String, required: true, trim: true },
    linkedinURL: { type: String, required: true, trim: true },
    githubURL: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
