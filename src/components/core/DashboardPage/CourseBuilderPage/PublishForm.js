import React, { useRef } from 'react'
import Buttons from '../Buttons'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { publishCourse } from '../../../../services/operations/courseOperation';
import toast from 'react-hot-toast';

const PublishForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {course} = useSelector((state)=>state.course)
  const { token } = useSelector((state) => state.auth)
  const ref = useRef();

  const goBack = () => {
    dispatch(setStep(2))
    dispatch(setEditCourse(true))
  }

  const publishCourseHandle = async () => {
    if (ref.current.checked) {
      const result = await publishCourse({ courseId: course._id }, token);
      if (result) {
        dispatch(setCourse(result));
        dispatch(setEditCourse(false));
        setStep(1);
        navigate("/dashboard/my-courses");
      }
    }
    else{
      toast.error("Mark the course to make it public");
    }


  }
  return (
    <>
      <div className='flex flex-col gap-7'>
        <h1 className='text-4xl font-bold text-richblack-5'>Publish Course</h1>
        <label>
          <p className='text-richblack-400 text-xl'>Make this course public</p>
          <input type='checkbox' color='#6E727F' value="true" name="publish" ref={ref} />
        </label>
        <p className='text-xl text-richblack-400'>Make this course public</p>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <Buttons content={<MdKeyboardArrowLeft />} onclick={goBack} yellow={false}>
          Back
        </Buttons>

        <div className='flex gap-4 justify-end'>

          <Buttons content={"Save as Draft"} onclick={
            () => {
              navigate("/dashboard/my-courses")
            }
          } yellow={false} />


          <Buttons content={"Next"} onclick={publishCourseHandle} yellow={true}>
            <MdKeyboardArrowRight />
          </Buttons>

        </div>
      </div>
    </>
  )
}

export default PublishForm
