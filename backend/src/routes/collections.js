import express from "express";
import Collection from "../models/Collection.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find()
      .select("slug title coverImage metadata featured")
      .sort({ createdAt: -1 });
    res.json(collections);
  } catch {
    res.status(500).json({ message: "Failed to fetch collections" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const collection = await Collection.findOne({ slug: req.params.slug });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  } catch {
    res.status(500).json({ message: "Failed to fetch collection" });
  }
});

export default router;
