import type { Types } from "mongoose"
import usersModel from "./users.model.js"
import type { userInterface } from "./users.types.js"

import { type RegisterUserData } from "./dto.js"


class userRepositary {
    registerUser = async ({ name, email, username, password, avatar }: RegisterUserData) => {
        const user = await usersModel.create({
            name,
            email,
            username,
            password,
            avatar
        })
        return user
    }

    findUserById = async (userId: Types.ObjectId) => {
        const user = await usersModel.findById(userId)
        if (!user) return null
        return user
    }

    findUserByEmail = async (email: string) => {
        const user = await usersModel.findOne({ email: email }).select('+password')
        if (!user) return null
        return user
    }

    findUserByUserNameForLogin = async (username: string) => {
        const user = await usersModel.findOne({ username: username }).select('+password')
        if (!user) return null
        return user
    }

    findUser = async (username: string, email: string) => {
        const user = await usersModel.findOne({ username: username, email: email })
        if (!user) return null
        return user
    }

    updateAvatar = async (userId: Types.ObjectId, newAvatarUrl: string) => {
        const updatedUser = await usersModel.findByIdAndUpdate(userId, {
            "$set": {
                avatarUrl: newAvatarUrl
            }
        })
        return updatedUser
    }

    updatePassword = async (userId: Types.ObjectId, newPassword: string) => {
        const updatedUser = await usersModel.findByIdAndUpdate(userId, {
            "$set": {
                password: newPassword
            }
        })
        return updatedUser
    }


}


const userRepo = new userRepositary()
export default userRepo