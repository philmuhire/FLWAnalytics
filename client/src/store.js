import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./services/reducers/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})