import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CtnButton from "../components/core/HomePage/CtnButton";
import banner from "../assests/banner-1.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import instructor from "../assests/Instructor.8b4c4f204053f0dfe844.png";
import Timeline from "../components/core/HomePage/Timeline";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Carousel from "../components/core/HomePage/Carousel";

const Home = () => {
  return (
    <main>
      {/* Section - 1 */}
      <section
        className=" mx-auto flex w-11/12 max-w-maxContent flex-col 
      items-center justify-between gap-8 text-white"
      >
        <Link to={"/signup"} className="mx-auto mt-16">
          <div
            className=" group  p-1 text-richblack-200
         flex items-center bg-richblack-800 rounded-full font-inter 
         font-bold leading-6 text-center 
         shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.18)_inset] transition-all duration-200
         hover:scale-95 hover:shadow-none "
          >
            <div
              className="flex flex-row items-center gap-2 py-1.5 px-8 rounded-full 
            transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p className="">Become an Instructor</p>
              <FaArrowRight className="text-[15px] font-bold" />
            </div>
          </div>
        </Link>

        <p className="text-center text-4xl font-semibold">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} bg={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
        </p>
        <p className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.{" "}
        </p>

        <div className="flex gap-7 mx-auto">
          <CtnButton text={"Learn More"} flag={true} linkto={"/signup"} />
          <CtnButton text={"Book a Demo"} flag={false} linkto={"/login"}/>
        </div>

        <div className=" mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            loop
            autoPlay
            controls
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        <CodeBlocks
          left={true}
          sequence={`<!DOCTYPE html>\n<html lang = "en">\n<head>\n<title>This is my page</title>\n</head>\n<body>\n<h1><a href="/"> Header </a></h1>\n<nav><a href="one/"> One </a>\n<a href="two/"> Two </a>\n</nav>\n</body>`}
          button1={"Try it Youself"}
          button2={"Learn More"}
          gradient={"codeblock1"}
          s1={"Unlock your"}
          s2={"coding potential"}
          s3={"with our online courses."}
          s4={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          color={"text-yellow-25"}
          linkto={"/signup"}
        />

        <CodeBlocks
          left={false}
          sequence={`import React from 'react';\nimport CtnButton from './Button';\nimport TypeAnimation from 'react-type'\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div> Home </div>\n)\n}\nexport default Home;`}
          button1={"Continue Lesson"}
          button2={"Learn More"}
          gradient={"codeblock2"}
          s1={"Start"}
          s2={`coding \n in seconds`}
          s3={""}
          s4={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          color={"text-white"}
          linkto={"/signup"}
        />

        <ExploreMore/>
      </section>

      {/* Section-2 */}
      <section className="bg-[#F9F9F9] flex flex-col items-center font-inter pb-14">
        <div className="homepage-bg w-full pt-36">
          <div className="flex gap-7 mx-auto items-center justify-center my-16">
            <CtnButton
              text={"Explore Full Catalogue"}
              flag={true}
              linkto={"/signup"}
            >
            <FaArrowRight/>
            </CtnButton>
            <CtnButton text={"Learn More"} flag={false} linkto={"/signup"} />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-10 m-16">
          <div className="text-4xl font-semibold text-richblack-800 w-[50%]">
            Get the skills you need for a
            <HighlightText text={"job that is in demand."} bg={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
          </div>

          <div className="flex flex-col gap-8 w-[40%] justify-start">
            <p className="text-md text-richblack-700 tracking-wide">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
              <CtnButton text={"Learn More"} flag={true} linkto={"/signup"} />
          </div>
        </div>

        <Timeline/>

        <LearningLanguageSection/>
      </section>

      {/* Section - 3 */}
      <section className="flex flex-col my-6 mx-14">
        <div className="flex my-6 gap-20 items-center justify-center tracking-wide">
          <div className="shadow-white shadow-[-20px_-20px_0px_0px] w-[50%] object-cover">
            <img src={instructor} />
          </div>

          <div className="flex flex-col gap-10 w-[50%]">
            <p className="text-4xl font-semibold text-[#F1F2FF] w-[40%]">
              Become an
              <HighlightText text={"instructor"} bg={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
            </p>
            <p className="text-md text-[#838894] tracking-wide w-[90%]">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <CtnButton
                text={"Start Teachong today"}
                flag={true}
                arrow={true}
                linkto={"/signup"}
              >
              <FaArrowRight/>
          </CtnButton>
          </div>
        </div>

        {/* Carousal */}
        <div className="flex flex-col gap-16 my-10 mx-auto">
          <h2 className="text-4xl font-bold text-richblack-5">Reviews from other learners</h2>
          <Carousel/>
        </div>
      </section>
    </main>
  );
};

export default Home;
