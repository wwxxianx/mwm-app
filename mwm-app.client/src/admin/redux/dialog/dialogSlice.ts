import { createSlice } from "@reduxjs/toolkit";
import { DialogState } from "./types";

const dialogInitialState: DialogState = {
    isNewCategoryDialogOpen
        : false,
};

export const dialogSlice = createSlice({
    name: "dialog",
    initialState: dialogInitialState,
    reducers: {
        triggerCategoryDialog: (state, { payload }: { payload: boolean }) => {
            state.isNewCategoryDialogOpen = payload;
        },
        
    },
});

export const { triggerCategoryDialog } = dialogSlice.actions;
const adminDialogReducer = dialogSlice.reducer;
export default adminDialogReducer;
