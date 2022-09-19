import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ErrorAlert from '../../../components/ErrorAlert';
import { addNewProcess, fetchactivities, getActError, getActStatus } from '../../../services/reducers/activitySlice';
import { fetchFirst } from '../../../services/reducers/cropSlice';
import { fetchStages, selectAllStages } from '../../../services/reducers/stageSlice';
import { validateProcess } from '../../../utils/functions';

const Add = ({ togAddProMdl, setTogAddProMdl }) => {
    const dispatch = useDispatch();
    const [submit, setSubmit] = useState(false)
    const [formErrors, setFormErrors] = useState({ 1: 1 })

    const stages = useSelector(selectAllStages)


    const [processState, setProcessState] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProcessState({ ...processState, [name]: value })
    };
    const handleSubmit = () => {
        setFormErrors(validateProcess(processState));
    }

    const status = useSelector(getActStatus)
    const error = useSelector(getActError)


    useEffect(() => {
        if (Object.keys(formErrors).length === 0) {
            console.log("there are no error");
            setSubmit(true)
        } else {
            console.log("validation errors")
            console.log(formErrors)
            setSubmit(false)
        }
    }, [formErrors])

    useEffect(() => {
        if (submit) {
            console.log("submitting")
            try {
                dispatch(addNewProcess(processState));
            } catch (err) {
                console.log(err)
            }
        }
    }, [submit])


    useEffect(() => {
        if (status === "succeeded-addprocess") {
            console.log("got here")
            document.getElementById("savestage").reset()
            setTogAddProMdl(false)
            dispatch(fetchactivities())
            setFormErrors({ 1: 1 })
        }
    }, [status])

    useEffect(() => {
        dispatch(fetchStages())
    }, [])




    return (
        <div className={`fixed flex items-center align-center bg-gray-500 bg-opacity-50 z-50 show w-full md:inset-0 md:h-full ${togAddProMdl ? "" : " hidden"}`}>
            <div className="relative w-full h-full flex justify-center p-4 items-center md:h-screen">
                <div className="relative bg-white rounded-lg w-1/4 shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-sm font-bold text-center text-gray-900 dark:text-white">
                            Add Process
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setTogAddProMdl(false)}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                    {
                        status === "failed" ? <ErrorAlert message={error} /> : ""
                    }

                    <form id='savestage' onSubmit={handleSubmit} className='flex  flex-col items-center py-3'>
                        <div className="relative z-0 w-4/5 mb-3 group">
                            <input type="text" name="name" onChange={(e) => { handleChange(e) }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required="" autoComplete='off' />
                            <label htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Name
                            </label>
                            <p className="text-xs text-red-500">{formErrors.name}</p>

                        </div>
                        <div className="relative z-0 w-4/5 mb-3 group">
                            <input type="text" name="description" onChange={(e) => { handleChange(e) }}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required="" autoComplete='off' />
                            <label htmlFor="name"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Description
                            </label>
                            <p className="text-xs text-red-500">{formErrors.description}</p>

                        </div>
                        <div className="relative z-0 w-4/5 mb-3 group">
                            <select name="stageId" onChange={(e) => { handleChange(e) }}
                                className="block text-sm pl-2 py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" " required="" autoComplete='off' >
                                <option className='text-xs' value="">Select stage</option>
                                {
                                    stages.length > 0 ? (
                                        stages.map(stage =>
                                            <option className='text-xs' value={stage.id}>{stage.name}</option>
                                        )) : ""
                                }
                            </select>
                            <p className="text-xs text-red-500">{formErrors.stageId}</p>
                        </div>

                        <div className="w-5/6 flex justify-end items-center">
                            <button
                                onClick={() => { handleSubmit() }}
                                type="button"
                                className="w-2/5 bg-blue-500 cursor-pointer px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker"
                            >
                                {
                                    status === "loading" ? (<div className='flex items-center space-x-'>
                                        <svg class="inline mr-1 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg><span>Saving...</span></div>) : "Save"

                                }
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}

export default Add