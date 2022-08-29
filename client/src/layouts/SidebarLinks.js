import React, { useEffect, useState } from 'react'
import SidebarLink from '../components/SidebarLink'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux/es/hooks/useDispatch'
import { checkPath } from '../utils/utils'
import profile1 from "../assets/img/profile-picture-2.jpg"
import { logout } from '../services/reducers/authSlice'




const SidebarLinks = ({ currentTab }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))


    const [toggleAdmin, setToggleAdmin] = useState(true);
    const [focus, setFocus] = useState("overview");

    useEffect(() => {
        if (auth === null) {
            navigate('/');
        } else {
            if (!auth.isLoggedIn) {
                console.log("not logged in");
                navigate('/');
            }
            else {
                console.log("is logged in")
                console.log(auth)
            }
        }
    })
 
    const handleLogout = () => {
        try{
            dispatch(logout())
            navigate('/')
        } catch(error) {
            console.log(error.message)
        }
    }
    return (
        <div className='mt-2'>
            <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" class="text-gray-800 bg-gray-100 rounded ml-2 text-sm px-4 py-2 text-center inline-flex w-5/6 justify-between items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                <img class="w-8 h-8 inline-block rounded-full border-2 border-white dark:border-gray-800" src={profile1} alt="" />
                <div>
                    <h4 className='font-medium'>{auth?.fullname}</h4>
                    <h4 className='text-left text-sm text-gray-500 font-normal'>{auth?.role}</h4>
                </div>
                <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

            <div id="dropdownDivider" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
                    <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-xs font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                            </svg>

                            Manage Account</a>
                    </li>
                    <hr />
                    <li>
                        <a href="#" onClick={()=>{handleLogout()}} class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-xs font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z" />
                            </svg>

                            Log Out</a>
                    </li>
                </ul>

            </div>
            <a className={`font-medium transform ${currentTab === "overview" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm ${checkPath("/admin/employees") ? "bg-white text-blue-600 border-l-8 border-blue-600" : ""} `} href="/admin/employees">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <span className='text-left text-xs pl-5'>Overview</span>
            </a>
            <a href='/admin/crops' className={`font-medium transform ${currentTab === "employees" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `} >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className='text-left text-xs  pl-5'>Crops</span>
            </a>
            <a href='/admin/activity' className={`font-medium transform ${currentTab === "activity" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className='text-left text-xs pl-5'>Activities</span>
            </a>
            <a href='/admin/stage' className={`font-medium transform ${currentTab === "stage" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `} >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className='text-left text-xs pl-5'>Stages</span>
            </a>
            <a href='/admin/user' className={`font-medium transform ${currentTab === "users" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className='text-left text-xs pl-5'>Users</span>
            </a>
            <a href='/admin/countries' className={`font-medium transform ${currentTab === "finance" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span className='text-left text-xs pl-5'>Countries</span>
            </a>
            <a className={`font-medium transform ${currentTab === "reports" ? "bg-white text-blue-600" : ""} focus:bg-white focus:text-blue-600 hover:bg-white hover:text-blue-500 hover:translate-x-2 transition-transform ease-in duration-200 text-gray-200 cursor-pointer flex justify-start items-center pl-5 py-2.5 rounde-sm `}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className='text-left text-xs pl-5'>Reports</span>
            </a>
        </div>
    )
}

export default SidebarLinks