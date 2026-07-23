import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { apiConfig } from '../../config/env.js'
export const comparePassword = async (password: string, haspassword: string) => {
    return await bcrypt.compare(password, haspassword)
}

export const generateToken = (user: any) => {
    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            username: user.username
        }, apiConfig.JWT_SECRET, { expiresIn: '7d' }
    )
    return token
}