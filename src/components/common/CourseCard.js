import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { avgRatings } from '../../utils/reviewAndRatings';

const CourseCard = ({ course}) => {
    return (


        <Link to={`/course/${course._id}`}>
            <div className='flex flex-col gap-5 p-4 bg-richblack-800 opacity-100 hover:scale-105 hover:bg-richblack-700 transition-all duration-200 rounded-md'>
            <img src={course.thumbnail} alt={course.courseName} className=' rounded-md' />
            <div className='flex flex-col'>
                <h1 className='text-richblack-5'>{course.courseName}</h1>
                <p className='text-richblack-400'>{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
                <ReactStars
                    count={5}
                    edit={false}
                    size={20}
                    activeColor="#ffd700"
                    value={avgRatings(course?.reviewAndRatings)}
                />
                <h1 className='text-richblack-5'>{`Rs. ${course.price}`}</h1>

            </div>
        </div>
        </Link>
    )
}

export default CourseCard
