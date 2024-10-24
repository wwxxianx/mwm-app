import { z } from "zod";

export const BookValidator = z.object({
    title: z
        .string()
        .min(1, { message: "Book title is required" })
        .max(100, { message: "Book title can't exceed 30 characters" }),
    slug: z
        .string()
        .min(1, { message: "Slug is required" })
        .max(50, { message: "Slug can't exceed 50 characters" }),
    imageUrl: z.string().min(1, { message: "Cover image is required" }),
    previewUrl: z.string().optional(),
    category: z.string().min(1, { message: "Book category is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    price: z.number().nonnegative({ message: "Invalid price" }),
    description: z
        .string()
        .min(1, { message: "Book description is required" })
        .max(1000, { message: "Book title can't exceed 1000 characters" }),
    sku: z.number().nonnegative({ message: "Invalid SKU" }),
});

export type BookPayload = z.infer<typeof BookValidator>;