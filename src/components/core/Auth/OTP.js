import React , {useState, useEffect} from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { sendOTP, signup } from '../../../services/operations/authOperations'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import { FaClockRotateLeft } from "react-icons/fa6";

const OTP = () => {
    const {signupData, token} = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");

    // have another way for this using Open and private route
    useEffect(() => {
        // only allow access to this route when user has filled up the signup form
        if(!signupData){
            navigate("/signup")
        }
    },[])

    const submitHandler = async(e) => {
        e.preventDefault();
        console.log("SignupData" , signupData)
        // const data = {...signupData}
        // console.log(data)
        dispatch(signup(signupData, otp, navigate))
        setOtp("");
    }

    const clickHandler = (e) => {
        e.preventDefault();
        dispatch(sendOTP(signupData.email, navigate))
    }
    
  return (
    <div className= 'm-auto flex flex-col justify-center gap-6'>
        <h1 className='text-richblack-5 text-4xl font-bold'>
            Verify Email
        </h1>
        <p className='text-richblack-100 text-xl w-[75%]'>
        A verification code has been sent to you. Enter the code below
        </p>
      <form onSubmit={submitHandler} className='flex flex-col items-center gap-10'>
      <OTPInput
            value={otp}
            numInputs={6}
            onChange={setOtp}
            containerStyle={"gap-8"}
            inputStyle={"bg-richblack-800 text-richblack-5 rounded-md text-3xl shadow-[0px_1px_0px_0px_rgba(255,255,255,0.3)] !w-16 !h-14"}
            onFocus={"border-yellow-50 border-2 rounded-md"}
            renderInput={(props) => <input {...props} />}
            
        />
        <button type='submit' className='w-full text-xl rounded-md px-6 py-3 font-bold bg-yellow-50
         text-richblack-900 shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset]'>
         Verify and Register</button>
         <div className='w-full flex justify-between'>
            <Link to="/login">
                <div className="text-richblack-5 flex gap-3 items-center text-lg" >
                    <FaArrowLeftLong/>
                    <p>Back to login</p>
                </div>
            </Link>

            <button onClick={clickHandler}> 
                <div className='text-blue-100 flex gap-3 items-center text-lg'>
                    <FaClockRotateLeft/>
                    <p>Resend it</p>
                </div>
            </button>
         </div>
      </form>
      
    </div>
  )
}

export default OTP
