import { prisma } from "../../config/db"
import { envVars } from "../../envConfig/env";
import AppError from "../../error/AppError"
import type { TUser } from "./TUser"
import bcrypt from 'bcrypt';

const createNewUser = async (payload: TUser) => {
    const isExistUser = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })

    if (isExistUser) {
        throw new AppError(500, 'User already exist!')
    }

    if (payload.password) {
        const hashPassword = await bcrypt.hash(payload.password as string, Number(envVars.BCRYPT_ROUNDS));
        payload.password = hashPassword
    }

    const result = await prisma.user.create({
        data: payload
    })
    return result
}

const getAllUser = async () => {
    const result = await prisma.user.findMany()
    return result
}

const getSingleUser = async (email: string) => {
    const isExistUser = await prisma.user.findUnique({
        where: {
            email: email
        },
        select : {
            id : true,
            email : true,
            name : true,
            role : true,
        }
    })
    if (!isExistUser) {
        throw new AppError(404, 'User Not Found!')
    }
    return isExistUser
}

const deleteUser = async (userId: number) => {
    const isExistUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!isExistUser) {
        throw new AppError(404, 'User Not Found!')
    }

    const result = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return result
}

export const userService = {
    createNewUser,
    getAllUser,
    getSingleUser,
    deleteUser
}