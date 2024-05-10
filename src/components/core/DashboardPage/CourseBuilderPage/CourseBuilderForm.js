import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Buttons from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddCircleOutline } from "react-icons/md";
import { addSection, updateSection } from '../../../../services/operations/courseOperation';

import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const CourseBuilderForm = () => {

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const [sectionId, setSectionId] = useState(null);
  const [sectionName, setSectionName] = useState(null);
  const [editSectionName, setEditSectionName] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();


  const handleChangeEditSectionName = (id, name) => {
    if (sectionName === name) {
      cancelEdit();
      return;
    }
    setEditSectionName(true);
    setValue("sectionName", name);
    setSectionName(name);
    setSectionId(id);
  }

  const cancelEdit = () => {
    setEditSectionName(false);
    setValue("sectionName", "");
    setSectionId(null);
    setSectionName(null);
  }

  const sectionHandler = async (data) => {
    let result;
    if (editSectionName) {
      const updatedData = {
        ...data,
        sectionId: sectionId,
        courseId: course._id,
      };

      result = await updateSection(updatedData, token);
    }
    else {
      result = await addSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }
    dispatch(setCourse(result));
    setEditSectionName(false);
    setSectionName(null);
    setSectionId(null);
    setValue("sectionName", "");
  }

  

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }



  return (
    <>
      <h1 className='text-2xl font-semibold text-richblack-5 mb-6'>Course Builder</h1>
      <form onSubmit={handleSubmit(sectionHandler)}>
        <label>
          <input
            type='text'
            name='sectionName'
            id='sectionName'
            placeholder='Add a section to build your course'
            {...register("sectionName", { required: true })}
            className='appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
  px-3 py-3 text-lg focus-visible:outline-none mb-4'
          />

          {
            errors.sectionName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Section name is required.
              </span>
            )
          }

        </label>

        <div className='flex gap-4 mt-4 items-center'>
          <Buttons
            content={editSectionName ? "Edit Section Name" : "Add Section"}
            type={"submit"}
            yellow={true}
          >
            <MdAddCircleOutline />
          </Buttons>

          {editSectionName && (
            <button className='text-richblack-400 underline' onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>

      </form>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName = {handleChangeEditSectionName}/>
        )
      }

      <div className='flex gap-4 justify-end mt-6'>

      <Buttons content={<MdKeyboardArrowLeft/>} onclick={goBack} yellow={false}>
        Back
      </Buttons>

      <Buttons content={"Next"} onclick={goToNext} yellow={true}>
        <MdKeyboardArrowRight/>
      </Buttons>

      </div>
    </>
  )
}

export default CourseBuilderForm
