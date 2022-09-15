import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../../components/SearchBar';
import Sidebar from '../../../layouts/Sidebar';
import { getAllCrops, getCropError, getCropStatus } from '../../../services/reducers/cropSlice';
import { fetchNProcesses, getAllFP, getFPError, getFPStatus } from '../../../services/reducers/foodProcessSlice';


const View = () => {
    const [currentTab, setCurrentTab] = useState("crops")
    const dispatch = useDispatch()

    const foodProcesses = useSelector(getAllFP);
    const status = useSelector(getFPStatus);
    const error = useSelector(getFPError);
    const [fetchState, setFetchState] = useState({ page: 1, size: 40 });

    useEffect(() => {
        dispatch(fetchNProcesses(fetchState))
    }, [])

    const setPage = (page) => {
        if (!page < 1) {
            console.log("page changed to :" + page);
            setFetchState({ ...fetchState, page })
        }

    }

    useEffect(() => {
        dispatch(fetchNProcesses(fetchState))
    }, [fetchState])


    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 h-screen overflow-y-scroll '>
                {/* <SearchBar /> */}
                <div className='mx-2 my-2 '>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>Activities Overview</h3>

                        <div className='flex justify-between items-center space-x-2'>
                            <span className='pl-2 btn_toggler block'>
                                <button
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm font-normal text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">This Month
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div className={`z-10 bg-white absolute divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 `}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400 hidden" aria-labelledby="dropdownLargeButton">
                                        {/* <li>
                                            <a href="#" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >none</a>
                                        </li> */}
                                    </ul>
                                </div>
                            </span>
                            <a class="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                                Add New
                            </a>
                        </div>
                    </div>
                    <div>
                        <table className="w-256 my-2 overflow-x-scroll">
                            <thead className='pt-4  bg-gray-300'>
                                <tr className='rounded-md px-2'>
                                    <th className="text-xs py-2 pl-3 font-semibold text-gray-500 text-left">
                                        Food
                                    </th>
                                    <th className="text-xs py-2 pl-3 font-semibold text-gray-500 text-left">
                                        Country
                                    </th>
                                    <th className="text-xs font-semibold text-gray-500 text-left">
                                        Produce(tons)
                                    </th>
                                    <th className="text-xs font-semibold text-gray-500 text-left">
                                        consumption(tons)
                                    </th>
                                    <th className="text-xs font-semibold text-gray-500 text-left">
                                        lossQuantity(tons)
                                    </th>
                                    <th className="text-xs font-semibold text-gray-500 text-left">
                                        lossQuantity(tons)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    foodProcesses?.map(fp =>
                                    (
                                        <tr className="border-t-2  border-gray-300 text-sm text-gray-700">
                                            <td className="py-1">
                                                <span className='pl-3'>{fp.food.name}</span>
                                            </td>
                                            <td>{fp.country.name}</td>
                                            <td>{fp.produce}</td>
                                            <td>{fp.produce - fp.lossQuantity}</td>
                                            <td>{fp.lossQuantity}</td>
                                            <td className="text-right flex justify-end items-center space-x-3">
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
                        <nav>
                            <ul class="inline-flex items-center -space-x-px">
                                <li>
                                    <a onClick={() => { setPage(fetchState.page - 1) }} class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        {/* <span class="sr-only">Previous</span> */}
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                                {/* {
                                    new Array(10).fill(1).map((val, idx) => (
                                        <li>
                                            <a onClick={() => { setPage(idx + 1) }} class="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{idx + 1}</a>
                                        </li>
                                    ))
                                } */}

                                <li>
                                    <a class="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{fetchState.page}</a>
                                </li>


                                <li>
                                    <a onClick={() => { setPage(fetchState.page + 1) }} class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        {/* <span class="sr-only">Next</span> */}
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default View