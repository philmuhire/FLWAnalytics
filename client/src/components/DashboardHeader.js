import React, { useState } from 'react'
import profile from "../assets/img/profile-picture-2.jpg"
import { useDispatch } from 'react-redux/es/exports'
import { useNavigate } from "react-router-dom"
const DashboardHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usagePeriod, setUsagePeriod] = useState("Monthly")
    const [toggleUsagePeriod, setToggleUsagePeriod] = useState(false)
    const [userDropdown, setUserDropDown] = useState(false);

    const auth = {
        isLoggedIn: true,
        user: {
            firstName: "MURENZI",
            lastName: "jack",
            email: "jackmu@gmail.com",
            role: "SUPER_ADMIN"
        }
    }


    const changePeriod = (period) => {
        setUsagePeriod(period)
        setToggleUsagePeriod(false)
    }
    return (
        <div className='flex justify-end items-center'>
            <>
                <img id="avatar" type="button" onClick={() => { setUserDropDown(!userDropdown) }} data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={profile} alt="User dropdown" />

                <div id="userDropdown" class={`z-10 absolute right-16 top-12  bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${!userDropdown ? "hidden" : ""}`}>
                    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{auth.user.firstName} {auth.user.lastName}</div>
                        <div class="font-medium truncate">{auth.user.email}</div>
                    </div>
                    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                        {
                            auth.user.role === "SUPER_ADMIN" || auth.user.role === "EMBASSY_ADMIN" ? (<li>
                                <a href="/admin/dashboard" class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                            </li>) : ""
                        }
                        <li>
                            <a href="/userrequest" class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Applications</a>
                        </li>
                        <li>
                            <a href="/account" class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Account</a>
                        </li>
                    </ul>
                    <div class="py-1">
                        <a  href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div>
            </>
        </div>
    )
}

export default DashboardHeader