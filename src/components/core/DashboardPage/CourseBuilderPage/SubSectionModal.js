import React, { useState,useEffect } from 'react'
import Upload from './Upload'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { setCourse } from '../../../../slices/courseSlice'
import { createSubSection, updateSubSection } from '../../../../services/operations/courseOperation'
import { RxCross2 } from 'react-icons/rx'
import Buttons from '../Buttons'

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false, }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (edit || view) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentVal = getValues();

        if (currentVal.lectureTitle !== modalData.title ||
            currentVal.lectureDesc !== modalData.description ||
            currentVal.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        else {
            return false;
        }
    }

    console.log("modal Data", modalData)

    const handleEditSubsection = async () => {
        const currentVal = getValues();

        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id);
        if (currentVal.lectureTitle !== modalData.title) {

            formData.append("title", currentVal.lectureTitle);
        }
        if (currentVal.lectureDesc !== modalData.description) {

            formData.append("description", currentVal.lectureDesc);
        }
        if (currentVal !== modalData.videoUrl) {
            formData.append("videoUrl", currentVal.lectureVideo)

        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        console.log("For Set Value",result);
        if (result) {
            // console.log("result", result)
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                (section._id === modalData.sectionId ? result : section)
            )
            dispatch(setCourse({ ...course, courseContent: updatedCourseContent }))
            console.log("Course to check undefined",course)
        }
        setModalData(null)
        setLoading(false)

    }

    const onSubmit = async(data) => {
        if (view) return

        if (edit) {
            if (isFormUpdated()) {
                handleEditSubsection();
                return;
            }
            else {
                toast.error("No changes made to the form")
            }
        }

        const formData = new FormData();
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("videoUrl", data.lectureVideo)

        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
                (section._id === modalData ? result : section)
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
                {/* Modal Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>
                {/* Modal Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 px-8 py-10"
                >
                    {/* Lecture Video Upload */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        pStyle={`mb-1 text-sm after:content-["_*"] after:text-pink-500 after:text-lg`}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />
                    {/* Lecture Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
  px-3 py-3 text-lg focus-visible:outline-none mb-4"
                        />
                        {errors.lectureTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture title is required
                            </span>
                        )}
                    </div>
                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureDesc">
                            Lecture Description{" "}
                            {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="appearance-none w-full bg-richblack-700 rounded-md shadow-[0px_-2px_0px_0px_rgba(255,255,255,0.18)_inset] 
  px-3 py-3 text-lg focus-visible:outline-none mb-4"
                        />
                        {errors.lectureDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">
                                Lecture Description is required
                            </span>
                        )}
                    </div>
                    {!view && (
                        <div className="flex justify-end">
                            <Buttons
                                disabled={loading}
                                content={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
