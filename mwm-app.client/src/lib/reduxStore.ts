import adminReducer from "@/admin/redux/admin/adminSlice";
import { api } from "@/apiService/apiService";
import userReducer from "@/user/redux/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import adminDialogReducer from "../admin/redux/dialog/dialogSlice";
import routingReducer from "@/admin/redux/routing/routingSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        admin: adminReducer,
        user: userReducer,
        adminDialog: adminDialogReducer,
        routing: routingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
