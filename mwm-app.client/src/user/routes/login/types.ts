import { z } from "zod";

export const UserAuthValidator = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" }),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .max(30, { message: "Password length can't exceed 30 characters" }),
});

export type UserAuthPayload = z.infer<typeof UserAuthValidator>;
