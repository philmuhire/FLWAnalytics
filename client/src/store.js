import { configureStore } from "@reduxjs/toolkit";
import activitySlice from "./services/reducers/activitySlice";
import authSlice from "./services/reducers/authSlice";
import countrySlice from "./services/reducers/countrySlice";
import cropSlice from "./services/reducers/cropSlice";
import stageSlice from "./services/reducers/stageSlice";
import userSlice from "./services/reducers/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: userSlice, 
        crops: cropSlice,
        activities: activitySlice,
        stages: stageSlice,
        country: countrySlice

    }
})