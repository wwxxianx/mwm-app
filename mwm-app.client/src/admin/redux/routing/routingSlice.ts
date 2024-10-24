import { createSlice } from "@reduxjs/toolkit";

type RoutingState = {
    shouldRevalidateManageBooks: boolean;
}

const routingInitialState: RoutingState = {
    shouldRevalidateManageBooks
        : false,
};

export const routingSlice = createSlice({
    name: "dialog",
    initialState: routingInitialState,
    reducers: {
        triggerShouldRevalidateManageBooks: (state, { payload }: { payload: boolean }) => {
            state.shouldRevalidateManageBooks = payload;
        },
        
    },
});

export const { triggerShouldRevalidateManageBooks } = routingSlice.actions;
const routingReducer = routingSlice.reducer;
export default routingReducer;
