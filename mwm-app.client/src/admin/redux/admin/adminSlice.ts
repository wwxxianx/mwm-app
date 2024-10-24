import { adminApi } from "@/apiService/adminApi";
import { createSlice } from "@reduxjs/toolkit";
import { Admin } from "../../../types/dataType";
import { AdminState } from "./types";

const adminInitialState: AdminState = {
    admin: null,
    token: null,
    isLoggedIn: false,
};
function storeAdminProfile(user: Admin, token: string) {
    localStorage.setItem("adminProfile", JSON.stringify(user));
    localStorage.setItem("adminToken", JSON.stringify(token));
}

export const adminSlice = createSlice({
    name: "admin",
    initialState: adminInitialState,
    reducers: {
        adminLogout: (state) => {
            state.isLoggedIn = false;
            state.admin = null;
            state.token = null;
            localStorage.removeItem("admin");
            localStorage.removeItem("adminToken");
        },
        initAdmin: (state, { payload }) => {
            // Check user from localStorage and let user stay singed in
            state.admin = payload.amin;
            state.token = payload.token;
            state.isLoggedIn = true;
            //state.isLoggedIn = true;
            //return;
            //const admin = localStorage.getItem("adminProfile");
            //const token = localStorage.getItem("adminToken");
            //if (!admin) {
            //    return;
            //}
            //const parsedAdmin = JSON.parse(admin);
            //state.admin = parsedAdmin;
            //state.isLoggedIn = true;
            //if (!token) {
            //    // TODO: Reassign token
            //    return;
            //}
            //state.token = token;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            adminApi.endpoints.adminLogin.matchFulfilled,
            (state, { payload }) => {
                state.admin = payload.admin;
                state.token = payload.token;
                state.isLoggedIn = true;
                storeAdminProfile(payload.admin, payload.token);
            }
        );
    },
});

export const { adminLogout, initAdmin } = adminSlice.actions;
const adminReducer = adminSlice.reducer;
export default adminReducer;
