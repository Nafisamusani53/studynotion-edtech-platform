import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowDropdown } from "react-icons/io";
import { VscDashboard, VscSignOut} from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authOperations';

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate();
  const ref = useRef();


  useOnClickOutside(ref, () => setVisible(false));

  if (!user) 
  {
    return null
  }

  return (
    <div className='relative' onClick={() => setVisible((prev)=>!prev)}>
      <div className='flex gap-1 items-center cursor-pointer'>
        <img src={user?.image}
          alt={`profile-${user?.firstname}`}
          className='rounded-full w-8 h-8' />
        <IoMdArrowDropdown className='text-2xl text-richblack-400' />
      </div>

      {
        visible && (
          <div 
          className={`flex z-[1000] flex-col absolute right-0 top-full mt-2 border-[1px] border-richblack-700 bg-richblack-800 
            rounded-md cursor-pointer divide-y-[1px] divide-richblack-700
            ${visible === true ? "block opacity-100 " : "hidden opacity-0"} transition-all duration-200`}
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            >

            <Link to="/dashboard/profile" onClick={() => setVisible(false)}
              className='flex gap-2 items-center px-3 py-2  hover:bg-richblack-600 hover:text-richblack-25'>
              <VscDashboard className='text-lg'/>
              <p>Dashboard</p>
            </Link>

            <button 
              onClick={() => {
                dispatch(logout(navigate))
                setVisible(false)
             }}
              className='flex gap-2 items-center px-3 py-2  hover:bg-richblack-600 hover:text-richblack-25'>
              <VscSignOut className='text-lg'/>
              <p>Logout</p>
            </button>
          </div>
        )
      }
    </div>
  )
}

export default ProfileDropdown
