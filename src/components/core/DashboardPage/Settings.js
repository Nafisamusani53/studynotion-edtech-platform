
import { RiDeleteBinLine } from "react-icons/ri";

import UpdateProfie from './Settings/UpdateProfie';
import EditProfile from './Settings/EditProfile';
import ChangePassword from "./Settings/ChangePassword";

const Settings = () => {


  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-5'>

      <h1 className='text-richblack-5 font-bold text-3xl mb-14'>My Profile</h1>

      {/* photo upload */}

      <UpdateProfie />


      {/* edit personal details */}
      {/* form submit remaining and api call remaining --- done*/}
      <EditProfile />



      {/* change password */}
      {/* pass submit remaining and api call remaining --- done */}
      <ChangePassword />
      


      {/* delete account */}
      {/* delete api call remainig and to remove user account from enrolled course
      also remaining */}
      <section className=' flex flex-col sm:flex-row my-10 border-pink-700 bg-pink-900 rounded-lg gap-4 p-8 md:px-12 border-[1px]'>
        {/* icon */}
        <div className='max-sm:hidden w-14 h-14 aspect-square rounded-full flex items-center justify-center bg-pink-700'>
          <RiDeleteBinLine className='text-pink-200 text-3xl font-extrabold' />
        </div>
        <div className=' w-full sm:w-7/12'>
          <p className='text-lg font-bold mb-2'>Delete Account</p>
          <div className=' text-[1.07rem] '>
            <p className='text-pink-25'>Would you like to delete account?</p>
            <p className='text-pink-25 mb-2'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
            {/* onClick event remaining to delete the account */}
            <p className='text-pink-400 italic'>I want to delete my account.</p>
          </div>
        </div>

      </section>

    </div>
  )
}

export default Settings
