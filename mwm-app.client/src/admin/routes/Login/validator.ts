import { z } from "zod";

export const AdminAuthValidator = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email is required" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(7, { message: "Invalid password" }),
});

export type AdminAuthPayload = z.infer<typeof AdminAuthValidator>;