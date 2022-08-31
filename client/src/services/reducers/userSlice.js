import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    users: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewUser = createAsyncThunk('api/user/add', async (user) => {
    console.log("within add user")
    console.log(user)
    const response = await axios.post("http://localhost:8080/api/user/add", user)
    return response.data
})

export const fetchUsers = createAsyncThunk('api/user/all', async () => {
    const response = await axios.get("http://localhost:8080/api/user/all")
    return response.data
})

export const getOneUser = createAsyncThunk('api/getuser', async (id) => {
    const response = await axios.get("http://localhost:8080/api/user/" + id)
    return response.data
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.users.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })


            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })
       
    }
})

export const selectAllUsers = (state) => state.user.users;
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getCurrentUser = (state) => state.user.current;



// this is for configureStore
export default userSlice.reducer;