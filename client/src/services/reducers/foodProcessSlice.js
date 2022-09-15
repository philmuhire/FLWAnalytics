import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/constants";
import {validToken} from "../../utils/utils";

const initialState = {
    foodProcesses: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

const config = {
    headers: { Authorization: `Bearer ${validToken()}` }
};

export const addNewFoodProcess = createAsyncThunk('api/cropactivityadd', async (data) => {
    console.log("within add food process")
    console.log(data)
    const response = await axios.post("http://localhost:8080/api/cropactivity/add", data, config)
    return response.data
})

export const fetchNProcesses = createAsyncThunk('api/cropactivity/findsome', async (data) => {
    console.log("within add food process")
    console.log(data)
    const response = await axios.post("http://localhost:8080/api/cropactivity/findprocesses", data, config)
    return response.data
})


const foodProcessSlice = createSlice({
    name: 'foodProcess',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            //all crops

            .addCase(addNewFoodProcess.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewFoodProcess.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.foodProcesses.push(action.payload);
            })
            .addCase(addNewFoodProcess.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            .addCase(fetchNProcesses.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNProcesses.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.foodProcesses = action.payload
            })
            .addCase(fetchNProcesses.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

    }

})

export const getAllFP = (state) => state.foodprocess.foodProcesses;
export const getFPStatus = (state) => state.foodprocess.status;
export const getFPError = (state) => state.foodprocess.error;
export const getCurrentFP = (state) => state.foodprocess.current;

export default foodProcessSlice.reducer;