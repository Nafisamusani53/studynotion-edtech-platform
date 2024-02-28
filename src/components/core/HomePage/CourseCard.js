import React from 'react'
import { MdPeopleAlt } from "react-icons/md";
import { ImTree } from "react-icons/im";

const CourseCard = ({course, currentCard, setCurrentCard}) => {
 return (
    <div className={`w-[30%] flex flex-col gap-14 items-center justify-between
        text-richblack-400
     ${course.heading === currentCard 
     ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" 
     : " bg-richblack-800  "}`}
        onClick={()=>setCurrentCard(course.heading)}
     > 
        <div className='flex flex-col gap-4 mx-6 my-6'>
            <h2 className={` text-xl font-bold
            ${course.heading === currentCard ? "text-richblack-800" : "text-richblack-5"}`}>{course.heading}</h2>
            <p>{course.description}</p>
        </div>

        <div className='w-[100%] flex items-center justify-between border-t-2 
        border-dashed border-richblack-400 px-6 py-4 mb-2 text-lg'>
            <div className='flex gap-2 items-center '>
            <MdPeopleAlt />
            {course.level}
            </div>

            <div className='flex gap-2 items-center'>
            <ImTree />
            <p>{course.lessionNumber} Lessons</p>
            
            </div>
        </div>
      
    </div>
  )
}

export default CourseCard
