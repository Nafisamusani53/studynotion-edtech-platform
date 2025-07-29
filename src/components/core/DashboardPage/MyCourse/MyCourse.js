import React, { useState, useEffect } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import Buttons from '../Buttons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { deleteCourse, getInstructorCourses } from '../../../../services/operations/courseOperation'
import { formatedate } from '../../../../utils/formateDate'
import { IoMdTime } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { MdEdit, MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmationModal'


const MyCourse = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allCourse, setAllCourse] = useState([]);
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const { token } = useSelector((state) => state.auth);
    const TRUNCATE_LENGTH = 30


    useEffect(() => {
        const fetchData = async (token) => {
            const result = await getInstructorCourses(token);
            setAllCourse(result);
        }

        fetchData(token);

    }, [])

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await getInstructorCourses(token)
        if (result) {
          setAllCourse(result)
        }
        setConfirmationModal(null)
        setLoading(false)
      }
    return (
        <div className='flex flex-col gap-6 mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-400'>

            <div className='flex justify-between'>
                <h1 className='text-4xl font-bold text-richblack-5'>My Course</h1>
                <Buttons content={"New"} yellow={true} onclick={() => {
                    dispatch(setStep(1));
                    dispatch(setCourse(null))
                    dispatch(setEditCourse(false));
                    navigate("/dashboard/create-course")
                }}>
                    <MdAddCircleOutline />
                </Buttons>
            </div>



            <>
                <Table className="border border-richblack-800 rounded-xl">
                    <Thead>
                        <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">Course</Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Duration</Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Price</Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            allCourse?.length > 0 ?
                                (
                                    allCourse.map((course) => (
                                        <Tr key={course._id}
                                            className="flex gap-x-10 border-b border-richblack-800 px-6 py-8" >
                                            <Td className="flex flex-1 gap-x-4">

                                                <img src={course?.thumbnail} alt={course?.courseName} className="h-[148px] w-[220px] rounded-lg object-cover" />

                                                <div className="flex flex-col justify-between">
                                                    <h1 className="text-lg font-semibold text-richblack-5">{course.courseName}</h1>
                                                    <p className="text-xs text-richblack-300">
                                                        {course.courseDescription.split(" ").length >
                                                            TRUNCATE_LENGTH
                                                            ? course.courseDescription
                                                                .split(" ")
                                                                .slice(0, TRUNCATE_LENGTH)
                                                                .join(" ") + "..."
                                                            : course.courseDescription}
                                                    </p>
                                                    <p className="text-[12px] text-white">Created At {`${formatedate(course.createdAt, course.duration)}`} </p>
                                                    <p className={`py-1 px-4 font-bold flex gap-2 items-center bg-richblack-700 rounded-full w-fit ${course.status !== "Draft" ? "text-yellow-100" : "text-pink-400"}`}>
                                                        {course.status === "Draft" ?
                                                            (
                                                                <>
                                                                    <IoMdTime />
                                                                    <span>Draft</span>
                                                                </>

                                                            ) :
                                                            (
                                                                <>
                                                                    <CiCircleCheck />
                                                                    <span>Published</span>
                                                                </>
                                                            )}
                                                    </p>
                                                </div>
                                            </Td>

                                            <Td className="text-sm font-medium text-richblack-100">{course.duration}</Td>
                                            <Td className="text-sm font-medium text-richblack-100">₹{course.price}</Td>
                                            <Td className="text-sm font-medium text-richblack-100 ">
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        navigate(`/dashboard/edit-course/${course._id}`)
                                                    }}
                                                    title="Edit"
                                                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <MdEdit size={20} />
                                                </button>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Do you want to delete this course?",
                                                            text2:
                                                                "All the data related to this course will be deleted",
                                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: !loading
                                                                ? () => handleCourseDelete(course._id)
                                                                : () => { },
                                                            btn2Handler: !loading
                                                                ? () => setConfirmationModal(null)
                                                                : () => { },
                                                        })
                                                    }}
                                                    title="Delete"
                                                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <MdDelete size={20} />
                                                </button>

                                            </Td>
                                        </Tr>
                                    ))
                                ) :
                                (
                                    <Tr>
                                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                            No courses found
                                            {/* TODO: Need to change this state */}
                                        </Td>
                                    </Tr>
                                )
                        }
                    </Tbody>
                </Table>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </>



        </div>
    )
}

export default MyCourse
