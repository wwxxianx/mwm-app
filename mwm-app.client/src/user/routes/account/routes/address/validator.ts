import { PhoneNumberSchema, UserNameSchema } from "@/types/vaidator";
import { z } from "zod";

export const UserAddressValidator = z.object({
    receiverName: UserNameSchema.min(1, { message: "Name is required" }).max(
        1000,
        { message: "Name can't exceed 1000 characters" }
    ),
    receiverPhoneNumber: PhoneNumberSchema.min(1, {
        message: "Phone number is required",
    }).max(1000, { message: "Phone number can't exceed 1000 characters" }),
    receiverEmail: z.string().optional().nullable(),
    stateRegion: z
        .string()
        .min(1, { message: "State is required" })
        .max(100, { message: "State exceed 100 characters" }),
    postcode: z
        .string()
        .min(1, { message: "Postcode is required" })
        .max(50, { message: "Postcode can't exceed 50 characters" }),
    streetAddress: z
        .string()
        .min(1, { message: "Street address is required" })
        .max(1000, { message: "Street address can't exceed 1000 characters" }),
    addressUnit: z.string().optional().nullable(),
});

export type UserAddressPayload = z.infer<typeof UserAddressValidator> & {
    userID: number;
};
