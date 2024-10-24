import { OAuthPayload, UserAuthPayload } from "@/user/routes/login/validator";
import { api } from "./bookApi";
import { UserResponse } from "./types";
import bcrypt from "bcryptjs";

function hashPassword(password: string): string {
    const saltRounds = 10;
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
}

export const userAuthApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => {
                // const hashedPassword = hashPassword(credentials.password);
                return {
                    url: "Users/login",
                    method: "POST",
                    body: { ...credentials },
                };
            },
        }),
        register: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => {
                // const hashedPassword = hashPassword(credentials.password);
                return {
                    url: "Users/register",
                    method: "POST",
                    body: { ...credentials },
                };
            },
        }),
        googleLogin: builder.mutation<UserResponse, OAuthPayload>({
            query: (credentials) => ({
                url: "Users/googleLogin",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation } =
    userAuthApi;
