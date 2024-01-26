import { Order } from "@/types/dataType";
import { api } from "./apiService";
import {
    CreateOrderPayload,
    UpdateOrderPayload
} from "./types";

export const userOrderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserOrders: builder.query<Order[], void>({
            query: () => ({
                url: `UserOrders`,
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
                    const { data: newOrder } = await queryFulfilled;
                    dispatch(
                        userOrderApi.util.updateQueryData(
                            "getUserOrders",
                            undefined,
                            (draft) => {
                                return [newOrder, ...draft];
                            }
                        )
                    );
                } catch (err) {
                    console.log("Update cached user favourites failed", err);
                }
            },
        }),
        updateUserOrder: builder.mutation<Order, UpdateOrderPayload>({
            query: (body) => ({
                url: `UserOrders`,
                method: "PUT",
                body: body,
            }),
            async onQueryStarted(requestBody, { dispatch, queryFulfilled }) {
                try {
                    const { data: updatedOrder } = await queryFulfilled;
                    dispatch(
                        userOrderApi.util.updateQueryData(
                            "getUserOrders",
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
} = userOrderApi;
