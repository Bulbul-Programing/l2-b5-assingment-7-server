
import { z } from "zod";

export const createProjectValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().nullable().optional(),
        description: z.string().min(1, "Description is required"),
        thumbnail: z.string().url("Thumbnail must be a valid URL"),
        liveUrl: z.string().url("Live URL must be a valid URL"),
        repoUrl: z.string().url("Repository URL must be a valid URL"),
        features: z.array(z.string().min(1, "Feature cannot be empty")),
        ownerId: z.number().int().positive(),
    })
});

export const updateProjectValidateSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        slug: z.string().nullable().optional(),
        description: z.string().min(1, "Description is required").optional(),
        thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
        liveUrl: z.string().url("Live URL must be a valid URL").optional(),
        repoUrl: z.string().url("Repository URL must be a valid URL").optional(),
        features: z.array(z.string().min(1, "Feature cannot be empty")).optional()
    })
});
