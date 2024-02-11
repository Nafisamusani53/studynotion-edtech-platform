import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CtnButton from '../components/core/HomePage/CtnButton';
import banner from '../assests/banner-1.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';

const Home = () => {
  return (
    <div>
      {/* Section - 1 */}
      <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>

        <Link to={'/signup'} >
          <div className=' group mx-auto mt-16 py-1 px-5 text-richblack-200
         flex items-center bg-richblack-800 rounded-full font-inter 
         font-bold leading-6 text-center 
         shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset] transition-all duration-200
         hover:scale-95 hover:shadow-none w-fit'>
            <div className='flex flex-row items-center gap-2 py-1.5 px-[18px] rounded-full 
            transition-all duration-200 group-hover:bg-richblack-900'>
              <p className=''>Become an Instructor</p>
              <FaArrowRight className='text-[15px] font-bold' />
            </div>
          </div>
        </Link>

        <p className='text-center text-4xl font-semibold'>Empower Your Future with
          <HighlightText text={'Coding Skills'} style={'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold'} />
        </p>
        <p className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
          With our online coding courses, you can learn at your own pace,
          from anywhere in the world, and get access to a wealth of resources, including hands-on
          projects, quizzes, and personalized feedback from instructors. </p>

          <div className='flex gap-7 mx-auto'>
            <CtnButton text={'Learn More'} flag={true}/>
            <CtnButton text={'Book a Demo'} flag={false}/>
          </div>

          <div className='w-[1035px] mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
            <video className="shadow-[20px_20px_rgba(255,255,255)]" loop autoplay="true" controls>
              <source src={banner} type="video/mp4"/>
            </video>
          </div>

          <CodeBlocks left={true} sequence={"<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel=\"stylesheet\"href=\"styles.css\">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref=\"one/\">One</a><ahref=\"two/\">Two</\na><ahref=\"three/\">Three</a>\n/nav>"}
          button1={"Try it Youself"} button2={"Learn More"} arrow={true}/>
      </div>

    </div >

  )
}

export default Home
