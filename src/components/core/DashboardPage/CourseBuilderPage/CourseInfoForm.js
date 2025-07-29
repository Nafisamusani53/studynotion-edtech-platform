import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Requirements from './Requirements';
import ChipInput from './ChipInput';
import Upload from './Upload';
import Buttons from '../Buttons';
import { createCourse,updateCourse } from '../../../../services/operations/courseOperation';
import { setStep } from '../../../../slices/courseSlice';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useParams } from 'react-router-dom';

const CourseInfoForm = () => {

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm();

  const { categories } = useSelector((state) => state.category);
  const { course, editCourse, step } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {courseId} = useParams();

  const style = `appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
  px-3 py-3 text-lg focus-visible:outline-none mb-4`;
  const pStyle = `mb-1 text-sm after:content-["_*"] after:text-pink-500 after:text-lg`;

  const courseAddHandler = (data) => {
    if(editCourse){
      data.courseId = course._id;
      dispatch(updateCourse(data, token))
    }
    else{
      dispatch(createCourse(data, token))
    }
  }

  useEffect(()=> {
    if(editCourse){


      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
  },[])

  return (
    <form onSubmit={handleSubmit(courseAddHandler)} className='flex flex-col'>

      <label>
        <p className={pStyle}>Course Title</p>
        <input
          id="courseName"
          name='courseName'
          type='text'
          placeholder="Write Course Title"
          {...register("courseName", { required: true })}
          defaultValue={course?.courseName}
          className={style}
        />

        {errors.courseName && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter course title.
          </span>
        )}
      </label>

      <label>
        <p className={pStyle}>Course Short Description</p>
        <textarea
          id="courseDescription"
          name='courseDescription'
          rows={5}
          placeholder="Write Description"
          {...register("courseDescription", { required: true })}
          defaultValue={course?.courseDescription}
          className={style}
        />

        {errors.courseDescription && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter course description.
          </span>
        )}
      </label>

      <label>
        <p className={pStyle}>Price</p>
        <input
          id="price"
          name='price'
          type='number'
          placeholder="Write price"
          {...register("price", { required: true })}
          defaultValue={course?.price}
          className={style}
        />

        {errors.price && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter price.
          </span>
        )}
      </label>

      <label>
        <p className={pStyle}>Category</p>
        <select
          name='category'
          id='category'
          {...register("category", { required: true })}
          className={style}
        >
          <option value="" disabled> Choose a category</option>

          {
            categories.map((item) => (
              <option value={item._id} key={item._id}>{item.categoryName}</option>
            ))}
        </select>
        {
          errors.category && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Choose any one category
            </span>
          )
        }
      </label>

      {/* create a component for tags */}

      <ChipInput
        label="Tags"
        name="tag"
        placeholder="Enter tag"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        style={style}
        pStyle={pStyle}
      />


      {/* create component for thumbnail */}

      <Upload
        label="Course thumbnail"
        name="thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        style={style}
        pStyle={pStyle}
      />



      <label>
        <p className={pStyle}>Benefits of the course</p>
        <textarea
          id="whatYouWillLearn"
          name='whatYouWillLearn'
          type='text'
          placeholder="Write benefits of the course"
          rows={5}
          {...register("whatYouWillLearn", { required: true })}
          defaultValue={course?.whatYouWillLearn}
          className={style}
        />

        {errors.whatYouWillLearn && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter benefits of the course.
          </span>
        )}
      </label>

      {/* Instructions or Requirements for the course */}
      <Requirements
        label="Requirements / Intructions"
        name="instructions"
        placeholder="Enter instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        style={style}
        pstyle={pStyle}
      />


      <div className='flex gap-4 justify-end mt-6'>
      {
        editCourse ? 
        (
          <>
          <Buttons content={"Continue Without Saving"} yellow={false} onclick={(e) => {
            e.preventDefault();
            dispatch(setStep(2));
          }}></Buttons>

          <Buttons content={"Save Changes"} type={"submit"} yellow={true}>
            <MdKeyboardArrowRight/>
          </Buttons>
          </>
        ) 
        : 
        (
          <Buttons content={"Next"} type={"submit"} yellow={true}></Buttons>
        )
      }

      </div>
    </form>
  )
}

export default CourseInfoForm
