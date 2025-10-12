import type { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { authService } from "./auth.service";
import AppError from "../../error/AppError";
import { createUserTokens } from "../../Utils/creteUserToken";
import { setAuthCookie } from "../../Utils/setCookie";
import { envVars } from "../../envConfig/env";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.body
    const result = await authService.loginUser(userInfo)
    if (result.accessToken && result.refreshToken) {
        setAuthCookie(res, {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        })
    }
    res.status(200).json({
        success: true,
        massage: 'User Login successfully',
        data: result
    })
})

const logout = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.status(200).json({
        success: true,
        massage: 'User Logged Out Successfully'
    })
})

const googleCallbackController = catchAsync(async (req: Request, res: Response) => {
    let redirectTo = req.query.state ? req.query.state as string : ''

    if (redirectTo.startsWith('/')) {
        redirectTo = redirectTo.slice(1)
    }
    const user = req.user
    if (!user) {
        throw new AppError(404, "User Not Found")
    }

    const tokenInfo = createUserTokens(user)
    
    setAuthCookie(res, tokenInfo)

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})



export const authController = {
    loginUser,
    logout,
    googleCallbackController
}