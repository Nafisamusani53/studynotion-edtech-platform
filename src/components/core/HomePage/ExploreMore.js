import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const ExploreMore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (tag) => {
        setCurrentTab(tag);
        const result = HomePageExplore.filter((courses) => courses.tag === tag);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
        <div className='flex flex-col gap-6 items-center justify-center mb-52'>
            <div className='flex flex-col gap-4'>
                <p className="text-center text-4xl font-semibold">
                    Unlock the
                    <HighlightText text={"Power of Code"} />
                </p>
                <h6 className="-mt-3 text-center text-lg font-bold text-richblack-300">
                    Learn to Build Anything You Can Imagine
                </h6>
            </div>

            {/* Tabs */}
            <div className='bg-richblack-800 text-richblack-300 flex flex-row items-center 
            justify-center gap-5 rounded-full px-1 py-1 shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset]'>
                {tabsName.map((tag,index) => (
                    <p className={`${tag === currentTab 
                    ? "bg-richblack-900 text-richblack-5 "
                    : "text-richblack-300"} py-2 px-8 cursor-pointer rounded-full transition-all duration-200
                    hover:bg-richblack-900 hover:text-richblack-5`} 
                    key={index}
                    onClick={()=>setMyCard(tag)}
                    >{tag}</p>
                ))}
            </div>

            <div className='flex gap-16 items-center justify-center my-6 absolute
             translate-y-[93%]'>
                   {courses.map((course, index) => (
                    <CourseCard course={course} key={index} 
                    setCurrentCard={setCurrentCard} currentCard={currentCard}/>
                   ))}     
            </div>
        </div>
    )
}

export default ExploreMore
