import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNProduce, getAllFP, getFPStatus } from '../../../services/reducers/foodProcessSlice'

const FindProduce = () => {

    const dispatch = useDispatch();
    const status = useSelector(getFPStatus)
    const foodProcesses = useSelector(getAllFP)
    // useEffect(() => {
    //     dispatch(fetchNProduce())
    // }, [])

    useEffect(() => {
        if (status === 'deleted') {
            dispatch(fetchNProduce())
        }
    }, [status])
    return (
        <div>
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
                                <td className="text-right flex justify-end items-center space-x-3">
                                    <div className='bg-gray-300 rounded-md p-1 w-16 h-8 flex space-x-2'>
                                        <div
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
                                        {/* <div
                                                        onClick={() => {
                                                            const confirmBox = window.confirm(
                                                                "Do you really want to delete this record?"
                                                            )
                                                            if (confirmBox === true) {
                                                                dispatch(deleteFoodProcess(fp.id))
                                                            }
                                                        }}

                                                        data-tooltip-target="tooltip-view"
                                                        className="text-red-500 p-1 w-1/2 rounded-md bg-white cursor-pointer hover:bg-white hover:text-red-700 transition delay-150 duration-300"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                                            <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                                                        </svg>

                                                        <div
                                                            id="tooltip-view"
                                                            role="tooltip"
                                                            className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                                                        >
                                                            Delete
                                                            <div className="tooltip-arrow" data-popper-arrow></div>
                                                        </div>
                                                    </div> */}
                                    </div>

                                </td>
                            </tr>
                        )
                        )
                    }

                </tbody>

            </table>
            {/* <nav>
                            <ul class="inline-flex items-center -space-x-px">
                                <li>
                                    <a onClick={() => { setPage(fetchState.page - 1) }} class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                                <li>
                                    <a class="cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{fetchState.page}</a>
                                </li>
                                <li>
                                    <a onClick={() => { setPage(fetchState.page + 1) }} class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </nav> */}
        </div>
    )
}

export default FindProduce