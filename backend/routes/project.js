import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadImage,
  getProjects,
  getCategories,
} from "../controllers/projectController.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/categories", getCategories);
router.post("/upload", verifyAdmin, upload.single("image"), uploadImage);

export default router;
