import React, { useEffect, useState } from 'react'
import logo from "../assets/img/FLWAnalytics-3.png"
import ErrorAlert from '../components/ErrorAlert'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthStatus, login } from '../services/reducers/authSlice'
import { useNavigate } from 'react-router-dom'



const SignIn = () => {

    const [loginState, setLoginState] = useState({ username: "", password: "" });
    const [errorHandler, setErrorHandler] = useState({ hasError: false, errorMessage: "" })
    const auth = JSON.parse(localStorage.getItem(process.env.REACT_APP_AUTH))
    const status = useSelector(getAuthStatus);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginState({ ...loginState, [name]: value })
    };

    const handleSubmit = () => {
        try {
            dispatch(login(loginState))
            navigate("/admin/overview")
        } catch (error) {
            setErrorHandler({ hasError: true, errorMessage: error })
        }

    }

    useEffect(() => {
        if (status === "success") {
            navigate('/admin/overview')
        }

    }, [status])
    
    useEffect(() => {
        if (auth !== null) {
            console.log("is logged in")
            console.log(auth)
            navigate('/admin/overview')
        }
    }, [auth])



    return (
        <div className='w-full h-screen bg-gradient-to-tr from-dark-green to-light-green flex justify-around items-center space-around'>
            <div className=' w-1/3 px-2 py-3'>
                {/* <h1 className='font-medium text-xl tracking-wider text-white'>Welcome Back to <span className='font-extrabold text-3xl block'>EMS</span> </h1>
                <p className='text-gray-200 font-light'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </p>
                <div class="flex my-5  -space-x-4 items-center">
                    <img class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src={profile1} alt="" />
                    <img class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src={profile2} alt="" />
                    <img class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src={profile3} alt="" />
                    <img class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" src={profile4} alt="" />
                    <p className='text-sm text-gray-200 item-center pl-8'>3k+ people have joined us, now it's your turn</p>
                </div> */}
                <img src={logo}/>
            </div>
            <div className='bg-white w-1/3 h-3/5 rounded-md'>
                <h2 className='px-10 py-2 font-semibold text-2xl'>Sign In</h2>
                <ErrorAlert errorHandler={errorHandler} />
                <form className='flex  flex-col items-center py-3'>
                    <div className="relative z-0 w-4/5 mb-6 group">
                        <input type="email" name="username" onChange={(e) => { handleChange(e) }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required="" autoComplete='off' />
                        <label htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            username</label>
                    </div>
                    <div className="relative z-0 w-4/5 mb-6 group">
                        <input type="password" name="password" id="password" onChange={(e) => { handleChange(e) }}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required="" autoComplete='off' />
                        <label htmlFor="password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <div className="w-4/5 flex justify-between items-center">
                        <a href="forgot-password.html" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                        <button
                            type="button"
                            onClick={() => { handleSubmit() }}
                            className="w-2/5 bg-blue-500 cursor-pointer px-4 py-2 font-medium text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 dark:focus:ring-offset-darker"
                        >
                            Login
                        </button>
                    </div>
                    <div className='w-4/5 my-8'>
                        <p className='text-xs'>Protected by reCAPTCHA card subject to <span className='text-blue-600'>EMG privacy policy</span> <br />and
                            <span className='text-blue-600'> Terms of Service</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn