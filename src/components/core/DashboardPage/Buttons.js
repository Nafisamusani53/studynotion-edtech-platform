import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Buttons = ({content, onclick, yellow, disabled, type, children}) => {
    let style = `${yellow? 'bg-yellow-50 text-richblack-900' : 'bg-richblack-800 text-richblack-5'}`
     const iconStyle= `${children? 'flex flex-row gap-2 items-center justify-center': ''}`
  return (
    <button onClick={onclick} disabled={disabled} type= {type} className = {`${style} ${iconStyle} rounded-md px-4 py-1.5 
    font-bold transition-all duration-200
    hover:scale-95 hover:shadow-none`}>
      {content}
      {children}
    </button>
  )

  // text,
  // onclick,
  // children,
  // disabled,
  // outline = false,
  // customClasses,
  // type,

  // <button
  //     disabled={disabled}
  //     onClick={onclick}
  //     className={`flex items-center ${
  //       outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
  //     } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}
  //     type={type}
  //   >
  //     {children ? (
  //       <>
  //         <span className={`${outline && "text-yellow-50"}`}>{text}</span>
  //         {children}
  //       </>
  //     ) : (
  //       text
  //     )}
  //   </button>
}

export default Buttons
