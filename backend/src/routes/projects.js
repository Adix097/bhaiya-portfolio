import express from "express";
import BrandProject from "../models/BrandProject.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await BrandProject.find()
      .select("slug title category year coverImage featured")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const project = await BrandProject.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch {
    res.status(500).json({ message: "Failed to fetch project" });
  }
});

export default router;
