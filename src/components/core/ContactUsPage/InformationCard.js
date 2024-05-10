import React from 'react'
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";

const InformationCard = () => {

    const info = [
        {
            icon : HiMiniChatBubbleLeftRight,
            title: "Chat on us",
            desc : "Our friendly team is here to help.",
            val : "@mail address"
        },
        {
            icon : BiWorld,
            title: "Visit us",
            desc : "Come and say hello at our office HQ.",
            val : "Here is the location/ address"
        },
        {
            icon : FaPhoneAlt,
            title: "Call us",
            desc : "Mon - Fri From 8am to 5pm",
            val : "+123 456 7890"
        }
    ]

  return (
    <div className='flex flex-col justify-evenly py-6 px-10 bg-richblack-800 rounded-md'>
      {
        info.map((ele, index) => (
            <div key={index} className='flex gap-2'>
                <ele.icon className='text-xl text-richblack-100'/>
                <div>
                    <h1 className='text-xl text-richblack-5 font-bold'>{ele.title}</h1>
                    <p className='text-sm text-richblack-200'>{ele.desc}</p>
                    <p className='text-sm text-richblack-200'>{ele.val}</p>
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default InformationCard
