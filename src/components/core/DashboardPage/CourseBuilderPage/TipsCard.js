import React from 'react'
import { FcFlashOn } from "react-icons/fc";

const tips = [
    "Set the Course Price option or make it free.",
    "Standard size for the course thumbnail is 1024x576.",
    "Video section controls the course overview video.",
    "Course Builder is where you create & organize a course.",
    "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
    "Information from the Additional Data section shows up on the course single page.",
    "Make Announcements to notify any important.",
    "Notes to all enrolled students at once."
]

const TipsCard = () => {
  return (
    <div className='fixed mr-12 flex-col flex p-6 gap-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
    <h1 className='flex items-center'>
        <FcFlashOn className='text-2xl'/>
        <span className='text-2xl font-bold'>Course Upload Tips</span>
    </h1>

    <ul className='list-disc pl-6'>
        {tips.map((tip, index) => (
            <li className='text-sm mb-2' key={index}>{tip}</li>
        ))}
    </ul>
      
    </div>
  )
}

export default TipsCard
