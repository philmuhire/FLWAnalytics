import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import SuccessAlert from '../../../components/SuccessAlert';
import Sidebar from '../../../layouts/Sidebar';
import { fetchStages, getStageError, getStageStatus, selectAllStages, setCurrentStage } from '../../../services/reducers/stageSlice';
import { useEffectOnce } from '../../../utils/utils';
import Add from './Add';
import Edit from './Edit';


const Stages = () => {
    const [currentTab, setCurrentTab] = useState("stages")
    const [togAddStgMdl, setTogAddStgMdl] = useState(false)
    const [toggleEditStgMdl, setToggleEditStgMdl] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const stages = useSelector(selectAllStages);
    const status = useSelector(getStageStatus);
    const error = useSelector(getStageError);

    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))

    useEffectOnce(() => {
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
                dispatch(fetchStages())
            }
        }
    }, [auth])

    const handleEdit = (stage) =>{
        dispatch(setCurrentStage({...stage}))
        setToggleEditStgMdl(true)
    }



    return (
        <div className='min-h-screen flex flex-row bg-gray-100'>
            <Sidebar currentTab={currentTab} />
            <div className='flex flex-grow flex-col justify-start px-7 py-4 h-screen overflow-y-scroll '>
                <SearchBar />

                <div className='mx-2 my-2 '>
                    {
                        status === "succeeded-addstage" ? <SuccessAlert message={"Successfully added a new stage"} /> : ""
                    }

                    <div className='flex justify-between'>
                        <h3 className='font-bold text-sm'>Stages Overview</h3>
                        <div className='flex justify-between items-center space-x-2'>
                            {/* <span className='pl-2 btn_toggler block'>
                                <button
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-sm font-normal text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">This Month
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div className={`z-10 bg-white absolute divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600 `}>
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-500  `} >none</a>
                                        </li>
                                    </ul>
                                </div>
                            </span> */}
                            <a onClick={() => { setTogAddStgMdl(true) }} class="text-white bg-blue-700 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
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
                                    Name
                                </th>
                                <th className="text-xs font-semibold text-gray-500 text-left">
                                    Description
                                </th>
                                <th className="text-xs font-semibold text-gray-500 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stages?.map(stage =>
                                (
                                    <tr key={stage.id} className="coborder-t-2  border-gray-300 text-sm text-gray-700">
                                        <td className="py-1">
                                            <span className='pl-3'>{stage.name}</span>
                                        </td>
                                        <td>{stage.description}</td>
                                        <td className=''>

                                            <div className='flex justify-end items-end'>
                                                <div className='bg-gray-300 rounded-md p-1 w-16 h-8 flex space-x-2'>
                                                    <div
                                                    onClick={()=>{handleEdit(stage)}}
                                                        data-tooltip-target="tooltip-view"
                                                        className="text-yellow-500 p-1 w-1/2 rounded-md bg-white cursor-pointer hover:bg-white hover:text-yellow-700 transition delay-150 duration-300"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                        <div
                                                            id="tooltip-view"
                                                            role="tooltip"
                                                            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                                                        >
                                                            Edit
                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                        </div>
                                                    </div>
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
            <Add togAddStgMdl={togAddStgMdl} setTogAddStgMdl={setTogAddStgMdl} />
            <Edit toggleEditStgMdl={toggleEditStgMdl} setToggleEditStgMdl={setToggleEditStgMdl} />

        </div>
    )
}

export default Stages