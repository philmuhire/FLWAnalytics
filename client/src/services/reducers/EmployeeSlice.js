import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    employees: [],
    current: {},
    status: "idle", //idle   | loading   | succeeded     |failed
    error: null
}

export const addNewEmployee = createAsyncThunk('emp/addNewEmployee', async (employee) => {
    console.log("within addemp")
    console.log(employee)
    const response = await axios.post("http://197.243.0.108:8080/epms/administration/createAccount", employee)
    return response.data
})

export const fetchEmployees = createAsyncThunk('emp/fetchEmployees', async () => {
    const response = await axios.get("http://197.243.0.108:8080/epms/administration/allAccount")
    return response.data
})

export const getEmployee = createAsyncThunk('emp/fetchEmployees', async (id) => {
    const response = await axios.get("http://197.243.0.108:8080/epms/administration/allAccount/" + id)
    return response.data
})

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addNewEmployee.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addNewEmployee.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.employees.push(action.payload)
                state.current = action.payload
            })
            .addCase(addNewEmployee.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            //adding basic information

            .addCase(addBasicInfo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addBasicInfo.fulfilled, (state, action) => {
                state.status = "succeeded-basic"
                console.log(action.payload)
            })
            .addCase(addBasicInfo.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            //add employment information

            .addCase(addEmploymentInfo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addEmploymentInfo.fulfilled, (state, action) => {
                state.status = "succeeded-employment"
                console.log(action.payload)
            })
            .addCase(addEmploymentInfo.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            //adding duty information

            .addCase(addDutyInfo.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(addDutyInfo.fulfilled, (state, action) => {
                state.status = "succeeded-duty"
                console.log(action.payload)
            })
            .addCase(addDutyInfo.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
                console.log(state.error)

            })

            //fetching employees
            
            .addCase(fetchEmployees.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = "'succeeded'"
                state.employees = action.payload
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                console.log(state.error)
            })
       
    }
})

export const selectAllEmployees = (state) => state.employees.employees;
export const getEmpStatus = (state) => state.employees.status;
export const getEmpError = (state) => state.employees.error;
export const getCurrentEmp = (state) => state.employees.current;



// this is for configureStore
export default employeeSlice.reducer;