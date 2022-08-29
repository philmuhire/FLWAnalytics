import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../components/SearchBar';
import Sidebar from '../../../layouts/Sidebar';
import { fetchEmployees, getEmpError, getEmpStatus, selectAllEmployees } from '../../../services/reducers/EmployeeSlice'
import profile1 from "../../../assets/img/profile-picture-2.jpg"
import ViewMore from './ViewMore';

const Users = () => {
    const [currentTab, setCurrentTab] = useState("admin")
    const [toggleUsagePeriod, setToggleUsagePeriod] = useState(false)
    const [toggleViewMore, setToggleViewMore] = useState(false)
    const dispatch = useDispatch()

    const employees = useSelector(selectAllEmployees);
    const status = useSelector(getEmpStatus);
    const error = useSelector(getEmpError);

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])

    const handleViewMore = (id) =>{
        setToggleViewMore(true)
    }


    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 '>
                <SearchBar />
                <div className='mx-2 my-2 '>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>Employee Overview</h3>
                        <div className='flex justify-between items-center space-x-2'>
                            <span className='pl-2 btn_toggler block'>
                                <button
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
                            <a href='/admin/employees/new' class="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                                Add New
                            </a>
                        </div>
                    </div>
                    <table className="w-256 my-2 overflow-x-scroll">
                        <thead className='pt-4  bg-gray-300'>
                            <tr className='rounded-md px-2'>
                                <th className="text-xs py-2 pl-3 font-semibold text-gray-500 text-left">
                                    Employees Names
                                </th>
                                <th className="text-xs font-semibold text-gray-500 text-left">
                                    Positions
                                </th>
                                <th className="text-xs font-semibold text-gray-500 text-left">
                                    Joined
                                </th>
                                <th className="text-xs font-semibold text-gray-500 text-left">
                                    Status
                                </th>
                                <th className="text-xs pr-3 font-semibold text-gray-500 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees?.map(emp =>
                                (
                                    <tr className="border-t-2  border-gray-300 text-sm text-gray-700">
                                        <td className="py-1">
                                            <img class="w-8 h-8 inline-block rounded-full border-2 border-white dark:border-gray-800" src={profile1} alt="" />
                                            <span className='pl-3'>{emp.fullname}</span>
                                        </td>
                                        <td>DGIE</td>
                                        <td>12-04-2021</td>
                                        <td>online</td>
                                        <td className="text-right flex justify-end items-center space-x-3">
                                            <div
                                                data-tooltip-target="tooltip-view"
                                                onClick={() => {
                                                    handleViewMore(emp.id);
                                                  }}
                                                className="text-blue-800 cursor-pointer hover:text-blue-400 transition delay-150 duration-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                                <div
                                                    id="tooltip-view"
                                                    role="tooltip"
                                                    className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                                                >
                                                    view more
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                            <div
                                                data-tooltip-target="tooltip-edit"
                                                // onClick={() => {
                                                //     handleEdit(emb.id);
                                                // }}
                                                className="relative text-yellow-800 cursor-pointer hover:text-yellow-400 transition delay-150 duration-300"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                                <div
                                                    id="tooltip-edit"
                                                    role="tooltip"
                                                    className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                                                >
                                                    edit
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                )
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <ViewMore toggleViewMore={toggleViewMore} setToggleViewMore={setToggleViewMore} />
        </div>
    )
}

export default Users