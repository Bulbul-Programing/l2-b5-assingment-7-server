import type { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.loginUser()
    res.status(200).json({
        success: true,
        massage: 'User Login successfully',
        data: result
    })
})

export const authController = {
    loginUser
}