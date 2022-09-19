import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { validToken } from "../../utils/utils";

const initialState = {
    activities: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

const config = {
    headers: { Authorization: `Bearer ${validToken()}` }
};

export const addNewProcess = createAsyncThunk('api/activity/add', async (process, { rejectWithValue }) => {
    console.log("within add process")
    console.log(process)
    let response;
    try {
        response = await axios.post("http://localhost:8080/api/activity/add", process, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const editProcess = createAsyncThunk('api/activity/edit', async (process, { rejectWithValue }) => {
    console.log("within edit process")
    console.log(process)
    let response;
    try {
        response = await axios.put("http://localhost:8080/api/activity/edit", process, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchactivities = createAsyncThunk('api/activity/all', async () => {
    const response = await axios.get("http://localhost:8080/api/activity/all", config)
    return response.data
})

export const getOneActivity = createAsyncThunk('api/getOneActivity', async (id) => {
    const response = await axios.get("http://localhost:8080/api/activity/" + id, config)
    return response.data
})

const activitySlice = createSlice({
    name: "activities",
    initialState,
    reducers: {
        setCurrentProcess: (state, action)=>{
            console.log("setting current")
            state.current = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewProcess.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewProcess.fulfilled, (state, action) => {
                state.status = "succeeded-addprocess"
                // console.log("in success add process")
                // console.log(action.payload)
                // state.activities.push(action.payload)
                // state.current = action.payload
            })
            .addCase(addNewProcess.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(editProcess.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editProcess.fulfilled, (state, action) => {
                state.status = "succeeded-editprocess"
                console.log("edit succeess")
            })
            .addCase(editProcess.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.message
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

export const {setCurrentProcess} = activitySlice.actions;



// this is for configureStore
export default activitySlice.reducer;