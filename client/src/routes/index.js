import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Overview from '../pages/dashboard/Overview'
import Stages from '../pages/dashboard/stage/Stages'
import SignIn from '../pages/SignIn'
import Users from "../pages/dashboard/users/Users"
import Country from '../pages/dashboard/country/Country'
import Foods from '../pages/dashboard/food/Foods'
import Processes from '../pages/dashboard/process/Processes'
import View from '../pages/dashboard/FoodProcess/View'

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
                    element={<Processes />}
                />
                <Route
                    exact
                    path='/admin/foods'
                    element={<Foods />}
                />
                <Route
                    exact
                    path='/admin/countries'
                    element={<Country />}
                />
                <Route
                    exact
                    path='/admin/analytics'
                    element={<View />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default index