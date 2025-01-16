// controllers/project.controller.js
import Project from "../models/project.model.js";
import { ApiError } from "../middleware/ApiError.js";
import { ApiResponse } from "../middleware/ApiResponse.js";

export const createProject = asyncHandler(async (req, res) => {
    const { name, description, category, target, minInvestment, duration, icon, daysLeft } = req.body;
    const newProject = new Project({
        name,
        description,
        category,
        target,
        minInvestment,
        duration,
        icon,
        daysLeft,
        image: req.file.path,
    });

    await newProject.save();
    res.status(201).json(new ApiResponse(201, newProject, "Project created successfully"));
});