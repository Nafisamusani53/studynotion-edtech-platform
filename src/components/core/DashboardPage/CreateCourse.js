import React from 'react'
import TipsCard from './CourseBuilderPage/TipsCard'
import RenderSteps from './CourseBuilderPage/RenderSteps'




const CreateCourse = () => {
 
  return (
    <div className=' mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-5 
    grid grid-cols-[0.6fr_0.4fr] grid-rows-2 gap-6'>

      {/* Forms */}
      <RenderSteps/>

      {/* Upload course tip card */}
      <div className='sticky'>
        <TipsCard />
      </div>
    </div>
  )
}

export default CreateCourse
