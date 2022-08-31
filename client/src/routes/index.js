import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Activities from '../pages/activity/Activities'
import Crops from '../pages/crop/Crops'
import Overview from '../pages/dashboard/Overview'
import SignIn from '../pages/SignIn'
import Stages from '../pages/stage/Stages'
import Users from '../pages/users/Users'

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
                    path='/admin/activity'
                    element={<Activities />}
                />
                <Route
                    exact
                    path='/admin/crops'
                    element={<Crops />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default index