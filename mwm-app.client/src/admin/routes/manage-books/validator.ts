import { z } from "zod";
import { AuthorSchema, CategorySchema } from "../../../types/dataType";

export const AuthorValidator = AuthorSchema.omit({
    id: true,
});

export const CategoryValidator = CategorySchema.omit({
    id: true,
});

export type AuthorPayload = z.infer<typeof AuthorValidator>;
export type CategoryPayload = z.infer<typeof CategoryValidator>;
