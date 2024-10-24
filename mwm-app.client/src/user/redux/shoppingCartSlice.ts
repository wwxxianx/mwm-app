import { ShoppingCartItem } from "@/apiService/types";
import { createSlice } from "@reduxjs/toolkit";

type ShoppingCartState = {
    selectedCartItems: ShoppingCartItem[];
};

const shoppingCartInitialState: ShoppingCartState = {
    selectedCartItems: [],
};

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: shoppingCartInitialState,
    reducers: {
        updateSelectedCartItemsFromLocalStorage: (state) => {
            const items = localStorage.getItem("selectedCheckoutItems");
            if (items != null) {
                state.selectedCartItems = JSON.parse(items);
            }
        },
        updateSelectedCartItems: (
            state,
            { payload }: { payload: ShoppingCartItem }
        ) => {
            let isCartItemExisted = state.selectedCartItems.filter((i) => {
                return i.id === payload.id;
            })?.length;

            if (isCartItemExisted) {
                state.selectedCartItems = state.selectedCartItems.filter(
                    (i) => i.id !== payload.id
                );
            } else {
                state.selectedCartItems.push(payload);
            }
            localStorage.setItem(
                "selectedCheckoutItems",
                JSON.stringify(state.selectedCartItems)
            );
        },
        clearSelectedCartItems: (state) => {
            state.selectedCartItems = [];
            localStorage.removeItem("selectedCheckoutItems");
        },
    },
});

export const {
    updateSelectedCartItems,
    clearSelectedCartItems,
    updateSelectedCartItemsFromLocalStorage,
} = shoppingCartSlice.actions;
const shoppingCartReducer = shoppingCartSlice.reducer;
export default shoppingCartReducer;
