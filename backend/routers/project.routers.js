// routes/project.routes.js
import express from "express";
import { createProject } from "../controllers/project.controller.js";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authenticateToken, upload.single("image"), createProject);

export default router;