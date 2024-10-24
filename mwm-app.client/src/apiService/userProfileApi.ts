import { User, UserAddress } from "@/types/dataType";
import { api } from "./bookApi";
import { UserProfilePayload } from "@/user/routes/account/routes/profile/validator";
import { UserAddressPayload } from "@/user/routes/account/routes/address/validator";

export const userProfileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query<User, number>({
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
        getUserAddresses: builder.query<UserAddress[], void>({
            query: () => `UserAddresses`,
        }),
        createUserAdress: builder.mutation<UserAddress, UserAddressPayload>({
            query: (userAddress) => ({
                url: `UserAddresses`,
                method: "POST",
                body: userAddress,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const { data: createdAddress } = await queryFulfilled;

                dispatch(
                    userProfileApi.util.updateQueryData(
                        "getUserAddresses",
                        undefined,
                        (draft) => {
                            return [createdAddress, ...draft];
                        }
                    )
                );
            },
        }),
        updateDefaulUserAddress: builder.mutation<UserAddress, string>({
            query: (userAddressID) => ({
                url: `UserAddresses/default`,
                method: "PUT",
                body: { userAddressID },
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const { data: updatedDefaultAddress } = await queryFulfilled;
                dispatch(
                    userProfileApi.util.updateQueryData(
                        "getUserAddresses",
                        undefined,
                        (draft) => {
                            return draft.map((address) => {
                                if (address.isDefault) {
                                    return { ...address, isDefault: false };
                                }
                                if (address.id === updatedDefaultAddress.id) {
                                    return updatedDefaultAddress;
                                }
                                return address;
                            });
                        }
                    )
                );
            },
        }),
        updateUserAddress: builder.mutation<UserAddress, UserAddressPayload>({
            query: (body) => ({
                url: `UserAddresses/${body.id}`,
                method: "PUT",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const { data: updatedAddress } = await queryFulfilled;
                dispatch(
                    userProfileApi.util.updateQueryData(
                        "getUserAddresses",
                        undefined,
                        (draft) => {
                            return draft.map((address) => {
                                if (address.id === updatedAddress.id) {
                                    return updatedAddress;
                                }
                                return address;
                            });
                        }
                    )
                );
            },
        }),
        deleteUserAddress: builder.mutation<void, string>({
            query: (addressID) => ({
                url: `UserAddresses/${addressID}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(
                    userProfileApi.util.updateQueryData(
                        "getUserAddresses",
                        undefined,
                        (draft) => {
                            return draft.filter(
                                (address) => address.id !== requestBody
                            );
                        }
                    )
                );
            },
        }),
        deleteUserAccount: builder.mutation<void, number>({
            query: (userID) => ({
                url: `Users/${userID}`,
                method: "DELETE",
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(
                    api.util.updateQueryData(
                        "getAllUsers",
                        undefined,
                        (draft) => {
                            return draft.filter(
                                (user) => user.id !== requestBody
                            );
                        }
                    )
                );
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetUserAddressesQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useCreateUserAdressMutation,
    useUpdateDefaulUserAddressMutation,
    useUpdateUserAddressMutation,
    useDeleteUserAccountMutation,
    useDeleteUserAddressMutation,
} = userProfileApi;
