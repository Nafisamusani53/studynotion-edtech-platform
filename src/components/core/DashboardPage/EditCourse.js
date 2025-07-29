import React,{useEffect} from 'react'
import RenderSteps from './CourseBuilderPage/RenderSteps'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getFullCourseDetails } from '../../../services/operations/courseOperation';
import { setCourse, setEditCourse, setStep } from '../../../slices/courseSlice';

const EditCourse = () => {

    const {courseId} = useParams();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth)
    const {course} = useSelector((state)=> state.course);

    useEffect(()=>{
      const fetchData = async()=>{
        const result = await getFullCourseDetails({courseId: courseId}, token);
        dispatch(setCourse(result));
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
      }
        if(courseId){
            fetchData();
        }
    },[courseId])

  return (
    <div className=' mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-5 '>

    <RenderSteps/>

    </div>
  )
}

export default EditCourse
