import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../constants/apiError.js';
import { apiConfig } from '../config/env.js';

// Extend Express Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        const jwtSecret = apiConfig.JWT_SECRET;
        if (!jwtSecret) {
            throw new ApiError(500, "JWT_SECRET is not defined in environment variables");
        }

        const decoded: any = jwt.verify(token, jwtSecret);

        req.user = decoded;

        if (!req.user.userId && req.user._id) {
            req.user = req.user._id;
        }

        next();
    } catch (error: any) {
        throw new ApiError(401, error?.message || "Invalid or expired token");
    }
};