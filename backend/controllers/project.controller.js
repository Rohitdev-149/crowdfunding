// controllers/project.controller.js
import Project from "../models/project.model.js";
import { HTTP_STATUS } from "../config/constants.js";

export const createProject = async (req, res) => {
  try {
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
      image: req.file.path, // Path of uploaded image
    });

    await newProject.save();
    res.status(HTTP_STATUS.CREATED).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Error creating project", error });
  }
};