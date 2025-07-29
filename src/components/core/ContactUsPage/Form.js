import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import countryCode from "../../../data/countryCode.json"
import { useDispatch } from 'react-redux'
import { contactUsEmail } from '../../../services/operations/contactUsOperations'

const Form = () => {

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted}
    } = useForm()

    useEffect(()=>{
        if(isSubmitted){
            reset({
                firstName : "",
                lastName : "",
                email : "",
                contactNumber : "",
                message : ""
            }
            )
        }
    },[reset,isSubmitted])
    const messageHandler = (data) => {
        try{
            dispatch(contactUsEmail(data))

        }catch(err){
            console.log("Error while email")

        }

    }

    return (
        <form onSubmit={handleSubmit(messageHandler)}>
            <div className='grid grid-cols-2 grid-flow-row-dense gap-4 gap-y-6'>
                <label>
                    <p className='text-richblack-5 mb-2'>First Name</p>
                    <input
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        type='text'
                        {...register("firstName", {
                            required: true
                        })}
                        className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your first name.
                            </span>
                        )
                    }
                </label>


                <label>
                    <p className='text-richblack-5 mb-2'>Last Name</p>
                    <input
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        type='text'
                        {...register("lastName", {
                            required: true
                        })}
                        className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                    />
                    {
                        errors.lastName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your last name.
                            </span>
                        )
                    }

                </label>

                <label className='col-span-2'>
                    <p className='text-richblack-5 mb-2'>Email Address</p>
                    <input
                        name='email'
                        id='email'
                        placeholder='Enter email address'
                        type='email'
                        {...register("email", {
                            required: true
                        })}
                        className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                    />
                    {
                        errors.email && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your email address.
                            </span>
                        )
                    }

                </label>

                <div className='col-span-2'>
                    <p className='text-richblack-5 mb-2'>Contact Number</p>
                    <div className='grid grid-cols-[0.3fr_1fr] gap-4'>
                        <label>
                            <select
                                name='code'
                                id='code'
                                {...register("code", { required: true })}
                                className='appearance-none bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none overflow-hidden w-full'
                            >
                                {
                                    countryCode.map((code, index) => (
                                        <option value={code.code} key={index}>
                                            {`${code.country} ${code.code}`}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>

                        <label>
                            <input
                                name="contactNumber"
                                id='contactNumber'
                                type='tel'
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please Enter Contact Nuber"
                                    }
                                })}
                                placeholder='Please Enter phone number'
                                className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                            />
                        </label>
                    </div>


                </div>

                <label className='col-span-2'>
                    <p className='text-richblack-5 mb-2'>Message</p>
                    <textarea
                        name='message'
                        id='message'
                        rows={5}
                        {...register("message", { required: true })}
                        placeholder='Enter your message here'
                        className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                px-3 py-3 text-lg focus-visible:outline-none'
                    />
                    {
                        errors.message && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your message.
                            </span>
                        )
                    }

                </label>

                <button className='col-span-2 bg-yellow-50 text-richblack-900 rounded-md text-xl text-center px-4 py-2 
                                font-bold transition-all duration-200 hover:scale-95 hover:shadow-none' type='submit'>
                    Send Message
                </button>
            </div>
        </form>
    )
}

export default Form
