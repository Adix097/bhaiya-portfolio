import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// This gives us the path to the projects.json file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "../projects.json");

// Helper: read all projects from the JSON file
const readProjects = () => {
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw);
};

// Helper: write projects array back to the JSON file
const writeProjects = (projects) => {
  fs.writeFileSync(dataFile, JSON.stringify(projects, null, 2));
};

// POST /api/projects/upload  — upload image + save project
export const uploadImage = async (req, res) => {
  try {
    // 1. Upload the image file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio",
    });

    // 2. Build the new project object from the uploaded data + form fields
    const newProject = {
      id: Date.now(), // simple unique id using timestamp
      title: req.body.title || "Untitled",
      category: req.body.category || "UNCATEGORIZED",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    };

    // 3. Read existing projects, add the new one, save back
    const projects = readProjects();
    projects.push(newProject);
    writeProjects(projects);

    // 4. Send the new project back to the frontend
    res.status(200).json(newProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

// GET /api/projects  — return all projects
export const getProjects = async (req, res) => {
  try {
    const projects = readProjects();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Could not load projects" });
  }
};

// GET /api/projects/categories — return unique categories from saved projects
export const getCategories = async (req, res) => {
  try {
    const projects = readProjects();
    const unique = [...new Set(projects.map((p) => p.category))];
    res.status(200).json(unique);
  } catch (err) {
    res.status(500).json({ message: "Could not load categories" });
  }
};
