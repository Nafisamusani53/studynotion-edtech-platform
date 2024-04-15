import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { login } from '../../../services/operations/authOperations';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[data, setData] = useState({
        email:"",
        password:""
    })
    const[showPassword, setShowPassword] = useState(false)

    const changeHandler = (event) => {
        setData((prev)=>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(data);
        dispatch(login(data,navigate))
        setData({
            email:"",
            password:""
        })
    }
  return (
    <form onSubmit={submitHandler} className=' w-[34vw] flex flex-col gap-10 text-richblack-5'>
        {/* Form - Input fields */}
       <div className='flex flex-col gap-4 '>
       <div className='w-full'>
            <label>
                <p className='mb-1 text-md'>Email Address <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={data.email}
                    onChange={changeHandler}
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
        </div>
        <div>
        <label>
                <p className='mb-1 text-md'>Password <sup className='text-pink-200'>{` *`}</sup></p>
                <div className='flex justify-between items-center bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                        px-3 py-3 text-lg'>
                    <input
                        required
                        name='password'
                        type={`${showPassword === true ? "text" : "password"}`}
                        placeholder='Enter Password'
                        value={data.password}
                        onChange={changeHandler}
                        className='bg-richblack-700 rounded-md focus-visible:outline-none'
                    />
                    {showPassword === false ? 

                    (<IoEyeOutline onClick={() => (setShowPassword(true))}
                        className='cursor-pointer text-richblack-100'
                    />) 

                    : (<IoEyeOffOutline onClick={() => (setShowPassword(false))}
                        className='cursor-pointer text-richblack-100'
                    />)}
                </div>
            </label>
            <Link to={"/reset-password"} className='w-full text-right'>
                <p className='text-blue-100'>Forgot Password</p>
            </Link>
        </div>
       </div>
        
        <button type='submit'>
            <div className='bg-yellow-50 text-richblack-900 text-lg cursor-pointer
            shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset] rounded-md px-6 py-3 font-bold'>
                Sign In
            </div>
        </button>

    </form>
  )
}

export default Login
