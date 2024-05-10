import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import Form from './Form'

const ContactUsTemplate = () => {
    return (
        <div className='flex flex-col gap-4 p-14 border-[1px] border-richblack-600 rounded-md row-span-2 text-white'>
            <HighlightText text={"Got a Idea? We’ve got the skills. Let’s team up"}
                bg={"bg-richblack-5"} />
            <p className='text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>

            <Form />

        </div>
    )
}

export default ContactUsTemplate
