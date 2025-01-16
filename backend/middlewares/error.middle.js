// middleware/error.middleware.js
import { HTTP_STATUS } from "../config/constants.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, message });
};