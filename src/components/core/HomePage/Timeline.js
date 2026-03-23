import React from 'react'
import Card from './Card'
import i1 from "../../../assests/Logo1.73daf51e41d665299fc682bc3cb53878.svg"
import i2 from "../../../assests/Logo2.2d9e85de9e756cda89ffc4582338c939.svg"
import i3 from "../../../assests/Logo3.0a56f78fead602f0d54c55ddcdf7e616.svg"
import i4 from "../../../assests/Logo4.5da4c6e0c53e6745b25529891ef82458.svg"
import Timelineimage from "../../../assests/TimelineImage.a610b1e5d891ac77fe93.png";
const Timeline = () => {
    const timeline=[
        {
            image : i1,
            heading: "Leadership",
            text: "Fully committed to the success company",
        },
        {
            image : i2,
            heading: "Responsibility",
            text: "Students will always be our top priority",
        },
        {
            image : i3,
            heading: "Flexibility",
            text: "The ability to switch is an important skills",
        },
        {
            image : i4,
            heading: "Solve the problem",
            text: "Code your way to a solution",
        },

    ]
    function dottedline(index, length){
        if(index < length-1){
            return(
                <div className="h-14 border-l-[1px] border-dotted ml-[26px] border-richblack-100"></div>
            )
        }
        
    }
  return (
    <div className="w-[85%] items-center justify-between flex my-6 tracking-wide text-md gap-7 mb-20 relative max-lg:flex-col">
          {/* left */}
          <div className="flex flex-col gap-3 w-[45%]">
            {
                timeline.map((element, index) => (
                    <div>
                    <Card image={element.image}
                    heading={element.heading} text={element.text} key={index}
                    />
                        {
                            dottedline(index, timeline.length)
                        }
                    </div>
                ))
            }
          </div>

          {/* right */}
          <div className=" w-full mx-auto max-lg:w-fit">
            <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px] flex justify-center ">
              <div className="absolute w-[90%] -bottom-16 h-32 bg-caribbeangreen-700 flex justify-between items-center px-12 flex-wrap max-lg:py-4">
                <div className="flex w-fit items-center justify-between gap-4">
                  <p className="text-3xl text-white font-bold ">10</p>
                  <p className="text-sm text-caribbeangreen-300 text-wrap">
                    YEARS {`\n`}EXPERIENCES
                  </p>
                </div>
                <div className="lg:border-r-2 border-caribbeangreen-500 lg:h-9 mx-2 max-lg:w-full max-lg:border-t-2 max-lg:my-2"></div>
                <div className="flex w-fit items-center justify-between gap-4">
                  <p className="text-3xl text-white font-bold ">250</p>
                  <p className="text-sm text-caribbeangreen-300 text-wrap">
                    TYPES OF COURSES
                  </p>
                </div>
              </div>
              <img
                src={Timelineimage}
                className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit max-lg:object-center"
              />
            </div>
          </div>
        </div>
  )
}

export default Timeline
