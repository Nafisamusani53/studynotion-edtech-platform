import React,{useState} from 'react'
import CountryCode from '../../data/countryCode.json'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
// bug is there
// in contact no and country code
// when the role is changed in after the submission a bug is introduced
// in the contact no field

const Signup = () => {

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
    


    const changeHandler=(event)=>{
        setData((prev)=>(
            {...prev,
            [event.target.name] : event.target.value
            }
        ))
    }

    const submitHandler = async(event)=>{
        event.preventDefault();
        try {
            data.role = role;
            const response = await axios.post("http://localhost:4000/api/v1/auth/sendOTP", {email : data.email});
            console.log(response); // Log the entire response object to see its structure
    
            // Assuming the response contains a property named 'success'
            if (response.data.success) {
                console.log("OTP sent successfully");
                data.otp = parseInt(response.data.otp);
                try {
                    const account = await axios.post("http://localhost:4000/api/v1/auth/signup", data);
                    console.log(account.data);
                } catch (error) {
                    console.log("Error while creating account");
                }
            } else {
                console.log("OTP not sent successfully");
            }
        } catch (error) {
            console.log("Error while sending OTP");
        }
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
    <form onSubmit={submitHandler} >
        {/* Set account type */}
        <div className='text-richblack-5 cursor-pointer'>
            <p
                onClick={()=>{setRole("Student")}}
                className={`${role === "Student" ? "" : ""}`}
            >Student</p>
            <p
                onClick={()=>{setRole("Instructor")}}
                className={`${role === "Instructor" ? "" : ""}`}
            >Instructor</p>
        </div>
        <div>
            <label>
                <p className='text-richblack-5'>First Name <span>*</span></p>
                <input
                    required
                    name='firstName'
                    type='text'
                    placeholder='Enter first Name'
                    value={data.firstName}
                    onChange={changeHandler}
                />
            </label>
            <label>
                <p className='text-richblack-5'>Last Name <span>*</span></p>
                <input
                    required
                    name='lastName'
                    type='text'
                    placeholder='Enter last Name'
                    value={data.lastName}
                    onChange={changeHandler}
                />
            </label>
        </div>
        <div>
        <label>
            <select
                name='countryCode'
                required
                id='countryCode'
                onChange={changeHandler}
                value={data.countryCode}
            >

            {
                CountryCode.map((country, index) => (
                    <option value={country.code} key={index}
                    >{country.code} {country.country}</option>
                ))
            }

            </select>
        </label>
            <label>
                <p className='text-richblack-5'>Contact Number <span>*</span></p>
                <input
                    required
                    name='contactNo'
                    type='digit'
                    max={10}
                    placeholder='Enter contact number'
                    value={data.contactNo}
                    onChange={changeHandler}
                />
            </label>
        </div>

        <div>
            <label>
                <p className='text-richblack-5'>Email Address <span>*</span></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter email address'
                    value={data.email}
                    onChange={changeHandler}
                />
            </label>
        </div>

        <div>
            <label>
                <p className='text-richblack-5'>Create Password <span>*</span></p>
                <input
                    required
                    name='password'
                    type='password'
                    placeholder='Enter password'
                    value={data.password}
                    onChange={changeHandler}
                />
            </label>

            <label>
                <p className='text-richblack-5'>Confirm Password <span>*</span></p>
                <input
                    required
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm password'
                    value={data.confirmPassword}
                    onChange={changeHandler}
                />
            </label>

        </div>
        <div>
            <button className='text-richblack-5'>Create Account</button>
        </div>
    </form>
  )
}

export default Signup
