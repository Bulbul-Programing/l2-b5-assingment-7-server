import { prisma } from "../../config/db"
import AppError from "../../error/AppError"
import { createUserTokens } from "../../Utils/creteUserToken"
import { isPasswordMatched } from "../../Utils/isPasswordMatch"

const loginUser = async (payload: { email: string, password: string }) => {
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    })
    if (!isUserExist) {
        throw new AppError(404, "User Not Found")
    }

    if (isUserExist.password === null) {
        throw new AppError(400, 'User not found, Please try to google login')
    }

    const isPasswordMatch = await isPasswordMatched(payload.password, isUserExist.password)

    if (!isPasswordMatch) {
        throw new AppError(403, 'Password do not matched');
    }

    const jwtPayload = {
        userId: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const tokenInfo = createUserTokens(jwtPayload)
    return tokenInfo
}

export const authService = {
    loginUser
}