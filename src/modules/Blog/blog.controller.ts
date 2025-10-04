import type { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { blogService } from "./blog.service";

const creteNewBlog = catchAsync(async (req: Request, res: Response) => {
    const blogData = req.body
    const result = await blogService.creteNewBlog(blogData);
    res.status(200).json({
        success: true,
        massage: 'Blog create successfully',
        data: result
    })
})

export const blogController = {
    creteNewBlog
}