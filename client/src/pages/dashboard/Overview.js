import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BarChart from '../../components/charts/BarChart'
import Sidebar from '../../layouts/Sidebar'
import { getUser } from '../../services/reducers/authSlice'
import { cropActivitySummary, cropPerActivity, cropPerYear } from '../../assets/data'
import { randomColor } from "randomcolor"
import PieChart from '../../components/charts/PieChart'
import Doughnut from '../../components/charts/DoughnutChart'
import DoughnutChart from '../../components/charts/DoughnutChart'
import { useEffectOnce } from '../../utils/utils'
import {
    fetchAllCrops,
    fetchCropPerActivity,
    fetchCropPerYear,
    fetchFirst, getAllCrops, getCropPerActivity,
    getCropPerYear, getCropStatus,
    getFirst
} from '../../services/reducers/cropSlice'

const Overview = () => {
    const [currentTab, setCurrentTab] = useState("overview")
    const [toggleUsagePeriod, setToggleUsagePeriod] = useState(false)
    const [rangeValue, setRangeValue] = useState(2005)
    const dispatch = useDispatch()
    const first = useSelector(getFirst);
    const status = useSelector(getCropStatus);
    const crops = useSelector(getAllCrops)


    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))
    const user = useSelector(getUser);
    const navigate = useNavigate()
    let years = [...new Set(cropActivitySummary.map(x => x.year))]

    // let chartData = [];
    const [cropData, setCropData] = useState({
        labels: [...new Set(cropActivitySummary.map(x => x.year))],
        datasets: [{
            label: "loss quantity(tons)",
            data: cropActivitySummary.filter(x => [...new Set(cropActivitySummary.map(x => x.year))].includes(x.year)).slice(0, years.length).map(x => parseFloat(x.sum.toFixed(1))),
            backgroundColor: randomColor({ luminosity: 'light', format: 'hex', count: years.length }),
            // borderColor: randomColor({luminosity: 'light', format: 'hex',count: years.length})
        },
        ],
    })

    const cropPerAct = useSelector(getCropPerActivity);
    const singleCropByAct = {
        labels: cropPerAct.map(x => x.activity.name.replaceAll("/", ", ") + "(" + x.activity.stage.name + ")"),
        datasets: [{
            label: "Loss quantity per activity",
            data: cropPerAct.map(x => parseFloat(x.sum.toFixed(2))),
            backgroundColor: randomColor({ luminosity: 'dark', format: 'hex', count: cropPerAct.length })
        }]
    }

    const cropPerYear = useSelector(getCropPerYear);
    const singleCropByYear = {
        labels: cropPerYear.map(x => x.year.toString()),
        datasets: [{
            label: "Loss quantity per activity",
            data: cropPerYear.map(x => parseFloat(x.sum.toFixed(2))),
            backgroundColor: randomColor({ count: cropPerYear.length })
        }]
    }

    const handleCropByYearChange = (e) => {
        dispatch(fetchCropPerYear(e.target.value))
    }
    const handleCropByActivityChange = (e) => {
        dispatch(fetchCropPerActivity(e.target.value))
    }


    useEffectOnce(() => {
        if (auth === null) {
            navigate('/');
        } else {
            if (!auth.isLoggedIn) {
                console.log("not logged in");
                navigate('/');
            } else {
                console.log("is logged in")
                console.log(auth)
                dispatch(fetchFirst())
                dispatch(fetchAllCrops())
            }
        }
    }, [])
    useEffect(() => {
        if (status == "got first") {
            dispatch(fetchCropPerActivity(first.id))
            dispatch(fetchCropPerYear(first.id))
        }
    }, [status])


    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 h-screen overflow-y-scroll'>
                <div className='mx-2 my-2 '>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>FLW Overview</h3>
                        <div className='flex justify-between items-center space-x-2'>
                            <span className='pl-2 btn_toggler block'>
                                <button onClick={() => setToggleUsagePeriod(!toggleUsagePeriod)}
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm font-normal text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">This Month
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path></svg>
                                </button>
                                <div
                                    className={`z-10 bg-white absolute divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${toggleUsagePeriod ? "" : "hidden div_toggle"}`}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400"
                                        aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#"
                                                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `}>none</a>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                            <button type="button"
                                class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start space-x-4'>
                    <div className='w-2/3 '>
                        <div className='grid grid-cols-2 space-x-4'>
                            <div className='bg-blue-600 px-8 py-2 text-gray-300 rounded-lgsshadow-lg'>
                                <h6 className='text-sm'>Welcome Back</h6>
                                <h1 className='font-bold text-lg'>Murenzi jack</h1>
                                {/* <a className='text-xs my-2 inline-block'>complete your today's attendance
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </a> */}
                            </div>
                            <div className=' px-8 py-2 rounded-lg flex justify-between shadow-lg'>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Countries</p>
                                    <p className='font-bold text-lg text-center mt-6'>194</p>
                                </div>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Food types</p>
                                    <p className='font-bold text-lg text-center mt-6'>74</p>
                                </div>
                                <div className='flex-col justify-center'>
                                    <p className='text-gray-500 text-center text-sm'>Activities</p>
                                    <p className='font-bold text-lg text-center mt-6'>109</p>
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
                                <div
                                    className='bg-yellow-500 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2'>
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
                                <div
                                    className='bg-red-400 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2 '>
                                    <div>
                                        <h6 className='text-xs'>Total Food types</h6>
                                        <h1 className='font-bold text-sm pt-3'>74 Food types</h1>
                                    </div>
                                    <div className='w-9 h-9 rounded-full border-2 border-green-600 p-1'>
                                        <div className='w-6 h-6 rounded-full border-2 border-black p-1'>
                                            <div className='w-3 h-3 rounded-full border-2 border-yellow-900 p-1'>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div
                                    className='bg-green-400 px-8 py-2 text-gray-300 rounded-lg shadow flex justify-around items-center space-x-2'>
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


                    <div className='w-1/3'>
                        <h3 className='font-bold text-sm'>Food loss loss Per Year</h3>
                        <label htmlFor="underline_select" className="sr-only">Underline select</label>
                        <select id="underline_select" onChange={(e) => { handleCropByYearChange(e) }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option selected>Select Food type</option>
                            {
                                crops?.map(crop => (
                                    <option key={crop.id} value={crop.id}>{crop.name}</option>
                                ))
                            }
                        </select>
                        {
                            cropPerYear.length != 0 ?
                                (<DoughnutChart chartData={singleCropByYear} />) :
                                (<div id="alert-2" class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Info</span>
                                    <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                        This Food type has no data
                                    </div>
                                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>)
                        }
                    </div>
                </div>
                <div className='flex justify-start space-x-4 mt-4'>
                    <div className='w-2/3'>
                        <BarChart chartData={cropData} />
                    </div>
                    <div className='w-1/3'>
                        <h3 className='font-bold text-sm'>Food Loss Per Activity</h3>
                        <label htmlFor="underline_select" className="sr-only">Underline select</label>
                        <select id="underline_select" onChange={(e) => { handleCropByActivityChange(e) }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option selected>Select Food type</option>
                            {
                                crops?.map(crop => (
                                    <option key={crop.id} value={crop.id}>{crop.name}</option>
                                ))
                            }
                        </select>
                        {
                            cropPerAct.length != 0 ?
                                (<PieChart chartData={singleCropByAct} />) :
                                (<div id="alert-2" class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Info</span>
                                    <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
                                        This Food type has no data
                                    </div>
                                    <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300" data-dismiss-target="#alert-2" aria-label="Close">
                                        <span class="sr-only">Close</span>
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview