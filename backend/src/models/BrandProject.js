import mongoose from "mongoose";

const brandProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, default: "" },
    },
    presentation: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("BrandProject", brandProjectSchema);
