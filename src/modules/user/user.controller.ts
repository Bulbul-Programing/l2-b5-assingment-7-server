import type { Request, Response } from "express"
import catchAsync from "../../Utils/catchAsync"
import { userService } from "./user.service";
import AppError from "../../error/AppError";

const createNewUser = catchAsync(async (req: Request, res: Response) => {
    const userData = req.body
    const result = await userService.createNewUser(userData);
    res.status(200).json({
        success: true,
        massage: 'User create successfully',
        data: result
    })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.status(200).json({
        success: true,
        massage: 'All user data retrieve successfully',
        data: result
    })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const userInfo = req.user as any
    const result = await userService.getSingleUser(userInfo.email);
    res.status(200).json({
        success: true,
        massage: 'user data retrieve successfully',
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id
    await userService.deleteUser(Number(userId));
    res.status(200).json({
        success: true,
        massage: 'user delete successfully'
    })
})

export const userController = {
    createNewUser,
    getAllUser,
    getSingleUser,
    deleteUser
}