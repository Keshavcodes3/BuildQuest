import type { Request, Response } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import type { userInterface } from './users.types.js'
import userRepo from './users.repository.js'
import { hashPassword } from '../../lib/hash.js'
import { ApiError, ApiResponse } from '../../constants/apiError.js'
import type { RegisterUserData } from './dto.js'
import { comparePassword, generateToken } from './users.utils.js'
import { Types } from 'mongoose'
import bcrypt from 'bcrypt'
class userServiceClass {
    registerUserService = async ({ name, email, username, password, avatar }: RegisterUserData) => {
        const doExist = await userRepo.findUser(username, email)
        if (doExist) {
            return new ApiResponse(400, null, "user already exist with email or username")
        }
        const hashedPassword = await hashPassword(password as string)
        const user = await userRepo.registerUser({ name, email, username, password: hashedPassword, avatar })
        if (!user) throw new ApiError(400, "user can't be registered")
        return user
    }

    loginUserService = async (username: string, password: string) => {
        const user = await userRepo.findUserByUserNameForLogin(username)
        if (!user) throw new ApiError(404, "user not found")
        const passwordMatched = await bcrypt.compare(password, user.password)
        if (!passwordMatched) throw new ApiError(401, "Unautorized access")
        return user
    }

    getUserService = async (userId: Types.ObjectId) => {
        const user = await userRepo.findUserById(userId)
        if (!user) return null
        return user
    }

    updateProfileService = async (userId: Types.ObjectId, avatarUrl: string) => {
        if (!userId || !avatarUrl) throw new ApiError(400, "please provide a avatar url")
        const user = await userRepo.updateAvatar(userId, avatarUrl)
        return user

    }

    changePasswordService = async (password: string, newPassword: string, userId: Types.ObjectId) => {
        const user = await userRepo.findUserById(userId)
        if (!user) throw new ApiError(401, "Unauthorized access")
        const passwordMatched = await comparePassword(password, user.password)
        if (!user) throw new ApiError(401, "Unauthorized access")

        const updatedUser = await userRepo.updatePassword(userId, newPassword)
        return updatedUser
    }
}




const userService = new userServiceClass()
export default userService