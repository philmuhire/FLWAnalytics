import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    activities: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewActivity = createAsyncThunk('api/activity/add', async (activity) => {
    console.log("within add activity")
    console.log(activity)
    const response = await axios.post("http://localhost:8080/api/activity/add", activity)
    return response.data
})

export const fetchactivities = createAsyncThunk('api/activity/all', async () => {
    const response = await axios.get("http://localhost:8080/api/activity/all")
    return response.data
})

export const getOneActivity = createAsyncThunk('api/getOneActivity', async (id) => {
    const response = await axios.get("http://localhost:8080/api/activity/" + id)
    return response.data
})

const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewActivity.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewActivity.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.activities.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewActivity.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(fetchactivities.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchactivities.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.activities = action.payload
            })
            .addCase(fetchactivities.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })
       
    }
})

export const selectAllActivities = (state) => state.activities.activities;
export const getActStatus = (state) => state.activities.status;
export const getActError = (state) => state.activities.error;
export const getCurrentAct = (state) => state.activities.current;



// this is for configureStore
export default activitySlice.reducer;