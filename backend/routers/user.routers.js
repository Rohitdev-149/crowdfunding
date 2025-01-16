// routes/user.routes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { check } from "express-validator";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  registerUser
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  loginUser
);

export default router;