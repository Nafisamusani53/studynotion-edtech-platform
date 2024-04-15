import React from 'react'
import { useSelector } from 'react-redux'
import Buttons from './Buttons'
import { LiaEdit } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-400'>
      {/* path --- remaining*/}

      <h1 className='text-richblack-5 font-bold text-3xl mb-14'>My Profile</h1>

      {/* 1st card */}
      <section className='flex max-sm:flex-col flex-row items-center gap-6 justify-between bg-richblack-800 rounded-lg p-8 md:px-12 border-[1px] border-richblack-700'>
        <div className='flex gap-4 items-center'>
          <img src={`${user?.image}`} alt={`profile-${user?.firstName}`}
            className='w-20 h-20 rounded-full'
          />

          <div className='flex flex-col gap-1'>
            <h3 className='text-richblack-5 text-lg max-sm:text-center sm:text-xl font-bold '>
            {`${user?.firstName} ${user?.lastName}`}</h3>
            <p className='hidden sm:block text-sm'>{`${user?.email}`}</p>
          </div>
        </div>
        <Buttons onclick={() => {
          navigate("/dashboard/settings")
        }} content={"Edit"} yellow={true}><LiaEdit/></Buttons>
      </section>

      {/* 2nd card */}
      <section className='flex flex-col my-10 bg-richblack-800 rounded-lg gap-y-10 p-8 md:px-12 border-[1px] border-richblack-700'>
        <div className='flex justify-between tracking-wide font-bold'>
          <h3 className='text-richblack-5 text-xl'>About</h3>
          <Buttons onclick={() => {
          navigate("/dashboard/settings")
        }} content={"Edit"} yellow={true}><LiaEdit/></Buttons>
        </div>
        <p className='text-sm tracking-wide md:w-2/3 w-full text-justify'>{`${user?.profile?.about ? user?.profile?.about : "Write something about yourself"}`}</p>
      </section>

      {/* 3rd card */}
      <section className='flex flex-col my-10 tracking-wide bg-richblack-800 rounded-lg gap-y-10 p-8 md:px-12 border-[1px] border-richblack-700'>
      <div className='flex flex-row justify-between  font-bold'>
          <h3 className='text-richblack-5 text-lg md:text-xl'>Personal Details</h3>
          <Buttons onclick={() => {
          navigate("/dashboard/settings")
        }} content={"Edit"} yellow={true}><LiaEdit/></Buttons>
        </div>

        <div className='grid grid-rows-3 md:grid-flow-row-dense md:grid-cols-2 w-10/12 justify-between gap-6  text-sm'>
          {/* Name */}
          
            <div className='space-y-2'>
              <p>First Name</p>
              <p className='text-richblack-5 font-bold'>{`${user?.firstName ? user?.firstName : "NA"}`}</p>
            </div>

            <div className='space-y-2'>
              <p>Last Name</p>
              <p className='text-richblack-5 font-bold'>{`${user?.lastName ? user?.lastName : "NA"}`}</p>
            </div>
          

          {/* Contact details */}
          
            <div className='space-y-2 sm:max-lg:col-span-2'>
              <p>Email</p>
              <p className='text-richblack-5 font-bold  '>{`${user?.email ? user?.email : "NA"}`}</p>
            </div>

            <div className='space-y-2'>
              <p>Phone Number</p>
              <p className='text-richblack-5 font-bold'>{`${user?.profile?.contactNo ? user?.profile?.contactNo : "Add contact number"}`}</p>
            </div>
          
            <div className='space-y-2'>
              <p>Gender</p>
              <p className='text-richblack-5 font-bold'>{`${user?.profile?.gender ? user?.profile?.gender : "Add Gender"}`}</p>
            </div>

            <div className='space-y-2'>
              <p>Date of Birth</p>
              <p className='text-richblack-5 font-bold'>{`${user?.profile?.dateOfBirth ? user?.profile?.dateOfBirth : "Add Date of Birth"}`}</p>
            </div>

        </div>
      </section>

    </div>
  )
}

export default Profile
