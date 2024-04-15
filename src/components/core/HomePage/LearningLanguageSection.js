import React from 'react'
import HighlightText from './HighlightText'
import CtnButton from './CtnButton'
import knowYourProgress from "../../../assests/Know_your_progress.cf3ea1c51544985430d3.png";
import compareWithOther from "../../../assests/Compare_with_others.8e950efa990d53f34b35893a1e03cea1.svg";
import planYourLessons from "../../../assests/Plan_your_lessons.f123ccf442a2a364a459a7bbec807045.svg";

const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col mt-20">
          <div className="flex flex-col gap-3 text-center items-center">
            <p className="text-4xl font-semibold text-richblack-800">
              Your swiss knife for
              <HighlightText text={"learning any language"} bg={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"}/>
            </p>
            <p className="text-md text-richblack-800 tracking-wide w-[85%]">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <img src={knowYourProgress} className="" />
            <img src={compareWithOther} className="ml-[-144px]" />
            <img src={planYourLessons} className="ml-[-144px]" />
          </div>

          <div className="flex items-center justify-center">
            <CtnButton text={"Learm More"} flag={true} linkto={"/signup"} />
          </div>
        </div>
  )
}

export default LearningLanguageSection
