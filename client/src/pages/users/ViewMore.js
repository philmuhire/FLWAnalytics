import React from 'react'
import { useSelector } from 'react-redux'
import profile1 from "../../assets/img/profile-picture-2.jpg"
import { getCurrentUser } from '../../services/reducers/userSlice';

const ViewMore = ({ toggleViewMore, setToggleViewMore }) => {
  const user = useSelector(getCurrentUser);
  return (
    <div className={`fixed flex items-center align-center bg-gray-500 bg-opacity-50 z-50 show w-full md:inset-0 md:h-full ${toggleViewMore ? "" : " hidden"}`}>
      <div className="relative w-full h-full flex justify-center p-4 items-center md:h-screen">
        <div className="relative bg-white rounded-lg w-2/5 shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600">

            <div className='flex space-x-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="border border-gray-400 p-1 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="border border-gray-400 p-1 w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setToggleViewMore(false)}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div className='bg-white shadow-md px-2 py-4'>
            <div className='flex justify-start space-x-6 items-center'>
              <img class="w-24 h-24 rounded-full" src={profile1} alt="Rounded avatar" />
              <div className='flex-grow'>
                <h4 className='text-sm text-gray-700 font-bold'>Murenzi Jack</h4>
                <h4 className='text-xs text-gray-400 font-bold mt-1'>UI/UX designer</h4>
                <hr className='my-2' />
                <div className='flex justify-around'>
                  <div>
                    <h4 className='text-xs text-gray-400 font-normal mt-1'>
                      Department:
                      <span className='text-gray-700 ml-5 font-semibold inline-block'>IT Department</span>
                    </h4>
                    <h4 className='text-xs text-gray-400 font-normal mt-1'>
                      Date Hired:
                      <span className='text-gray-700 ml-5 font-semibold inline-block'>12-09-2021</span>
                    </h4>
                  </div>
                  <div>
                    <h4 className='text-xs font-semibold mt-1 text-gray-700 ml-5'>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      employee@gmail.com
                    </h4>
                    <h4 className='text-xs font-semibold mt-1 text-gray-700 ml-5'>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +250780403423
                    </h4>

                  </div>
                </div>

              </div>
            </div>
            <hr className='my-2' />
            <div className='border border-gray-200 my-3'>
              <h3 className='font-bold bg-gray-100 px-2 py-1.5 text-sm mb-3 border-b  border-gray-200'>Personal Info</h3>
              <div className='flex'>
                <div className=' px-3 flex-1'>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Full Names</h4>
                    <h4 className='text-sm font-bold'>Mihigo Yves</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Gender</h4>
                    <h4 className='text-sm font-bold'>Male</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Marital Status</h4>
                    <h4 className='text-sm font-bold'>Married</h4>
                  </div>
                </div>
                <div className=' px-3 flex-1'>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Nationality</h4>
                    <h4 className='text-sm font-bold'>Rwandan</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Education</h4>
                    <h4 className='text-sm font-bold'>Bachelor's in Computer Science</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Address</h4>
                    <h4 className='text-sm font-bold'>Kicukiro, kk 288 st</h4>
                  </div>

                </div>
              </div>

            </div>
            <div className='border border-gray-200 my-3'>
              <h3 className='font-bold bg-gray-100 px-2 py-1.5 text-sm mb-3 border-b  border-gray-200'>Professiona Info</h3>
              <div className='flex'>
                <div className=' px-3 flex-1'>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Employee ID</h4>
                    <h4 className='text-sm font-bold'>Mihigo Yves</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>JobType</h4>
                    <h4 className='text-sm font-bold'>Male</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Date Joined</h4>
                    <h4 className='text-sm font-bold'>Married</h4>
                  </div>
                </div>
                <div className=' px-3 flex-1'>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Job Title</h4>
                    <h4 className='text-sm font-bold'>Software</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Department</h4>
                    <h4 className='text-sm font-bold'>Information Technology</h4>
                  </div>
                  <div className='pb-3'>
                    <h4 className='text-xs text-gray-400'>Status</h4>
                    <h4 className='text-sm font-bold'>Present</h4>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewMore