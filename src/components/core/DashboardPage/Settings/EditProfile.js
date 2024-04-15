import React from 'react'
import {useForm} from 'react-hook-form'
import { updateProfile } from '../../../../services/operations/profileOperatins';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Buttons from '../Buttons';

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const gender = ["Male", "Female", "Non Binary", "Prefer not say", "Others"]

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const profileSubmitHandler = (data) => {
        try {
            console.log(data)
            dispatch(updateProfile(token, data))
        }
        catch (error) {
            console.log("error while updating the profile")
            console.log(error.message);
        }
    }
    return (
        <form className='flex flex-col gap-4 my-10' onSubmit={handleSubmit(profileSubmitHandler)}>
            <section className='flex flex-col tracking-wide bg-richblack-800 rounded-lg gap-y-10 p-8 md:px-12 border-[1px] border-richblack-700'>
                <p className='text-lg font-bold'>Profile Information</p>

                <div className='grid grid-rows-3 sm:grid-cols-2 gap-6'>
                    <label>
                        <p className='mb-1 text-sm'>First Name</p>
                        <input
                            id="firstName"
                            name='firstName'
                            type='text'
                            placeholder="Write your First Name"
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                            className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                        />

                        {errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your first name.
                            </span>
                        )}
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>Last Name</p>
                        <input
                            id="lastName"
                            name='lastName'
                            type='text'
                            placeholder="Write your Last Name"
                            {...register("lastName", { required: true })}
                            defaultValue={user?.lastName}
                            className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                        />
                        {errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                            </span>
                        )}
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>Date of Birth</p>
                        <input
                            id="dateOfBirth"
                            name='dateOfBirth'
                            type='date'
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your date of birth"
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of birth cannot be in future..."
                                },
                            })}
                            defaultValue={user?.profile?.dateOfBirth}
                            className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                        />
                        {
                            errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )
                        }
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>Gender</p>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            className="w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none"
                            {...register("gender", { required: true })}
                            defaultValue={user?.profile?.gender}
                        >
                            {gender.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })}
                        </select>
                        {errors.gender && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your Date of Birth.
                            </span>
                        )}
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>Contact No.</p>
                        <input
                            name='contactNo'
                            type='tel'
                            placeholder='Write phone number'
                            {...register("contactNo" , 
                            {
                                required: {
                                    value: true,

                                },
                                minLength : {
                                    value: 10,
                                    message: "Invalid Contact Number"
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Invalid Contact Number"
                                },

                            })}
                            className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                        />
                    </label>

                    <label>
                        <p className='mb-1 text-sm'>About</p>
                        <input
                            name='about'
                            type='text'
                            placeholder='Write something about yourself'
                            {...register('about' , {
                                required:  {
                                    value: true,
                                    message: "Please write something about yourself"
                                }, 
                                maxLength :{
                                    value: 50,
                                    message: "The message is to big"
                                },
                            })}
                            maxLength={50}
                            className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                        />
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

export default EditProfile
