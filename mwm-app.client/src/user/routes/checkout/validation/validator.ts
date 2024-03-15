import { z } from "zod";

export const OrderAddressValidator = z.object({
    receiverName: z
        .string()
        .min(1, { message: "Receiver name is required" })
        .max(30, { message: "Receiver name can't exceed 30 characters" }),
    receiverEmail: z.string().optional().nullable(),
    receiverPhoneNumber: z
        .string()
        .min(1, { message: "Receiver phone number is required" }),
    stateRegion: z.string().min(1, { message: "State region is required" }),
    postcode: z.string().min(1, { message: "Postcode is required" }),
    streetAddress: z.string().min(1, { message: "Street address is required" }),
    addressUnit: z.string().optional().nullable(),
});

export type OrderAddressPayload = z.infer<typeof OrderAddressValidator>;

export const PaymentValidator = z.object({
    holder: z.string().min(1, { message: "Card holder name is required" }),
    expiryDate: z.string().min(1, { message: "Card expiry date is required" }),
    cardNumber: z.string().min(1, { message: "Card number is required" }),
    cvc: z.string().min(1, { message: "Card CVC name is required" }),
});

export type PaymentPayload = z.infer<typeof PaymentValidator>;