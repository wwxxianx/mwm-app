import { Order } from "@/types/dataType";
import { api } from "./apiService";
import { CreateOrderPayload, UpdateOrderPayload } from "./types";
import { userShoppingCartApi } from "./userShoppingCartApi";

export const userOrderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsersOrders: builder.query<Order[], void>({
            query: () => "UserOrders/all",
        }),
        getUserOrders: builder.query<Order[], void>({
            query: () => ({
                url: `UserOrders`,
                method: "GET",
            }),
        }),
        getUserOrderByID: builder.query<Order, string>({
            query: (orderID) => ({
                url: `UserOrders/${orderID}`,
                method: "GET",
            }),
        }),
        createUserOrder: builder.mutation<Order, CreateOrderPayload>({
            query: (body) => ({
                url: "UserOrders",
                method: "POST",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    if (res.meta?.response?.status === 200) {
                        // Remove checkoutItems from cart
                        dispatch(
                            userShoppingCartApi.util.updateQueryData(
                                "getUserCartItems",
                                undefined,
                                (draft) => {
                                    const checkoutCartItemsID =
                                        requestBody.items.map(
                                            (item) => item.cartID
                                        );
                                    return draft?.filter(
                                        (item) =>
                                            !checkoutCartItemsID.includes(
                                                item.id
                                            )
                                    );
                                }
                            )
                        );
                        dispatch(
                            userOrderApi.util.updateQueryData(
                                "getUserOrders",
                                undefined,
                                (draft) => {
                                    return [res.data, ...draft];
                                }
                            )
                        );
                    }
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
        updateUserOrder: builder.mutation<Order, UpdateOrderPayload>({
            query: (body) => ({
                url: `UserOrders/${body.orderID}`,
                method: "PUT",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedOrder } = await queryFulfilled;
                    // Update admin orders table data
                    dispatch(
                        userOrderApi.util.updateQueryData(
                            "getAllUsersOrders",
                            undefined,
                            (draft) => {
                                return draft?.map((order) => {
                                    if (order.id === updatedOrder.id) {
                                        return updatedOrder;
                                    }
                                    return order;
                                });
                            }
                        )
                    );
                    // Update admin Edit Order details page
                    dispatch(
                        userOrderApi.util.updateQueryData(
                            "getUserOrderByID",
                            requestBody.orderID,
                            (draft) => {
                                return updatedOrder;
                            }
                        )
                    );

                    // Update user order page data
                    dispatch(
                        userOrderApi.util.updateQueryData(
                            "getUserOrders",
                            undefined,
                            (draft) => {
                                return draft?.map((order) => {
                                    if (order.id == requestBody.orderID) {
                                        return updatedOrder;
                                    }
                                    return order;
                                });
                            }
                        )
                    );
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
    }),
});

export const {
    useGetUserOrdersQuery,
    useCreateUserOrderMutation,
    useUpdateUserOrderMutation,
    useGetAllUsersOrdersQuery,
    useGetUserOrderByIDQuery,
} = userOrderApi;
