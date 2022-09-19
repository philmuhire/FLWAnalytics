import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/constants";
import { validToken } from "../../utils/utils";

const initialState = {
    allCrops: [],
    cropPerActivity: [],
    cropPerYear: [],
    current: {},
    first: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

const config = {
    headers: { Authorization: `Bearer ${validToken()}` }
};

export const addNewCrop = createAsyncThunk('api/crop/add', async (crop, { rejectWithValue }) => {
    console.log("within add crop")
    console.log(crop)
    let response;
    try {
        response = await axios.post("http://localhost:8080/api/crop/add", crop, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const editCrop = createAsyncThunk('api/crop/edit', async (crop, { rejectWithValue }) => {
    console.log("within add crop")
    console.log(crop)
    let response;
    try {
        response = await axios.put("http://localhost:8080/api/crop/edit", crop, config)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const fetchAllCrops = createAsyncThunk('api/crop/all', async () => {
    const response = await axios.get("http://localhost:8080/api/crop/all", config)
    return response.data
})

export const fetchCropPerActivity = createAsyncThunk('api/crop/singleByAct/', async (id) => {
    const response = await axios.get("http://localhost:8080/api/crop/singleByAct/" + id, config)
    return response.data
})
export const fetchCropPerYear = createAsyncThunk('api/crop/singleByYear/', async (id) => {
    const response = await axios.get("http://localhost:8080/api/crop/singleByYear/" + id, config)
    return response.data
})

export const fetchFirst = createAsyncThunk('api/crop/one', async () => {
    const response = await axios.get("http://localhost:8080/api/crop/one", config)
    return response.data
})

const cropSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {
        setCurrent: (state, action)=>{
            console.log("setting current")
            state.current = action.payload
        }
    },
    extraReducers(builder) {
        builder

            .addCase(addNewCrop.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewCrop.fulfilled, (state, action) => {
                state.status = "succeeded-addcrop"
                state.allCrops.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewCrop.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.message
                console.log(state.error)

            })

            .addCase(editCrop.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(editCrop.fulfilled, (state, action) => {
                state.status = "succeeded-editcrop"
                console.log("edit succeess")
                state.current = action.payload
            })
            .addCase(editCrop.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload.message
                console.log(state.error)

            })

            //all crops

            .addCase(fetchAllCrops.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllCrops.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.allCrops = action.payload
            })
            .addCase(fetchAllCrops.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            //fetching first

            .addCase(fetchFirst.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchFirst.fulfilled, (state, action) => {
                state.status = "'got first'"
                state.first = action.payload
            })
            .addCase(fetchFirst.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })


            //crop per year

            .addCase(fetchCropPerActivity.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCropPerActivity.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.cropPerActivity = action.payload
            })
            .addCase(fetchCropPerActivity.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            //crop per year

            .addCase(fetchCropPerYear.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCropPerYear.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.cropPerYear = action.payload
            })
            .addCase(fetchCropPerYear.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })


    }

})

export const getAllCrops = (state) => state.crops.allCrops;
export const getFirst = (state) => state.crops.first;
export const getCropPerActivity = (state) => state.crops.cropPerActivity;
export const getCropPerYear = (state) => state.crops.cropPerYear;
export const getCropStatus = (state) => state.crops.status;
export const getCropError = (state) => state.crops.error;
export const getCurrentCrop = (state) => state.crops.current;

export const {setCurrent} = cropSlice.actions;

export default cropSlice.reducer;