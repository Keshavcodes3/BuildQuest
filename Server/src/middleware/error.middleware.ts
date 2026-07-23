import type { ErrorRequestHandler } from "express";
import { ApiError } from "../constants/apiError.js";

export const errorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
            stack:
                process.env.NODE_ENV === "development"
                    ? err.stack
                    : undefined,
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
        errors: [],
        stack:
            process.env.NODE_ENV === "development"
                ? err.stack
                : undefined,
    });
};