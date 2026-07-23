import type { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFn<T = unknown> = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<T>;

export function asyncHandler<T = unknown>(
    fn: AsyncFn<T>
): RequestHandler {
    return async (req, res, next) => {
        try {
            return await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}