import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { validToken } from "../../utils/utils";
import { BASE_URL } from "../../config/constants";


const initialState = {
    countries: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}


const config = {
    headers: { Authorization: `Bearer ${validToken()}` }
};

export const addNewCountry = createAsyncThunk('api/country/add', async (country) => {
    console.log("within add country")
    console.log(country)
    const response = await axios.post(BASE_URL+"/api/country/add", country, config)
    return response.data
})

export const fetchCountries = createAsyncThunk('api/country/all', async () => {
    const response = await axios.get(BASE_URL+"/api/country/all", config)
    return response.data
})

export const getOneCountry = createAsyncThunk('api/getOneCountry', async (id) => {
    const response = await axios.get(BASE_URL+"/api/country/" + id, config)
    return response.data
})

const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewCountry.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewCountry.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.countries.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewCountry.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(fetchCountries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.countries = action.payload
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

    }
})

export const selectAllCountries = (state) => state.country.countries;
export const getCountryStatus = (state) => state.country.status;
export const getCountryError = (state) => state.country.error;
export const getCurrentCountry = (state) => state.country.country;



// this is for configureStore
export default countrySlice.reducer;