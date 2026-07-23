import type { Request, Response, NextFunction } from 'express'

class UserValidator {
    public static validateRegister(req: Request, res: Response, next: NextFunction): void {
        const { name, email, username, password, role } = req.body;
        const errors: string[] = [];

        if (!name || typeof name !== 'string' || name.trim() === '') {
            errors.push('Name is required and must be a valid string.');
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
            errors.push('A valid email is required.');
        }

        if (!username || typeof username !== 'string' || username.trim() === '') {
            errors.push('Username is required and must be a valid string.');
        }

        if (!password || typeof password !== 'string' || password.length < 6) {
            errors.push('Password is required and must be at least 6 characters long.');
        }

        if (role && !['Learner', 'Admin', 'Creator'].includes(role)) {
            errors.push('Invalid role specified.');
        }

        if (errors.length > 0) {
            res.status(400).json({ success: false, errors });
            return;
        }

        next();
    }

    public static validateLogin(req: Request, res: Response, next: NextFunction): void {
        const { email, username, password } = req.body;
        const errors: string[] = [];

        if ((!email && !username) || (email && typeof email !== 'string') || (username && typeof username !== 'string')) {
            errors.push('A valid email or username is required for login.');
        }

        if (!password || typeof password !== 'string') {
            errors.push('Password is required.');
        }

        if (errors.length > 0) {
            res.status(400).json({ success: false, errors });
            return;
        }

        next();
    }
}

export default UserValidator;