import { envVars } from "../envConfig/env";
import type { TUser } from "../modules/user/TUser";
import { generateToken } from "./jwt";


export const createUserTokens = (userInfo: Partial<TUser>) => {
    const jwtPayload = {
        userId: userInfo.id,
        email: userInfo.email,
        role: userInfo.role
    }

    const accessToken = generateToken(jwtPayload, envVars.ACCESS_TOKEN_SECRETE, envVars.ACCESS_TOKEN_EXPIRE)
    const refreshToken = generateToken(jwtPayload, envVars.REFRESH_TOKEN_SECRET, envVars.REFRESH_TOKEN_EXPIRE)

    return {
        accessToken,
        refreshToken
    }
}