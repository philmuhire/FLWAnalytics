import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Activities from '../pages/dashboard/process/Activities'
import Crops from '../pages/dashboard/crop/Crops'
import Overview from '../pages/dashboard/Overview'
import Stages from '../pages/dashboard/stage/Stages'
import SignIn from '../pages/SignIn'
import Users from "../pages/dashboard/users/Users"
import Country from '../pages/dashboard/country/Country'

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
                <Route
                    exact
                    path='/admin/users'
                    element={<Users />}
                />
                <Route
                    exact
                    path='/admin/stage'
                    element={<Stages />}
                />
                <Route
                    exact
                    path='/admin/process'
                    element={<Activities />}
                />
                <Route
                    exact
                    path='/admin/crops'
                    element={<Crops />}
                />
                <Route
                    exact
                    path='/admin/countries'
                    element={<Country />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default index