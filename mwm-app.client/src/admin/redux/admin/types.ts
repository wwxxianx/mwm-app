import { Admin } from "../../../types/dataType";

export type AdminAuth = {
    email: string;
    password: string;
};

export type AdminState = {
    isLoggedIn: boolean;
    admin?: Admin | null;
    token: string | null;
};
