import { prisma } from "../../config/db"
import AppError from "../../error/AppError"
import type { TBlog } from "./blog.interface";
import bcrypt from 'bcrypt';

const creteNewBlog = async (payload: TBlog) => {
    if (!payload.slug) {
        const splitTitle = payload.title.split(' ').join('-').toLocaleLowerCase()
        payload.slug = splitTitle
    }

    const result = await prisma.blog.create({
        data: payload
    })
    return result
}

const getAllBlogs = async () => {
    const result = await prisma.blog.findMany()
    return result
}

const getSingleBlog = async (blogSlug: string) => {
    const result = await prisma.blog.findUnique({
        where: {
            slug: blogSlug
        }
    })
    return result
}

const deleteBlog = async (blogId: string) => {
    const isExistBlog = await prisma.blog.findUnique({
        where: {
            id: Number(blogId)
        }
    })

    if (!isExistBlog) {
        throw new AppError(404, "Blog Not Found!")
    }


    const result = await prisma.blog.delete({
        where: {
            id: Number(blogId)
        }
    })
    return null
}

const updateBlog = async (payload: Partial<TBlog>, blogId: string) => {

    if (payload.authorId) {
        throw new AppError(500, "You can't change author ID!")
    }

    const isExistBlog = await prisma.blog.findUnique({
        where: {
            id: Number(blogId)
        }
    })

    if (!isExistBlog) {
        throw new AppError(404, "Blog Not Found!")
    }

    if (payload.title) {
        const splitTitle = payload.title.split(' ').join('-').toLocaleLowerCase()
        payload.slug = splitTitle
    }

    const result = await prisma.blog.update({
        where: {
            id: Number(blogId)
        },
        data: payload
    })

    return result
}

export const blogService = {
    creteNewBlog,
    getAllBlogs,
    getSingleBlog,
    deleteBlog,
    updateBlog
}