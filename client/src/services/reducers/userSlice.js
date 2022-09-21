import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../config/constants";



const initialState = {
    users: [],
    roles: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewUser = createAsyncThunk('api/user/add', async (user) => {
    console.log("within add user")
    console.log(user)
    const response = await axios.post(BASE_URL+"/api/user/save", user)
    return response.data
})

export const updateUser = createAsyncThunk('api/user/edit', async (user) => {
    console.log("within add user")
    console.log(user)
    const response = await axios.put(BASE_URL+"/api/user/edit", user)
    return response.data
})

export const fetchRoles = createAsyncThunk('api/fetchRoles', async () => {
    console.info("fetching roles...")
    const response = await axios.get(BASE_URL+"/api/roles")
    return response.data
})

export const fetchUsers = createAsyncThunk('api/user/all', async () => {
    const response = await axios.get(BASE_URL+"/api/users")
    return response.data
})

export const getOneUser = createAsyncThunk('api/getuser', async (id) => {
    const response = await axios.get(BASE_URL+"/api/user/" + id)
    return response.data
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addNewUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.status = "succeeded-adduser"
                state.users.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(updateUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "succeeded-updateuser"
                state.users.push(action.payload)
                state.current = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
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


            //get user by id
            .addCase(getOneUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getOneUser.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.current = action.payload
            })
            .addCase(getOneUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })

            //fetching roles

            .addCase(fetchRoles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.roles = action.payload
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })
       
    }
})

export const selectAllUsers = (state) => state.users.users;
export const selectAllRoles = (state) => state.users.roles;
export const getUserStatus = (state) => state.users.status;
export const getUserError = (state) => state.users.error;
export const getCurrentUser = (state) => state.users.current;

export const {setCurrent} = userSlice.actions;



// this is for configureStore
export default userSlice.reducer;