import type { Request, Response } from "express";
import catchAsync from "../../Utils/catchAsync";
import { blogService } from "./blog.service";
import type { JwtPayload } from "jsonwebtoken";

const creteNewBlog = catchAsync(async (req: Request, res: Response) => {
    const blogData = req.body
    const { userId } = req.user as JwtPayload

    const payload = {
        ...blogData,
        authorId: userId
    }
 
    const result = await blogService.creteNewBlog(payload);
    res.status(200).json({
        success: true,
        massage: 'Blog create successfully',
        data: result
    })
})

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await blogService.getAllBlogs();
    res.status(200).json({
        success: true,
        massage: 'All Blog retrieve successfully',
        data: result
    })
})

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
    const blogSlug = req.params.slagId || ''
    const result = await blogService.getSingleBlog(blogSlug);
    res.status(200).json({
        success: true,
        massage: 'Single Blog retrieve successfully',
        data: result
    })
})

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.id || ''
    const result = await blogService.deleteBlog(blogId);
    res.status(200).json({
        success: true,
        massage: 'Blog delete successfully',
        data: result
    })
})

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const blogId = req.params.blogId || ''
    const blogData = req.body

    const result = await blogService.updateBlog(blogData, blogId);

    res.status(200).json({
        success: true,
        massage: 'Blog Update successfully',
        data: result
    })
})

export const blogController = {
    creteNewBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog
}