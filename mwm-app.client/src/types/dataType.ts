import { z } from "zod";

export const AuthorSchema = z.object({
    id: z.string(),
    fullName: z
        .string()
        .min(1, { message: "Category is required" })
        .max(100, { message: "Author name can't exceed 100 characters" }),
    imageUrl: z
        .string()
        .min(1, { message: "Author profile image is required" }),
});

export const UserSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    phoneNumber: z.string().optional().nullable(),
    email: z.string(),
    profileImageUrl: z.string().optional().nullable(),
    gender: z.string().optional().nullable(),
    password: z.string(),
    birthDate: z.string().optional().nullable(),
});

// export const CartItemSchema = z.object({
//     book: BookSchema,
//     quantity: z.number().nonnegative({ message: "Invalid quantity" }),
// });

// export const CartSchema = z.object({
//     items: z.array(CartItemSchema),

// })

export const AdminSchema = z.object({
    id: z.string(),
    fullName: z
        .string()
        .min(1, { message: "Admin name is required" })
        .max(30, { message: "Admin name can't exceed 30 characters" }),
    email: z
        .string()
        .min(1, { message: "Admin email is required" })
        .email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Admin password is required" }),
});

export const CategorySchema = z.object({
    id: z.string(),
    category: z
        .string()
        .min(1, { message: "Category is required" })
        .max(50, { message: "Category length can't exceed 50 characters" }),
    isTrending: z.boolean().optional(),
});

export const BookSchema = z.object({
    id: z.string(),
    title: z
        .string()
        .min(1, { message: "Book title is required" })
        .max(100, { message: "Book title can't exceed 30 characters" }),
    slug: z
        .string()
        .min(1, { message: "Slug is required" })
        .max(50, { message: "Slug can't exceed 50 characters" }),
    imageUrl: z.string().min(1, { message: "Cover image is required" }),
    previewUrl: z.string().optional().nullable(),
    category: CategorySchema,
    author: AuthorSchema,
    price: z.number().nonnegative({ message: "Invalid price" }),
    series: z.string().optional().nullable(),
    description: z
        .string()
        .min(1, { message: "Book description is required" })
        .max(1000, { message: "Book title can't exceed 1000 characters" }),
    sku: z.number().nonnegative({ message: "Invalid SKU" }),
    publishedAt: z.string().optional().nullable(),
    createdAt: z.string().optional().nullable(),
    updatedAt: z.string().optional().nullable(),
});

export const OrderStatusEnum = z.enum([
    "Pending",
    "Processing",
    "Delivery",
    "Completed",
    "Cancelled",
    "Refund",
]);

export const OrderItemSchema = z.object({
    book: z.object({
        ...BookSchema.shape,
        category: CategorySchema.nullable(),
        author: AuthorSchema.nullable(),
    }),
    quantity: z.number().nonnegative({ message: "Invalid quantity" }),
});

export const OrderSchema = z.object({
    id: z.string(),
    status: OrderStatusEnum,
    user: UserSchema,
    price: z.number(),
    receiverName: z.string(),
    receiverPhoneNumber: z.string(),
    receiverEmail: z.string(),
    stateRegion: z.string(),
    postcode: z.string(),
    streetAddress: z.string(),
    addressUnit: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    items: z.array(OrderItemSchema).optional(),
});

export const UserAddressSchema = z.object({
    id: z.string(),
    receiverName: z.string(),
    receiverPhoneNumber: z.string(),
    receiverEmail: z.string().optional().nullable(),
    stateRegion: z.string(),
    postcode: z.string(),
    streetAddress: z.string(),
    addressUnit: z.string().optional().nullable(),
    isDefault: z.boolean(),
});

export type Book = z.infer<typeof BookSchema>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type User = z.infer<typeof UserSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Admin = z.infer<typeof AdminSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type UserAddress = z.infer<typeof UserAddressSchema>;
