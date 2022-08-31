import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { BASE_URL } from "../../config/constants";

const initialState = {
    user: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const login = createAsyncThunk('auth/login',  async (loginState) => {
    console.log("within login")
    console.log(loginState)
    const response = await axios.post(BASE_URL+"/api/login", null, { params: {...loginState} }, {headers: {
            "Accept": "application/x-www-form-urlencoded",
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
        }})
    return response.data
})

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout: (state, action)=>{
            console.log("logging out")
            localStorage.removeItem(process.env.REACT_APP_AUTH)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem(process.env.REACT_APP_AUTH, JSON.stringify({...action.payload, isLoggedIn: true}));
                state.user = { ...action.payload }
                console.log("success logging in")
                state.status = "success"
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })
    }

})

export const getUser = (state) => state.auth.user
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;
export const {logout} = authSlice.actions

export default authSlice.reducer;
