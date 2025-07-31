import toast from 'react-hot-toast'
import { setLoading } from '../../slices/authSlice'
import { apiConnector } from '../apiConnector'
import { setCourse, setEditCourse, setStep } from '../../slices/courseSlice'
import { course } from '../apis'

export const createCourse = (data, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("...Loading")
        try {
            const formData = new FormData();
            formData.append("courseName", data.courseName);
            formData.append("courseDescription", data.courseDescription);
            formData.append("whatYouWillLearn", data.whatYouWillLearn);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("tag", data.tag);
            formData.append("instructions", data.instructions);
            formData.append("thumbnail", data.thumbnail);

            const headers = {

                'Authorization': `Bearer ${token}`,
            }
            const result = await apiConnector("POST", course.CREATE_COURSE, formData, headers)

            if (!result.data.success) {
                throw new Error(result.data.message)
            }

            dispatch(setCourse(result.data.data));
            dispatch(setEditCourse(true));
            dispatch(setStep(2));
            toast.success("Course Added Successfully")
        }
        catch (error) {
            toast.error("Error while creating the course")
        }
        toast.dismiss(toastId);
    }
}

export const updateCourse = (data, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        const toastId = toast.loading("...Loading")
        try {
            const formData = new FormData();
            formData.append("courseId", data.courseId)
            formData.append("courseName", data.courseName);
            formData.append("courseDescription", data.courseDescription);
            formData.append("whatYouWillLearn", data.whatYouWillLearn);
            formData.append("price", data.price);
            formData.append("category", data.category);
            formData.append("tag", data.tag);
            formData.append("instructions", data.instructions);
            formData.append("thumbnail", data.thumbnail);

            const headers = {

                'Authorization': `Bearer ${token}`,
            }
            const result = await apiConnector("POST", course.EDIT_COURSE, formData, headers)

            if (!result.data.success) {
                throw new Error(result.data.message)
            }

            dispatch(setCourse(result.data.data));
            dispatch(setEditCourse(true));
            dispatch(setStep(2));
            toast.success("Course Updated Successfully Successfully")
        }
        catch (error) {
            toast.error("Error while updating the course")
        }
        toast.dismiss(toastId);
    }
}

export const addSection = async (data, token) => {

    const toastId = toast.loading("Loading...")
    let result;
    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("POST", course.CREATE_SECTION, data, headers)

        if (!result.data.success) {

            throw new Error(result.data.message)
        }

        toast.success("Section Added Successfully");
        

    }
    catch (error) {
        toast.error("Failed to add Section")
    }
    toast.dismiss(toastId);
    return result.data.data


}

export const getInstructorCourses = async (token) => {

    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        const result = await apiConnector("GET", course.INSTRUCTOR_COURSE, null, headers);

        if (!result.data.success) {
            throw new Error(result.data.message)
        }

        return result.data.data

    }
    catch (error) {
        toast.error("Failed to load courses")
    }


}

export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        const result = await apiConnector("DELETE", course.DELETE_COURSE, data, headers);

        if (!result.data.success) {
            throw new Error(result.data.message)
        }

        toast.success("Course deleted Successfully");

    }
    catch (error) {
        toast.error("Failed to load courses")
    }
    toast.dismiss(toastId);
}

export const getFullCourseDetails = async(data, token) => {


        const toastId = toast.loading("Loading...")
    let result;
        try {

            const headers = {

                'Authorization': `Bearer ${token}`,
            }
             result = await apiConnector("POST", course.GET_FULL_COURSE_DETAILS, data, headers)

            if (!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("Course Detailed Fetched Successfully")
        }
        catch (error) {
            toast.error("Failed to fetch course detail")
        }

        toast.dismiss(toastId);
        return result.data.data
    }

export const updateSection = async (data, token) => {

    const toastId = toast.loading("Loading...")
    let result;
    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("POST", course.UPDATE_SECTION, data, headers);

        if (!result.data.success) {
            throw new Error(result.data.message);
        }

        toast.success("Section updated successfully");
        
    }
    catch (error) {
        toast.error("Failed to update the section");
    }
    toast.dismiss(toastId);
    return result.data.data
}

export const deleteSection = async (data, token) => {

    const toastId = toast.loading("Loading...")
    let result;
    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("DELETE", course.DELETE_SECTION, data, headers);

        if (!result.data.success) {
            throw new Error(result.data.message);
        }

        toast.success("Section deleted successfully");

    }
    catch (error) {
        toast.error("Failed to delete the section");
    }
    toast.dismiss(toastId);
    return result.data.data;

}

export const deleteSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result;
    try {
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("DELETE", course.DELETE_SUBSECTION, data, headers);

        if (!result.data.success) {
            throw new Error(result.data.message)
        }

        toast.success("Lecture deleted successfully");
    }
    catch (error) {
        toast.error("Failed to delete the lecture")
    }
    toast.dismiss(toastId)
    return result.data.data
}

export const createSubSection = async(data,token) => {
    const toastId = toast.dismiss("Loading...")
    let result;
    try{
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("POST", course.CREATE_SUBSECTION, data, headers);

        if(!result.data.success){
            throw new Error(result.data.message)
        }

        toast.success("Lecture added successfully");
    }
    catch(error){
        toast.error("Failed to add the lecture")
    }
    toast.dismiss(toastId)
    return result?.data?.data

}

export const updateSubSection = async(data,token) => {
    const toastId = toast.dismiss("Loading...")
    let result;
    try{
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("POST", course.UPDATE_SUBSECTION, data, headers);
        if(!result.data.success){
            throw new Error(result.data.message)
        }

        toast.success("Lecture added successfully");
    }
    catch(error){
        toast.error("Failed to add the lecture")
    }
    toast.dismiss(toastId)
    return result?.data?.data

}

export const publishCourse = async(data,token) => {
    const toastId = toast.dismiss("Loading...")
    let result;
    try{
        const headers = {

            'Authorization': `Bearer ${token}`,
        }
        result = await apiConnector("POST", course.PUBLISH_COURSE, data, headers);

        if(!result.data.success){
            throw new Error(result.data.message)
        }

        toast.success("Lecture added successfully");
    }
    catch(error){
        toast.error("Failed to add the lecture")
    }
    toast.dismiss(toastId)
    return result?.data?.data

}

export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST",course.COURSE_DETAILS, {
      courseId,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
  } catch (error) {
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

