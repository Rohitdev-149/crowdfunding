// middleware/error.middleware.js
import { ApiError } from "./ApiError.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ success: err.success, message: err.message, errors: err.errors });
    }
    
    res.status(500).json({ success: false, message: "Internal Server Error" });
};