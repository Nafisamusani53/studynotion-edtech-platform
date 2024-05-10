import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className=' text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white'>
      We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={" combines technology"} bg={"bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"} /> ,
          <HighlightText text={"expertise"} bg={"bg-gradient-to-b from-[#FF512F] to-[#F09819]"} /> , and community to create an
          <HighlightText text={"unparalleled educational experience."} bg={"bg-gradient-to-b from-[#E65C00] to-[#F9D423] "} />
      </div>
  )
}

export default Quote
