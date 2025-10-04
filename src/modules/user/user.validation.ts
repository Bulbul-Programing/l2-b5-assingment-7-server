import { z } from "zod";

export const UserRoleEnum = z.enum(["OWNER", "ADMIN", "USER"]);

export const userValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters").optional(),
        role: UserRoleEnum.default("USER"),
    })
});
