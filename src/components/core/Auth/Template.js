import React from 'react'
import Signup from './Signup'
import Login from './Login'
import signup from "../../../assests/Signup.png"
import login from "../../../assests/Login.png"
import frame from "../../../assests/Frame.png"

const Template = ({heading,des1, des2, formType}) => {
  const image = formType === "login" ? (login) : (signup);
  return (
    <div className='w-full flex justify-between px-16 py-16'>
      {/* 1 section */}
      <div className='flex flex-col gap-6 items-center justify-center'>
        {/* Description */}
        <div className='flex flex-col gap-3 w-[34vw]'>
          <h1 className='text-3xl font-bold  text-richblack-5'>{heading}</h1>
          <div className='flex flex-col'>
          <p className='text-richblack-100 text-lg'>{des1}</p>
          <p className='font-edu-sa font-bold italic text-blue-100'>{des2}</p>
          </div>
        </div>

        {/* form */}
        {
          formType === "login" ? (<Login/>) : (<Signup/>)
        }
      </div>

      {/* 2 section */}
      <div className='relative flex justify-center '>
        <img src = {frame} className='absolute w-[28rem] h-[25rem] top-4 left-4 '/>
        <img src={image} className='relative w-[28rem] h-[25rem]'/>
      </div>
    </div>
  )
}

export default Template
