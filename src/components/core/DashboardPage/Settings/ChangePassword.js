import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Buttons from '../Buttons';

import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import { changePassword } from '../../../../services/operations/profileOperatins';

const ChangePassword = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pass, setPass] = useState({
        currentPassword: "",
        newPassword: "",
    })

    const [currPassVisible, setCurrPassVisible] = useState(false)
    const [newPassVisible, setNewPassVisible] = useState(false)

    const passHandler = (e) => {
        setPass((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const submitHandler = (e) => {
        try {
            e.preventDefault();
            if (pass.currentPassword === pass.newPassword) {
                toast.error("Your new password should not be same as current password")
            }
            else {

                dispatch(changePassword(token, pass, navigate))
            }
        }
        catch (error) {
            console.log("Error while changing the profile")
            console.error(error.message)

        }
    }
    return (
        <form className='flex flex-col gap-4 my-10' onSubmit={submitHandler}>
            <section className='flex flex-col bg-richblack-800 rounded-lg gap-y-10 p-8 md:px-12 border-[1px] border-richblack-700'>
                <p className='text-lg font-bold'>Password</p>
                <div className=' grid sm:grid-cols-2 max-sm:grid-rows-1 gap-4'>
                    <label>
                        <p className='mb-1 text-sm'>Current Password</p>
                        <div className='flex justify-between items-center w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'>
                            <input
                                required
                                name='currentPassword'
                                type={`${currPassVisible === true ? "text" : "password"}`}
                                placeholder='Enter Current Password'
                                value={pass.currentPassword}
                                onChange={passHandler}
                                className='w-full bg-richblack-700 rounded-md focus-visible:outline-none '
                            />
                            {currPassVisible === false ?

                                (<IoEyeOutline onClick={() => (setCurrPassVisible(true))}
                                    className='cursor-pointer text-richblack-100'
                                />)

                                : (<IoEyeOffOutline onClick={() => (setCurrPassVisible(false))}
                                    className='cursor-pointer text-richblack-100'
                                />)}
                        </div>
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>New Password</p>
                        <div className='flex justify-between items-center w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'>
                            <input
                                required
                                name='newPassword'
                                type={`${newPassVisible === true ? "text" : "password"}`}
                                placeholder='Enter New Password'
                                value={pass.newPassword}
                                onChange={passHandler}
                                className='w-full bg-richblack-700 rounded-md focus-visible:outline-none '
                            />
                            {newPassVisible === false ?

                                (<IoEyeOutline onClick={() => (setNewPassVisible(true))}
                                    className='cursor-pointer text-richblack-100'
                                />)

                                : (<IoEyeOffOutline onClick={() => (setNewPassVisible(false))}
                                    className='cursor-pointer text-richblack-100'
                                />)}
                        </div>
                    </label>
                </div>
            </section>
            <div className='flex justify-end gap-4'>
                <Buttons onclick={() => { navigate("/dashboard/profile") }}
                    content="Cancel" yellow={false} />

                <button type='submit' className='w-fit bg-yellow-50 text-richblack-900 
      rounded-md px-4 py-1.5 font-bold transition-all duration-200
      hover:scale-95 hover:shadow-none'> Save</button>
            </div>
        </form>
    )
}

export default ChangePassword
