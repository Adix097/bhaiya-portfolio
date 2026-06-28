import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, default: "" },
});

const metadataSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
});

const collectionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    coverImage: {
      url: { type: String, required: true },
      publicId: { type: String, default: "" },
    },
    images: [imageSchema],
    featured: { type: Boolean, default: false },
    metadata: [metadataSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Collection", collectionSchema);
