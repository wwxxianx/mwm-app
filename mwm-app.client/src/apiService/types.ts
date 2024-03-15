import { Admin, Author, Book, OrderStatus, User } from "@/types/dataType";
import { BookPayload } from "../admin/routes/CreateBook/types";
import { OrderAddressPayload } from "@/user/routes/checkout/validator";

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

export type UpdateBookAPIPayload = BookAPIPayload & {
    id: string;
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
};

export type AuthorWithBooks = Author & {
    books: Book[];
};

export type CreateOrderPayload = OrderAddressPayload & {
    items: { cartID: string; bookID: string; quantity: number }[];
    price: number;
};

export type UpdateOrderPayload = {
    receiverName?: string;
    receiverEmail?: string;
    receiverPhoneNumber?: string;
    stateRegion?: string;
    postcode?: string;
    streetAddress?: string;
    addressUnit?: string;
    orderID: string;
    status: OrderStatus;
};

export type BookReview = {
    id: string;
    reviewTitle: string;
    reviewDescription: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    user: User;
    book?: Book;
};

export type CreateBookReviewPayload = {
    reviewTitle: string;
    reviewDescription: string;
    rating: number;
    bookID: string;
};