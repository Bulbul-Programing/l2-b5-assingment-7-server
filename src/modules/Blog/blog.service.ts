import { prisma } from "../../config/db"
import envConfig from "../../envConfig";
import AppError from "../../error/AppError"
import type { TBlog } from "./blog.interface";
import bcrypt from 'bcrypt';

const creteNewBlog = async (payload: TBlog) => {
    if (!payload.slug) {
        const splitTitle = payload.title.split(' ').join('-')
        payload.slug = splitTitle
    }
    console.log(payload);
    const result = await prisma.blog.create({
        data: payload
    })
    return result
}



export const blogService = {
    creteNewBlog,
}