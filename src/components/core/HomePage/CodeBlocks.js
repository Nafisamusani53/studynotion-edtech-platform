import React from 'react'
import HighlightText from './HighlightText'
import CtnButton from './CtnButton'
import Editor from './Editor'

const CodeBlocks = ({left, sequence, button1, button2, arrow}) => {
  return (
    <div className={`flex ${left?'flex-row' : 'flex-row-reverse'} mx-auto gap-10 items-center justify-center`}>
      <div className='space-y-8 w-[40%]'>
      <p className='text-4xl font-semibold'>Unlock your 
      <HighlightText text={'coding potential'} style={'bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold'} />
       with our online courses.
          
        </p>
        <p className='-mt-3 w-[90%] text-lg font-bold text-richblack-300'>
        Our courses are designed and taught by industry experts who have 
        years of experience in coding and are passionate about 
        sharing their knowledge with you. </p>
        <div>
        <div className='flex gap-7 mx-auto'>
            <CtnButton text={button1} flag={true} arrow={arrow}/>
            <CtnButton text={button2} flag={false}/>
          </div>
        </div>
      </div>

      <div>
        <Editor sequence={sequence}/>
      </div>

      
    </div>
  )
}

export default CodeBlocks
