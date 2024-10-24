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

export const OAuthValidator = z.object({
    uid: z.string().min(1, { message: "UID is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" }),
    profileImageUrl: z.string().optional().nullable(),
    fullName: z.string().optional().nullable(),
});

export type UserAuthPayload = z.infer<typeof UserAuthValidator>;
export type OAuthPayload = z.infer<typeof OAuthValidator>;
