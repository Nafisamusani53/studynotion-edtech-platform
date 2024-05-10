import React from 'react'
import InformationCard from '../components/core/ContactUsPage/InformationCard'
import ContactUsTemplate from '../components/core/ContactUsPage/ContactUsTemplate'

const ContactUs = () => {
  return (
    <>
      <section className='grid grid-cols-[0.4fr_0.6fr] grid-rows-2 gap-14 py-24 px-32'>
      {/* information card */}
      <InformationCard/>

      {/* contact-us page */}
      <ContactUsTemplate/>

      {/* Review Slider --- Remaining*/}

      {/* Footer  --- Remaining*/}
      </section>
    </>
  )
}

export default ContactUs
