import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assests/download.png"
import { NavbarLinks } from "../../data/navbar-links"
import { ACCOUNT_TYPE } from "../../utils/constant"
import { IoCartOutline } from "react-icons/io5";
import {  useSelector } from 'react-redux'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { IoIosArrowDown,  IoIosSearch } from "react-icons/io";



const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const {categories} = useSelector((state)=> state.category)
    

    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }


    return (
        <header className={`flex h-14 items-center justify-center border-b-[1px] border-richblack-700
        ${location.pathname === "/" ? "bg-richblack-900" : "bg-richblack-800"}`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                <Link to={"/"}>
                    <img src={logo} width={160} loading='lazy' />
                </Link>

                {/* links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog"
                                            ? (<div className='relative flex items-center gap-1 group'>
                                        
                                                <p>{link.title}</p>
                                                <IoIosArrowDown/>
                                                
                                                <div className='z-[500] absolute top-10 pt-5 p-2 flex flex-col rounded-md bg-richblack-5 
                                                invisible opacity-0 transition-all duration-200 group-hover:visible 
                                                group-hover:opacity-100 lg:w-72 -left-[80%] gap-2'> 

                                                    <div className=' z-[1000] absolute w-6 h-6 rounded-sm rotate-45 bg-richblack-5 
                                                    left-[40%] translate-x-[5%] -translate-y-[48%] top-0'/>
                                                    {
                                                        categories.map((link, index) => (
                                                            <Link to={`/catalog/${link.categoryName.toLowerCase().replace(" ", "-")}`} key={index}>
                                                                <p className='text-richblack-900 hover:bg-richblack-50 rounded-md px-2 py-2'> {link.categoryName}</p>
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            )
                                            : (
                                                <Link to={link?.path}
                                                    className={`${matchRoute(link?.path) !== null ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </Link>
                                            )
                                    }

                                </li>
                            ))
                        }

                    </ul>
                </nav>

                <div className='flex gap-4 items-center justify-center text-richblack-100 text-base'>
                    {/* <Link to={"search"}>
                        <IoIosSearch className='text-2xl'/>
                    </Link> */}
                    {   
                       token && token!== null && user && user?.role === ACCOUNT_TYPE.STUDENT && (
                            <Link to={"/dashboard/cart"} className='relative'>
                                <IoCartOutline className='text-2xl'/>
                                {
                                    totalItems > 0 && (
                                        <span className='absolute rounded-full bg-yellow-300 p-2 '>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        (token === null) && (
                           
                            <button className='border-[1px] border-richblack-700 bg-richblack-800 rounded-md px-3 py-2 cursor-pointer'>
                                <Link to={"/login"}>
                                    Log in
                                </Link>
                            </button>
                        )
                    }
                    {
                        token === null && (
                            <button className='border-[1px] border-richblack-700 bg-richblack-800 rounded-md px-3 py-2 cursor-pointer'>
                                <Link to={"/signup"}>
                                    Sign up
                                </Link>
                            </button>

                        )
                    }
                    {/* profile pic */}
                    {
                        token !== null && <ProfileDropdown/>
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar
