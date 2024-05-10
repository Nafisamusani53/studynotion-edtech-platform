import React,{useState} from 'react'
import CountryCode from '../../../data/countryCode.json'
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP } from '../../../services/operations/authOperations';
import { setSignupData } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
// bug is there
// in contact no and country code 
// when the role is changed in after the submission a bug is introduced
// in the contact no field
// --FIXED--

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData} = useSelector((state) => state.auth)
    const[data, setData] = useState({
        firstName:"",
        lastName:"",
        contactNo:"",
        email:"",
        password:"",
        confirmPassword:"",
        countryCode :"+91",
    })
    const[role, setRole] = useState("Student")
    const[showPassword, setShowPassword] = useState(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState(false)
    

    const changeHandler=(event)=>{
        setData((prev)=>(
            {...prev,
            [event.target.name] : event.target.value
            }
        ))
    }

    const submitHandler = async(event)=>{
        event.preventDefault();
        data.role = role;
        dispatch(setSignupData(data));
        console.log("In SignUP form",signupData)

        dispatch(sendOTP(data.email, navigate));
        // try {
        //     data.role = role;
        //     const response = await axios.post("http://localhost:4000/api/v1/auth/sendOTP", {email : data.email});
        //     console.log(response); // Log the entire response object to see its structure
    
        //     // Assuming the response contains a property named 'success'
        //     if (response.data.success) {
        //         console.log("OTP sent successfully");
        //         data.otp = parseInt(response.data.otp);
        //         try {
        //             const account = await axios.post("http://localhost:4000/api/v1/auth/signup", data);
        //             console.log(account.data);
        //         } catch (error) {
        //             console.log("Error while creating account");
        //         }
        //     } else {
        //         console.log("OTP not sent successfully");
        //     }
        // } catch (error) {
        //     console.log("Error while sending OTP");
        // }
        setData({
            firstName: "",
            lastName: "",
            contactNo: "",
            email: "",
            password: "",
            confirmPassword: "",
            countryCode: "+91",
        });
        
    }

  return (
    <form onSubmit={submitHandler} className=' w-[34vw] flex flex-col gap-10 text-richblack-5'>
        {/* set account type - TAB */}
        <div className='text-richblack-200 flex py-1 px-1 gap-2 text-md w-fit
                    bg-richblack-800 rounded-full items-center justify-between
                    shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset] -mb-4 cursor-pointer'>
            <p 
                onClick={()=>{setRole("Student")}}
                className={`${role === "Student" ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"} 
                            px-5 py-2 rounded-full`}
            >Student</p>
            <p 
                onClick={()=>{setRole("Instructor")}}
                className={`${role === "Instructor" ? "bg-richblack-900 text-richblack-5" : "bg-richblack-800"} 
                px-5 py-2 rounded-full`}
            >Instructor</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div  className="flex gap-4">
            <label>
                <p className='mb-1 text-md'>First Name <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='firstName'
                    type='text'
                    placeholder='Enter first Name'
                    value={data.firstName}
                    onChange={changeHandler} 
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
            <label>
                <p className='mb-1 text-md'>Last Name <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='lastName'
                    type='text'
                    placeholder='Enter last Name'
                    value={data.lastName}
                    onChange={changeHandler} 
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
        </div>
{/*         
        <label>
        <p className='mb-1 text-md'>Contact Number <sup className='text-pink-200'>{` *`}</sup></p>
        <div className="flex gap-4">
            <select
                name='countryCode'
                required
                id='countryCode'
                onChange={changeHandler} 
                className='bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none w-[30%]'
                value={data.countryCode}
            >

            {
                CountryCode.map((country, index) => (
                    <option value={country.code} key={index}
                    className='bg-richblack-5 text-richblack-900 w-[30%]'>{country.code}</option>
                ))
            }

            </select>
                
                <input
                    required
                    name='contactNo'
                    type='digit'
                    max={10}
                    placeholder='Enter contact number'
                    value={data.contactNo}
                    onChange={changeHandler} 
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
                </div>
            </label> */}

        <div>
            <label>
                <p className='mb-1 text-md'>Email Address <sup className='text-pink-200'>{` *`}</sup></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter email address'
                    value={data.email}
                    onChange={changeHandler} 
                    className='w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg focus-visible:outline-none'
                />
            </label>
        </div>

        <div  className="flex gap-4 justify-between">
            <label >
                <p className='mb-1 text-md'>Create Password <sup className='text-pink-200'>{` *`}</sup></p>
                <div  className='flex justify-between items-center
                 bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg '>
                    <input
                    required
                    name='password'
                    type={`${showPassword === true ? "text" : "password"}`}
                    placeholder='Enter password'
                    value={data.password}
                    onChange={changeHandler} 
                   className='bg-richblack-700 rounded-md focus-visible:outline-none w-[80%]'
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

            <label>
                <p className='mb-1 text-md'>Confirm Password <sup className='text-pink-200'>{` *`}</sup></p>
                <div className='flex justify-between items-center bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
                    px-3 py-3 text-lg'>
                    <input
                        required
                        name='confirmPassword'
                        type={`${showConfirmPassword === true ? "text" : "password"}`}
                        placeholder='Confirm password'
                        value={data.confirmPassword}
                        onChange={changeHandler} 
                        className='bg-richblack-700 rounded-md focus-visible:outline-none w-[80%]'
                    />
                    {showConfirmPassword === false ? 

                    (<IoEyeOutline onClick={() => (setShowConfirmPassword(true))}
                        className='cursor-pointer text-richblack-100'
                    />) 

                    : (<IoEyeOffOutline onClick={() => (setShowConfirmPassword(false))}
                        className='cursor-pointer text-richblack-100'
                    />)}
                </div>
            </label>

        </div>
        </div>
        <button type='submit'>
            <div className='bg-yellow-50 text-richblack-900 
            shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset] rounded-md px-6 py-3 font-bold cursor-pointer'>
                Create Account
            </div>
        </button>

    </form>
  )
}

export default Signup
