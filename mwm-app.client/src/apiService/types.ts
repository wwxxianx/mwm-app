import { Admin, User } from "@/types/dataType";
import { BookPayload } from "../admin/routes/CreateBook/types";

export type UserResponse = {
    user: User;
    token: string;
};

export type AdminResponse = {
    admin: Admin;
    token: string;
}

export type BookAPIPayload = BookPayload & {
    authorId: string;
    categoryId: string;
}