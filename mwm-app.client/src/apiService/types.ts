import { Admin, Book, User } from "@/types/dataType";
import { BookPayload } from "../admin/routes/CreateBook/types";

export type UserResponse = {
    user: User;
    token: string;
};

export type AdminResponse = {
    admin: Admin;
    token: string;
};

export type BookAPIPayload = BookPayload & {
    authorId: string;
    categoryId: string;
};

export type UserFavouriteResponse = {
    book: Book[];
    createdAt: string;
};

export type UserFavouriteRequest = {
    userId: string;
    bookId: string;
};
