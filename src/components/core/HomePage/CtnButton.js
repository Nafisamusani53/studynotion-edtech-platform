import React from 'react'

import { Link } from 'react-router-dom';

const CtnButton = ({text, flag, linkto, children}) => { 
    let style = `${flag? `w-fit bg-yellow-50 text-richblack-900 shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.51)_inset]`
     : `bg-richblack-800 text-richblack-5 shadow-[-2px_-2px_0px_0px_rgba(255,255,255,0.18)_inset]`}`
     const arrowStyle= `${children? `flex flex-row gap-2 items-center`: ``}`
  return (
    <Link to={linkto} className={`${style} ${arrowStyle} rounded-md px-6 py-3 font-bold transition-all duration-200
    hover:scale-95 hover:shadow-none `}>
        {text}
        {/* { arrow? <FaArrowRight className='text-[15px] font-bold'/> : ""} */}
        {children}
    </Link>
  )
}

export default CtnButton
