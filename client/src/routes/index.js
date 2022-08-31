import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from '../pages/dashboard/Overview'
import SignIn from '../pages/SignIn'

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route
                    exact
                    path='/admin/overview'
                    element={<Overview />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default index