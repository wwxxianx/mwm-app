import { createSlice } from "@reduxjs/toolkit";

type BookState = {
    selectedCategories: string[];
};

const bookInitialState: BookState = {
    selectedCategories: [],
};

export const bookSlice = createSlice({
    name: "book",
    initialState: bookInitialState,
    reducers: {
        updateSelectedCategories: (
            state,
            {
                payload: { categoryID, isFromNav = false },
            }: { payload: { categoryID: string; isFromNav?: boolean } }
        ) => {
            if (state.selectedCategories.includes(categoryID)) {
                if (isFromNav) {
                    return;
                }
                console.log("remove", categoryID);
                state.selectedCategories = state.selectedCategories.filter(id => id !== categoryID);
            } else {
                console.log("add", categoryID);
                state.selectedCategories.push(categoryID);
            }
        },
    },
});

export const { updateSelectedCategories } = bookSlice.actions;
const bookReducer = bookSlice.reducer;
export default bookReducer;
