import type { Request, Response } from 'express'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import userService from './users.service.js'
import { ApiError, ApiResponse } from '../../constants/apiError.js'
import { generateToken } from './users.utils.js'
import type { LoginUserData } from './dto.js'
import { parseArgs } from 'util'

class userControllerClass {
    registerUser = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.registerUserService(req.body)
        if (!user) {
            throw new ApiError(400, "Can't register user")
        }
        const token = generateToken(user)
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60
        })

        return res.status(201).json({
            data: new ApiResponse(201, user, "user registered successfully")
        })
    })

    loginUser = asyncHandler(async (req: Request, res: Response) => {
        const { username, password }: LoginUserData = req.body
        const user = await userService.loginUserService(username, password)
        if (!user || user == null) throw new ApiError(404, "User not found")
        const token = generateToken(user)
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60
        })
        return res.status(200).json({
            data: new ApiResponse(200, user, "User logged in successfully")
        })
    })

    logoutUser = asyncHandler(async (req: Request, res: Response) => {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0)
        });

        return res.status(200).json({
            data: new ApiResponse(200, null, "User logged out successfully")
        })
    });

    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user.userId
        const user = await userService.getUserService(userId)
        return res.status(400).json({
            data: new ApiResponse(400, user, "user fetched successfully")
        })
    })

    updateProfile = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req as any).user.userId
        const user = await userService.getUserService(userId)
        return res.status(200).json({
            data: new ApiResponse(200, user, "user profile updated successfully")
        })
    })

    changePassword = asyncHandler(async (req: Request, res: Response) => {
        const { password, newPassword } = req.body
        const userId = (req as any).user.userId
        if (!userId) throw new ApiError(401, "Unauthorized access")
        const user = await userService.changePasswordService(password, newPassword, userId)
        return res.status(200).json({
            data:new ApiResponse(200,user,"password changed successfully")
        })
    })
    

}

const userController = new userControllerClass()
export default userController