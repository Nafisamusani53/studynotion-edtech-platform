import React from 'react'

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

}

export default Buttons
