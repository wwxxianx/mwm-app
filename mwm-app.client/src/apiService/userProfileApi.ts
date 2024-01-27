import { UserAuthPayload } from "@/user/routes/login/types";
import { api } from "./apiService";
import { UserResponse } from "./types";
import { User } from "@/types/dataType";
import { UserProfilePayload } from "@/user/routes/account/routes/profile/UserProfile";

export const userProfileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, string>({
            query: (userID) => `Users/${userID}`,
        }),
        updateUserProfile: builder.mutation<User, UserProfilePayload>({
            query: (user) => ({
                url: `Users/${user.userID}`,
                method: "PUT",
                body: user,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const { data: updatedProfile } = await queryFulfilled;
                dispatch(
                    userProfileApi.util.updateQueryData(
                        "getUserProfile",
                        requestBody.userID,
                        (draft) => {
                            Object.assign(draft, updatedProfile);
                        }
                    )
                );
            },
        }),
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

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
    userProfileApi;
