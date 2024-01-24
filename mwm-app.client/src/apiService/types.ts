import { Admin, Book, User } from "@/types/dataType";
import { BookPayload } from "../admin/routes/CreateBook/types";
import internal from "stream";

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

export type UserFavouriteBook = {
    id: string;
    createdAt: string;
    book: Book;
};

export type UserFavouriteRequest = {
    bookID: string;
};

export type ShoppingCartItem = {
    id: string;
    book: Book;
    quantity: number;
    createdAt: string;
};

export type PaginatedResponse<T> = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalPages: number;
    data: T[];
};

export type BookRequest = {
    pageNumber?: number;
    categoryIDs?: string[];
    searchQuery?: string;
}
