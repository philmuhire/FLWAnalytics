import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    stages: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewStage = createAsyncThunk('api/stage/add', async (stage) => {
    console.log("within add stage")
    console.log(stage)
    const response = await axios.post("http://localhost:8080/api/stage/add", stage)
    return response.data
})

export const fetchStages = createAsyncThunk('api/stage/all', async () => {
    const response = await axios.get("http://localhost:8080/api/stage/all")
    return response.data
})

export const getOneActivity = createAsyncThunk('api/getOneStage', async (id) => {
    const response = await axios.get("http://localhost:8080/api/stage/" + id)
    return response.data
})

const stageSlice = createSlice({
    name: "stages",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewStage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewStage.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.stages.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewStage.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(fetchStages.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchStages.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.stages = action.payload
            })
            .addCase(fetchStages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

    }
})

export const selectAllStages = (state) => state.stages.stages;
export const getStageStatus = (state) => state.stages.status;
export const getStageError = (state) => state.stages.error;
export const getCurrentStage = (state) => state.stages.current;



// this is for configureStore
export default stageSlice.reducer;