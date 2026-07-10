import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import cloudinary from "../lib/cloudinary.js";
import Collection from "../models/Collection.js";
import BrandProject from "../models/BrandProject.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const extractYear = (metadata) => {
  const dateMeta = metadata?.find((m) => m.label.toLowerCase() === "date");
  if (!dateMeta) return 0;
  const match = dateMeta.value.match(/\d{4}/);
  return match ? parseInt(match[0]) : 0;
};

// Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
};

const deleteFromCloudinary = (publicId) => {
  if (!publicId) return Promise.resolve();
  return cloudinary.uploader.destroy(publicId);
};

// Auth
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token });
});

// Upload
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file received" });
    }

    const folder = req.body.folder ?? "portfolio";
    const result = await uploadToCloudinary(req.file.buffer, folder);
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// Collections
router.post("/collections", auth, async (req, res) => {
  try {
    const year = extractYear(req.body.metadata);
    const collection = await Collection.create(req.body);
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/collections/:slug", auth, async (req, res) => {
  try {
    const year = extractYear(req.body.metadata);
    const collection = await Collection.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, year },
      { new: true, runValidators: true },
    );
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/collections/:slug", auth, async (req, res) => {
  try {
    const collection = await Collection.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Clean up all images from Cloudinary
    await deleteFromCloudinary(collection.coverImage.publicId);
    await Promise.all(
      collection.images.map((img) => deleteFromCloudinary(img.publicId)),
    );

    res.json({ message: "Collection deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete collection" });
  }
});

// Brand Work
router.post("/projects", auth, async (req, res) => {
  try {
    const project = await BrandProject.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/projects/:slug", auth, async (req, res) => {
  try {
    const project = await BrandProject.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true },
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/projects/:slug", auth, async (req, res) => {
  try {
    const project = await BrandProject.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await deleteFromCloudinary(project.coverImage.publicId);
    await Promise.all(
      project.layout
        .filter((block) => block.type === "image" && block.publicId)
        .map((block) => deleteFromCloudinary(block.publicId)),
    );

    res.json({ message: "Project deleted" });
  } catch {
    res.status(500).json({ message: "Failed to delete project" });
  }
});

export default router;
