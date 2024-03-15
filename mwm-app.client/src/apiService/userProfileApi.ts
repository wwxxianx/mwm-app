import { User, UserAddress } from "@/types/dataType";
import { UserProfilePayload } from "@/user/routes/account/routes/profile/UserProfile";
import { api } from "./bookApi";
import { UserAddressPayload } from "@/user/routes/account/routes/address/components/NewAddressDialog";

export const userProfileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // login: builder.mutation<UserResponse, UserAuthPayload>({
        //     query: (credentials) => ({
        //         url: "Users/login",
        //         method: "POST",
        //         body: credentials,
        //     }),
        // }),
        // register: builder.mutation<UserResponse, UserAuthPayload>({
        //     query: (credentials) => ({
        //         url: "Users/register",
        //         method: "POST",
        //         body: credentials,
        //     }),
        // }),
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
    }),
    overrideExisting: false,
});

export const {
    useGetUserAddressesQuery,
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useCreateUserAdressMutation,
    useUpdateDefaulUserAddressMutation,
} = userProfileApi;
