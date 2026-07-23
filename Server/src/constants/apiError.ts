export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly success: boolean;
    public readonly errors: unknown[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: unknown[] = []
    ) {
        super(message);

        this.statusCode = statusCode;
        this.success = false;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}
export class ApiResponse<T = unknown> {
    public readonly success: boolean;
    public readonly statusCode: number;
    public readonly message: string;
    public readonly data: T;

    constructor(
        statusCode: number,
        data: T,
        message: string = "Success"
    ) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}