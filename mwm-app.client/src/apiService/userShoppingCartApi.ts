import { api } from "./apiService";
import { ShoppingCartItem } from "./types";

export const userShoppingCartApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // User Favourite
        getUserCartItems: builder.query<ShoppingCartItem[], void>({
            query: () => ({
                url: `ShoppingCarts`,
                method: "GET",
            }),
        }),
        createUserCartItem: builder.mutation<
            ShoppingCartItem,
            { bookID: string }
        >({
            query: (body) => ({
                url: "ShoppingCarts",
                method: "POST",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: newCartItem } = await queryFulfilled;
                    dispatch(
                        userShoppingCartApi.util.updateQueryData(
                            "getUserCartItems",
                            undefined,
                            (draft) => {
                                return [...draft, newCartItem];
                            }
                        )
                    );
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
        updateUserCartItem: builder.mutation<
            ShoppingCartItem,
            { shoppingCartID: string; cartAction: "increment" | "decrement" }
        >({
            query: (body) => ({
                url: `ShoppingCarts/${body.cartAction}`,
                method: "PUT",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedCartItem } = await queryFulfilled;
                    dispatch(
                        userShoppingCartApi.util.updateQueryData(
                            "getUserCartItems",
                            undefined,
                            (draft) => {
                                return draft?.map((cartItem) => {
                                    if (cartItem.id === updatedCartItem.id) {
                                        return updatedCartItem;
                                    }
                                    return cartItem;
                                });
                            }
                        )
                    );
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
        deleteUserCartItem: builder.mutation<any, { shoppingCartID: string }>({
            query: (body) => ({
                url: "ShoppingCarts",
                method: "DELETE",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    if (res.meta?.response?.status === 204) {
                        // Delete success
                        dispatch(
                            userShoppingCartApi.util.updateQueryData(
                                "getUserCartItems",
                                undefined,
                                (draft) => {
                                    return draft?.filter(
                                        (cartItem) =>
                                            cartItem.id !==
                                            requestBody.shoppingCartID
                                    );
                                }
                            )
                        );
                    }
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
        // deleteUserFavourite: builder.mutation<
        //     UserFavouriteBook[],
        //     UserFavouriteRequest
        // >({
        //     query: (bookId) => ({
        //         url: "UserFavouriteBooks",
        //         method: "DELETE",
        //         body: bookId,
        //     }),
        //     async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data: updatedFavourites } = await queryFulfilled;
        //             console.log("delete response from BE", updatedFavourites);
        //             dispatch(
        //                 userFavouriteBookApi.util.updateQueryData(
        //                     "getUserFavourites",
        //                     undefined,
        //                     (draft) => {
        //                         return draft.filter(
        //                             (b) => b.book.id !== requestBody.bookID
        //                         );
        //                     }
        //                 )
        //             );
        //         } catch (err) {
        //             console.log("Update cached user favourites failed", err);
        //         }
        //     },
        // }),
    }),
});

export const {
    useGetUserCartItemsQuery,
    useCreateUserCartItemMutation,
    useUpdateUserCartItemMutation,
    useDeleteUserCartItemMutation,
} = userShoppingCartApi;
