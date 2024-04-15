import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SlSettings } from "react-icons/sl";
import { VscSignOut } from 'react-icons/vsc';
import { logout } from '../../../services/operations/authOperations';


const Sidebar = () => {
    const { user } = useSelector((state) => state.profile)
    // const student = sidebarLinks.filter((link) => link.type === undefined || link.type === user.role)
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <aside className="md:visible invisible px-auto flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <ul className='flex flex-col pb-8'>
          {
            sidebarLinks.map((link, index) => {
              if(link.type === undefined || link.type === user?.role){
                return (
                  <li key={index} className='flex gap-3 relative font-inter px-8 py-2 text-sm text-richblack-300'>
                    <link.icon className='text-lg'/>
                    <Link to={link.path}>
                    <p className=' tracking-[0.08em]'>{link.name}</p>
                    </Link>
                </li>)
              }
            })
          }
        </ul>
        <ul className='flex flex-col pb-8 px-6 '>
          <li className='flex gap-3 relative font-inter px-2 py-2 pt-8 text-richblack-300 border-t-[1px] border-richblack-700 '>
            <SlSettings className='text-lg'/>
            <Link to={"/dashboard/settings"}>
              <p className=' font-[500] font-inter text-sm tracking-[0.08em]'>Settings</p>
            </Link>
          </li>
          
          <li >
            <button onClick={(e) => {e.preventDefault()
                                      dispatch(logout(navigate))}} className='flex gap-3 px-2 relative font-inter py-2 text-richblack-300'>
              <VscSignOut className='text-lg'/>
              <p className=' font-[500] font-inter text-sm tracking-[0.08em]'>Logout</p>
            </button>
          </li>
        </ul>
      </aside>
  )
}

export default Sidebar
