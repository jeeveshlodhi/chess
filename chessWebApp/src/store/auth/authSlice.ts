import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface userInterface {
    accessToken: string | null;
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    name: string | null;
    dob: string | null;
    gender: string | null;
    email: string | null;
};

export interface authState {
    token: string | null,
    isLoggedIn: boolean
    user: userInterface
}

const userInitialValue = {
    accessToken: null,
    id: null,
    firstName: null,
    lastName: null,
    name: null,
    dob: null,
    gender: null,
    email: null,
}

const initialState: authState = {
    token: null,
    isLoggedIn: false,
    user: userInitialValue
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
            state.isLoggedIn = true;
        },
        setUser: (state, action: PayloadAction<userInterface>) => {
            state.user = { ...action.payload }
        },
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
            state.user = userInitialValue
        },

    }
})

export const { setToken, setUser, logout } = authSlice.actions

export const selectToken = (state: RootState) => state.auth.token
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectUser = (state: RootState) => state.auth.user

export default authSlice.reducer