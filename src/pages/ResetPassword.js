import React from 'react'

import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/authOperations'


const ResetPassword = () => {

  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p className='mb-1 text-md text-richblack-5'>Email Address <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] cursor-pointer bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
