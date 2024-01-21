import { z } from "zod";

export const UserRegisterValidator = z
    .object({
        email: z
            .string()
            .min(1, { message: "Email is required" })
            .email({ message: "Invalid email" }),
        password: z
            .string()
            .min(1, { message: "Password is required" })
            .max(30, { message: "Password length can't exceed 30 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"], // This specifies which field the error is associated with
    });

export type UserRegisterPayload = z.infer<typeof UserRegisterValidator>;
