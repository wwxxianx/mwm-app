import { UserAuthPayload } from "@/user/routes/login/types";
import { api } from "./apiService";
import { UserResponse } from "./types";

export const userAuthApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Users/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation<UserResponse, UserAuthPayload>({
            query: (credentials) => ({
                url: "Users/register",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation } = userAuthApi;
