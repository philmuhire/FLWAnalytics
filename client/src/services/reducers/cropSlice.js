import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/constants";

const initialState = {
    allCrops: [],
    cropPerActivity: [],
    cropPerYear: [],
    current: {
        id: 962,
        name: "Wheat",
        description: null,
        quantityUnit: "KILOGRAM_kg"
    },
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewCrop = createAsyncThunk('api/crop/add', async (crop) => {
    console.log("within add crop")
    console.log(crop)
    const response = await axios.post("http://localhost:8080/api/crop/add", crop)
    return response.data
})
export const fetchAllCrops = createAsyncThunk('api/crop/all', async () => {
    const response = await axios.get("http://localhost:8080/api/crop/all")
    return response.data
})

export const fetchCropPerActivity = createAsyncThunk('api/crop/singleByAct/', async (id) => {
    const response = await axios.get("http://localhost:8080/api/crop/singleByAct/" + id)
    return response.data
})
export const fetchCropPerYear = createAsyncThunk('api/crop/singleByYear/', async (id) => {
    const response = await axios.get("http://localhost:8080/api/crop/singleByYear/" + id)
    return response.data
})

const cropSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder

            //all crops

            .addCase(fetchAllCrops.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllCrops.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.allCrops = action.payload
            })
            .addCase(fetchAllCrops.rejected, (state, action) => {
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
                state.status = "'succeeded'"
                state.cropPerYear = action.payload
            })
            .addCase(fetchCropPerYear.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })


    }

})

export const getAllCrops = (state) => state.crop.allCrops;
export const getCropPerActivity = (state) => state.crop.cropPerActivity;
export const getCropPerYear = (state) => state.crop.cropPerYear;
export const getCropStatus = (state) => state.crop.status;
export const getCropError = (state) => state.crop.error;
export const getCurrentCrop = (state) => state.crop.current;

export default cropSlice.reducer;