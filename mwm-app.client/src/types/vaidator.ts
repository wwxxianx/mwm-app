import { z } from "zod";

export const PhoneNumberSchema = z
    .string()
    .regex(/^\+?\d+(-\d+)?$/, { message: "Invalid phone number format" });

// export const UserNameSchema = z
//     .string()
//     .regex(/^(?=.*[a-zA-Z])[\w\d]+$/, { message: "Invalid full name format" });

export const UserNameSchema = z.string().regex(/^[\w\d\s\-]+$/, {
    message: "Invalid full name format",
});
