import React,{useState} from 'react'

const Login = () => {
    const[role, setRole] = useState("Student")
    const[data, setData] = useState({
        email:"",
        password:""
    })

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
        data.role = role;
        console.log(data);
        setData({
            email:"",
            password:""
        })
    }
  return (
    <form onSubmit={submitHandler}>
        <div className='text-richblack-5'>
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
                <p className='text-richblack-5'>Email Address <span>*</span></p>
                <input
                    required
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={data.email}
                    onChange={changeHandler}
                />
            </label>
        </div>
        <div>
        <label>
                <p className='text-richblack-5'>Password <span>*</span></p>
                <input
                    required
                    name='password'
                    type='password'
                    placeholder='Enter Password'
                    value={data.password}
                    onChange={changeHandler}
                />
            </label>
        </div>
        <div>
            <button className='text-richblack-5'>Sign In</button>
        </div>
    </form>
  )
}

export default Login
