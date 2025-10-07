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



export const blogService = {
    creteNewBlog,
}