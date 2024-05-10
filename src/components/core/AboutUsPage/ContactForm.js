import React  from 'react'
import HighlightText from '../HomePage/HighlightText'

import Form from '../ContactUsPage/Form'

const ContactForm = () => {
    
    return (
        <div className='flex flex-col mx-auto w-6/12 gap-4 px-8'>
            <div className='text-center space-y-2'>
                <HighlightText text={"Get in Touch"} bg={"bg-richblack-5"} />
                <p className='text-richblack-300'>We'd love to here for you, Please fill out this form.</p>
            </div>

            <Form/>

        </div>
    )
}

export default ContactForm
