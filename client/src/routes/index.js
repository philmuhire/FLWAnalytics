import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn'

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                {/* <Route
                    exact
                    path='/admin/employees'
                    element={<Dashboard />}
                /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default index