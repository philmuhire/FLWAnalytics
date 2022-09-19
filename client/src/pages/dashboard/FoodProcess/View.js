// import jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../../components/ErrorAlert';
import SearchBar from '../../../components/SearchBar';
import Sidebar from '../../../layouts/Sidebar';
import { fetchactivities, selectAllActivities } from '../../../services/reducers/activitySlice';
import { fetchAllCrops, getAllCrops } from '../../../services/reducers/cropSlice';
// import html2canvas from "html2canvas"

import { deleteFoodProcess, fetchlossperprocess, fetchNProcesses, fetchNProduce, fetchNProducePerCrop, getAllFP, getFPError, getFPStatus } from '../../../services/reducers/foodProcessSlice';
import Add from './Add';
import FindLoss from './FindLoss';
import FindProduce from './FindProduce';


const View = () => {





    let val = "white"
    function printDiv(divId,
        title) {
            console.log(divId)
        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

        mywindow.document.write(`<html><head><title>${title}</title>`);
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById(divId).innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        // mywindow.close();

        return true;
    }

    // function saveDiv(divId, title) {
    //     doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
    //     doc.save('div.pdf');
    // }

    // const generatefile = () => {
    //     const input = document.getElementById("findproduce");
    //     const pdf = new jsPDF({ unit: "px", format: "tabloid", userUnit: "px" });
    //     pdf.html(input, { html2canvas: { scale: 0.52 } }).then(() => {
    //         pdf.save("test.pdf");
    //     });
    // }
    // const generatefile = () => {
    //     var doc = new jsPDF("p", "pt", "a4", true)
    //     doc.html(document.getElementById("findproduce"), {
    //         callback: function(pdf){
    //             pdf.save("testfile.pdf")
    //         }
    //     })
    // }

    // const generateotherfile = () => {
    //     const doc = new jsPDF()
    //     doc.autoTable({ html: '#findproduce' })
    //     doc.save('table.pdf')
    // }
    const [currentTab, setCurrentTab] = useState("analytics")
    const dispatch = useDispatch()
    const [togAddFPMdl, setTogAddFPMdl] = useState(false)

    const foodProcesses = useSelector(getAllFP);
    const status = useSelector(getFPStatus);
    const error = useSelector(getFPError);
    const [fetchState, setFetchState] = useState({ page: 1, size: 50 });
    const [toggleUsagePeriod, setToggleUsagePeriod] = useState(false)


    // const printOption = () => {
    //     var doc = new jsPDF();
    //     doc.fromHTML(ReactDOMServer.renderToStaticMarkup(this.render()));
    //     doc.save("myDocument.pdf");
    // }

    useEffect(() => {
        dispatch(fetchNProduce())

    }, [])

    const setPage = (page) => {
        if (!page < 1) {
            console.log("page changed to :" + page);
            setFetchState({ ...fetchState, page })
        }

    }

    useEffect(() => {
        dispatch(fetchNProduce())
    }, [fetchState])

    useEffect(() => {
        if (status === 'deleted') {
            dispatch(fetchNProduce())
            dispatch(fetchAllCrops())
        }
    }, [status])

    const foods = useSelector(getAllCrops)
    const processes = useSelector(selectAllActivities)

    const [tab, setTab] = useState("findproduce")

    const handleChange = (e) => {
        dispatch(fetchNProducePerCrop(e.target.value))

        setTab("findproduce")
    }

    const getloss = (e) => {
        dispatch(fetchlossperprocess(e.target.value))

        setTab("findlossperprocess")
    }


    const changeTab = (tab) => {
        setTab(tab)
        if (tab === "findproduce") {
            dispatch(fetchNProduce())
        }
        if (tab === "findlossperproces") {
            dispatch(fetchactivities())
        }
        setToggleUsagePeriod(!toggleUsagePeriod)


    }





    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 h-screen overflow-y-scroll '>
                {/* <SearchBar /> */}
                <div className='mx-2 my-2 '>
                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>Food Processes Overview</h3>

                        <div className='flex justify-between items-center space-x-2'>
                            <span className='pl-2 btn_toggler block'>
                                <button onClick={() => setToggleUsagePeriod(!toggleUsagePeriod)}
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm font-normal text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Select Report
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div className={`z-10 bg-white absolute divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${toggleUsagePeriod ? "" : "hidden div_toggle"}`}>
                                    <ul className="py-1 text-sm h-36 overflow-y-scroll text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li className='cursor-pointer'>
                                            <a onClick={() => { changeTab("findproduce") }} className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >All Produce</a>
                                        </li>
                                        <li className='cursor-pointer'>
                                            <a onClick={() => { changeTab("findproducepercrop") }} className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >food productivity per crop</a>
                                        </li>
                                        <li className='cursor-pointer'>
                                            <a onClick={() => { changeTab("findlossperproces") }} className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >food loss per process</a>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                            {
                                tab === "findproducepercrop" ? (<div className="relative z-0 w-1/5 mb-3 group">
                                    <select name="foodId" onChange={(e) => { handleChange(e) }}
                                        className="block text-sm pl-2 py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" " required="" autoComplete='off' >
                                        <option className='text-xs' value="">Select Food</option>
                                        {
                                            foods.length > 0 ? (
                                                foods.map(food =>
                                                    <option className='text-xs' value={food.id}>{food.name}</option>
                                                )) : ""
                                        }
                                    </select>
                                </div>) : ""
                            }
                            {
                                tab === "findlossperproces" || tab === "findlossperprocess" ? (
                                    <div className="relative z-0 w-2/5 mb-3 group">
                                        <select name="processId" onChange={(e) => { getloss(e) }}
                                            className="block text-sm pl-2 py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" " required="" autoComplete='off' >
                                            <option className='text-xs' value="">Select Process leading to loss</option>
                                            {
                                                processes.length > 0 ? (
                                                    processes.map(process =>
                                                        <option className='text-xs' value={process.id}>{process.name}</option>
                                                    )) : ""
                                            }
                                        </select>
                                    </div>) : ""
                            }
                            <a onClick={() => { printDiv(tab, "my report") }} class="text-white bg-black hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                generate report
                            </a>
                            <a onClick={() => { setTogAddFPMdl(true) }} class="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                </svg>
                                Add New
                            </a>
                        </div>
                    </div>
                    {tab === "findproduce" ? (
                        <div id='findproduce'>
                            <table className="w-256 my-2 overflow-x-scroll" id='divToPrint'>
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
                                            year
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            Actions
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
                                                <td>{fp.produce.toFixed(2)}</td>
                                                <td>{(fp.produce - fp.lossQuantity).toFixed(2)}</td>
                                                <td>{fp.lossQuantity}</td>
                                                <td>{fp.year}</td>
                                                <td style={{ color: val }} className="no-print hidden-print .print:hidden text-right flex justify-end items-center space-x-3">
                                                    <div className='bg-gray-300 rounded-md p-1 w-16 h-8 flex space-x-2'>
                                                        <div
                                                            data-tooltip-target="tooltip-view"

                                                            className="text-yellow-500 p-1 w-1/2 rounded-md bg-white cursor-pointer hover:bg-white hover:text-yellow-700 transition delay-150 duration-300"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                            
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
                    ) : ""}
                    {tab === "findproducepercrop" ? (
                        <div id='findproducepercrop'>
                            <table className="w-256 my-2 overflow-x-scroll" id='divToPrint'>
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
                                            year
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            Actions
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
                                                <td>{fp.produce.toFixed(2)}</td>
                                                <td>{(fp.produce - fp.lossQuantity).toFixed(2)}</td>
                                                <td>{fp.lossQuantity}</td>
                                                <td>{fp.year}</td>
                                                <td style={{ color: val }} className="text-right flex justify-end items-center space-x-3">
                                                    <div className='bg-gray-300 rounded-md p-1 w-16 h-8 flex space-x-2'>
                                                        <div
                                                            data-tooltip-target="tooltip-view"

                                                            className="text-yellow-500 p-1 w-1/2 rounded-md bg-white cursor-pointer hover:bg-white hover:text-yellow-700 transition delay-150 duration-300"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                            
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
                    ) : ""}
                    {tab === "findlossperprocess" ? (
                        <div id='findlossperprocess'>
                            <table className="w-256 my-2 overflow-x-scroll" id='divToPrint'>
                                <thead className='pt-4  bg-gray-300'>
                                    <tr className='rounded-md px-2'>
                                        <th className="text-xs py-2 pl-3 font-semibold text-gray-500 text-left">
                                            Food
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            Process
                                        </th>
                                        <th className="text-xs py-2 pl-3 font-semibold text-gray-500 text-left">
                                            Country
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            Loss Percentage
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            lossQuantity(tons)
                                        </th>
                                        <th className="text-xs font-semibold text-gray-500 text-left">
                                            year
                                        </th>
                                        <th  className="text-xs font-semibold text-gray-500 text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        status === "succeeded-fetchloss" && foodProcesses.length > 0 ? (
                                            foodProcesses?.map(fp =>

                                                <tr className="border-t-2  border-gray-300 text-sm text-gray-700">
                                                    <td className="py-1">
                                                        <span className='pl-3'>{fp.food.name}</span>
                                                    </td>
                                                    <td>{fp.process.name.replaceAll("/", ", ")}</td>
                                                    <td>{fp.country.name}</td>
                                                    <td>{fp.lossPercentage.toFixed(2)}</td>
                                                    <td>{fp.lossQuantity.toFixed(2)}</td>
                                                    <td>{fp.year}</td>
                                                    <td style={{ color: val }} className="text-right flex justify-end items-center space-x-3">
                                                        <div className='bg-gray-300 rounded-md p-1 w-16 h-8 flex space-x-2'>
                                                            <div
                                                                data-tooltip-target="tooltip-view"

                                                                className="text-yellow-500 p-1 w-1/2 rounded-md bg-white cursor-pointer hover:bg-white hover:text-yellow-700 transition delay-150 duration-300"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                                
                                                            </div>

                                                        </div>

                                                    </td>
                                                </tr>
                                            )
                                        ) : <ErrorAlert message="no information available" />


                                    }

                                </tbody>

                            </table>

                        </div>
                    ) : ""}

                    <Add togAddFPMdl={togAddFPMdl} setTogAddFPMdl={setTogAddFPMdl} />


                </div>
            </div>
        </div>
    )
}

export default View