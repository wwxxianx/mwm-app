import { api } from "@/apiService/apiService";
import { userAuthApi } from "@/apiService/userAuthApi";
import { User } from "@/types/dataType";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
    user: User | null;
    token: string | null;
    isLoggedIn: boolean;
};

const userInitialState: UserState = {
    user: null,
    token: null,
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
            localStorage.removeItem("userToken");
            localStorage.removeItem("userProfile");
        },
        initUser: (state) => {
            // Check user from localStorage and let user stay singed in
            const user = localStorage.getItem("userProfile");
            const token = localStorage.getItem("userToken");
            if (!user) {
                return;
            }
            const parsedUser = JSON.parse(user);
            state.user = parsedUser;
            state.isLoggedIn = true;
            if (!token) {
                // TODO: Reassign token
                console.log("no token");
                return;
            }
            state.token = JSON.parse(token);
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userAuthApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.user;
                state.token = payload.token;
                state.isLoggedIn = true;
                storeUserProfile(payload.user, payload.token);
            }
        );
        builder.addMatcher(
            userAuthApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                state.isLoggedIn = true;
                storeUserProfile(payload.user, payload.token);
            }
        );
    },
});

function storeUserProfile(user: User, token: string) {
    localStorage.setItem("userProfile", JSON.stringify(user));
    localStorage.setItem("userToken", JSON.stringify(token));
}

export const { logout, initUser } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
