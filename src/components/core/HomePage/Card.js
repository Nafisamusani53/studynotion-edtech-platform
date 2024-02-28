import React from 'react'

const Card = ({ image, heading, text }) => {
    return (
        <div className='flex gap-5'>
            <div className='rounded-full bg-white w-[49px] h-[49px] flex items-center justify-center
            shadow-[0px_0px_62px_0px] shadow-[#0000001F]'>
                <img src={`${image}`}/>
            </div>
            <div className='space-y-1'>
                <p className='text-richblack-800 text-lg font-bold'>{heading}</p>
                <p className='text-richblack-700 text-md font-medium'>{text}</p>

            </div>
        </div>
    )
}

export default Card
