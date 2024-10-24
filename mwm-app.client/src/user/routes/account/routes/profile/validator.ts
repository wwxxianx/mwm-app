import { PhoneNumberSchema, UserNameSchema } from "@/types/vaidator";
import { z } from "zod";

export const UserProfileValidator = z.object({
    fullName: UserNameSchema.min(1, { message: "Fullname is required" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email" }),
    phoneNumber: PhoneNumberSchema.optional().nullable(),
    birthDate: z
        .union([
            z.string().optional().nullable(),
            z.instanceof(Date).optional().nullable(),
        ])
        .optional(),
    profileImageUrl: z.string().optional().nullable(),
    gender: z.string().optional().nullable(),
});

export type UserProfilePayload = z.infer<typeof UserProfileValidator> & {
    userID: number;
};
