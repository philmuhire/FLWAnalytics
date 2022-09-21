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
    const response = await axios.post(BASE_URL+"/api/cropactivity/add", data, config)
    return response.data
})

export const fetchNProcesses = createAsyncThunk('api/cropactivity/findsome', async (data) => {
    console.log("within add food process")
    console.log(data)
    const response = await axios.post(BASE_URL+"/api/cropactivity/findprocesses", data, config)
    return response.data
})
export const fetchNProduce = createAsyncThunk('api/cropactivity/findproduce', async () => {
    console.log("within find food produce")
    const response = await axios.get(BASE_URL+"/api/cropactivity/findproduce", config)
    return response.data
})

export const fetchNProducePerCrop = createAsyncThunk('api/cropactivity/findproducepercrop', async (data) => {
    console.log("within find food produce per crop")
    const response = await axios.get(BASE_URL+"/api/cropactivity/findproduce/"+data, config)
    return response.data
})

export const fetchlossperprocess = createAsyncThunk('api/cropactivity/loss', async (data) => {
    console.log("within find food produce per crop")
    const response = await axios.get(BASE_URL+"/api/cropactivity/findloss/"+data, config)
    return response.data
})

export const deleteFoodProcess = createAsyncThunk('api/cropactivity/deletefp', async (id) => {
    console.log("within find food produce")
    console.log(id);
    const response = await axios.delete(BASE_URL+"/api/cropactivity/"+id, config)
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
                state.status = "succeeded-addfp"
                console.log("fp added successfully")
                
            })
            .addCase(addNewFoodProcess.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            .addCase(deleteFoodProcess.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(deleteFoodProcess.fulfilled, (state, action) => {
                state.status = "'deleted'"
            })
            .addCase(deleteFoodProcess.rejected, (state, action) => {
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

            .addCase(fetchNProduce.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNProduce.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.foodProcesses = action.payload
            })
            .addCase(fetchNProduce.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            .addCase(fetchlossperprocess.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchlossperprocess.fulfilled, (state, action) => {
                state.status = "succeeded-fetchloss"
                state.foodProcesses = action.payload
            })
            .addCase(fetchlossperprocess.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            .addCase(fetchNProducePerCrop.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchNProducePerCrop.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.foodProcesses = action.payload
            })
            .addCase(fetchNProducePerCrop.rejected, (state, action) => {
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