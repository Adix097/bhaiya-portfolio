import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const brandProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    year: { type: String, required: true },
    description: { type: String, default: "" },
    metadata: [metadataSchema],
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, default: "" },
    },
    presentation: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export default mongoose.model("BrandProject", brandProjectSchema);
