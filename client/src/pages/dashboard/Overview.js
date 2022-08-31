import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../layouts/Sidebar'
import { getUser } from '../../services/reducers/authSlice'

const Overview = () => {
    const [currentTab, setCurrentTab] = useState("overview")
    const [toggleUsagePeriod, setToggleUsagePeriod] = useState(false)

    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))
    const user = useSelector(getUser);
    const navigate = useNavigate()

    

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
    }, [user])

    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 '>
                <div className='mx-2 my-2 '>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>Employee Overview</h3>
                        <div className='flex justify-between items-center space-x-2'>
                            <span className='pl-2 btn_toggler block'>
                                <button onClick={() => setToggleUsagePeriod(!toggleUsagePeriod)}
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm font-normal text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">This Month
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div className={`z-10 bg-white absolute divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${toggleUsagePeriod ? "" : "hidden div_toggle"}`}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >none</a>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                            <button type="button" class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start'>
                    <div className='w-2/3 '>
                        <div className='grid grid-cols-2 space-x-4'>
                            <div className='bg-blue-600 px-8 py-2 text-gray-300 rounded-lgsshadow-lg'>
                                <h6 className='text-sm'>Welcome Back</h6>
                                <h1 className='font-bold text-lg'>Murenzi Arnold</h1>
                                {/* <a className='text-xs my-2 inline-block'>complete your today's attendance
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                            <div className=' px-8 py-2 rounded-lg flex justify-between shadow-lg'>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Countries</p>
                                    <p className='font-bold text-lg text-center mt-6'>36</p>
                                </div>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Crops</p>
                                    <p className='font-bold text-lg text-center mt-6'>10</p>
                                </div>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Activities</p>
                                    <p className='font-bold text-lg text-center mt-6'>18</p>
                                </div>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Stages</p>
                                    <p className='font-bold text-lg text-center mt-6'>18</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-6'>
                            <h3 className='font-bold text-sm mb-3'>Data Overview</h3>
                            <div className='grid grid-cols-3 space-x-4 '>
                                <div className='bg-yellow-500 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2'>
                                    <div>
                                        <h6 className='text-xs'>Total Records</h6>
                                        <h1 className='font-bold text-sm pt-3'>312423 insights</h1>
                                    </div>
                                    <div className='w-9 h-9 rounded-full border-2 border-white p-1'>
                                        <div className='w-6 h-6 rounded-full border-2 border-green-600 p-1'>
                                            <div className='w-3 h-3 rounded-full border-2 border-red-600 p-1'>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='bg-red-400 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2 '>
                                    <div>
                                        <h6 className='text-xs'>Total Crops</h6>
                                        <h1 className='font-bold text-sm pt-3'>7 Crops</h1>
                                    </div>
                                    <div className='w-9 h-9 rounded-full border-2 border-green-600 p-1'>
                                        <div className='w-6 h-6 rounded-full border-2 border-black p-1'>
                                            <div className='w-3 h-3 rounded-full border-2 border-yellow-900 p-1'>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='bg-green-400 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2'>
                                    <div>
                                        <h6 className='text-xs'>Total Countries</h6>
                                        <h1 className='font-bold text-sm pt-3'>20 countries</h1>
                                    </div>
                                    <div className='w-9 h-9 rounded-full border-2 border-red-600 p-1'>
                                        <div className='w-6 h-6 rounded-full border-2 border-black p-1'>
                                            <div className='w-3 h-3 rounded-full border-2 border-white p-1'>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='w-1/3 px-4 border shadow-md ml-4  py-2'>
                        <div className='grid justify-items-center '>
                            <div className='w-20 h-20 rounded-full border-2 bg-green-600 p-1'>
                            </div>
                            <h4 className='text-sm text-gray-700 font-bold'>Murenzi Jack</h4>
                            <h4 className='text-xs text-gray-400 font-bold mt-1'>UI/UX designer</h4>
                        </div>

                        <div className=' px-8 pb-4 rounded-lg flex justify-between'>
                            <div className='flex-col justify-center'>
                                <p className='font-bold text-sm text-center mt-6'>765k</p>
                                <p className='text-gray-500 text-center text-xs'>Activity time</p>
                            </div>
                            <div className='flex-col justify-center text-red-700'>
                                <p className='font-bold text-sm  text-center mt-6'>28%</p>
                                <p className=' text-center text-xs'>Missing time</p>
                            </div>
                            <div className='flex-col justify-center text-green-400'>
                                <p className='font-bold text-sm text-center mt-6'>765k</p>
                                <p className=' text-center text-xs'>Work Activity</p>
                            </div>

                        </div>
                        <div className='flex justify-around'>
                            <button type="button" class="text-white bg-gray-800 hover:bg-gray-100 hover:border hover:border-gray-800  hover:text-gray-800 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                View Profile
                            </button>
                            <button type="button" class="text-white bg-white border border-gray-800 text-gray-800 hover:text-gray-100 hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                Edit Profile
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Overview