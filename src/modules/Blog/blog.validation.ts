
import { z } from "zod";

export const createBlogValidateSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().min(1, "Content is required"),
        coverImage: z.string().url("Cover image must be a valid URL"),
        published: z.boolean().optional().default(true)
    })
});

export const updateBlogValidateSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        excerpt: z.string().optional(),
        content: z.string().min(1, "Content is required").optional(),
        coverImage: z.string().url("Cover image must be a valid URL").optional(),
        published: z.boolean().optional().default(true)
    })
});
