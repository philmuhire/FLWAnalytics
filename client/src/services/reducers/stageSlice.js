import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { validToken } from "../../utils/utils";

const initialState = {
    stages: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null,
}


const config = {
    headers: { Authorization: `Bearer ${validToken()}` }
};

export const addNewStage = createAsyncThunk('api/stage/add', async (stage, { rejectWithValue }) => {
    console.log("within add stage")
    console.log(stage)
    let response;
    try {
        response = await axios.post("http://localhost:8080/api/stage/add", stage, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const editStage = createAsyncThunk('api/stage/edit', async (stage, { rejectWithValue }) => {
    console.log("within edit stage")
    console.log(stage)
    let response;
    try {
        response = await axios.put("http://localhost:8080/api/stage/edit", stage, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const fetchStages = createAsyncThunk('api/stage/all', async () => {
    const response = await axios.get("http://localhost:8080/api/stage/all", config)
    return response.data
})

export const getOneActivity = createAsyncThunk('api/getOneStage', async (id) => {
    const response = await axios.get("http://localhost:8080/api/stage/" + id, config)
    return response.data
})

const stageSlice = createSlice({
    name: "stages",
    initialState,
    reducers: {
        setCurrentStage: (state, action)=>{
            console.log("setting current")
            state.current = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewStage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewStage.fulfilled, (state, action) => {
                state.status = "succeeded-addstage"
                state.stages.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewStage.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(editStage.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editStage.fulfilled, (state, action) => {
                state.status = "succeeded-editstage"
                console.log("edit succeess")
                state.current = action.payload
            })
            .addCase(editStage.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.message
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

export const {setCurrentStage} = stageSlice.actions;



// this is for configureStore
export default stageSlice.reducer;