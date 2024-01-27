const Course = require('../models/Course')
const ReviewAndRatings = require('../models/ReviewAndRatings')
const mongoose = require('mongoose')

exports.createRatings = async(req, res) => {
    try{
        // fetch data
        const {courseId, rating , review} = req.body;
        const userId = req.user.id;
        
        // validate the data
        if(!courseId || !rating || !review){
            return res.status(404).json({
                success: false,
                message: "Missings fields"
            })
        }

        // check if user is enrolled for the course or not
        const courseEnrolled = await Course.findOne(courseId, {studentsEnrolled : {$eleMatch: {$eq : userId}}})

        if(!courseEnrolled){
            return res.status(404).json({
                success: false,
                message: "User is not enrolled in the course"
            })
        }

        // check if user has already given the ratings
        const alreadyRated = await ReviewAndRatings.findOne({
                                                            user : userId,
                                                            course: courseId});
        if(alreadyRated){
            return res.status(404).json({
                success: false,
                message: "User has already rated and reviewed the course"
            })
        }
    
        
        // create the ratings

        const ratingAndReview = await ReviewAndRatings.create({
            review,rating,
            user : userId,
            courseId: courseId
        })

        // update the course
        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {
                $push : {reviewAndRatings : ratingAndReview._id}
            },
            {new : true}
        )

        // return the response
        return res.status(200).json({
            success: true,
            message: "Successfully ratings and review had been given",
            data : ratingAndReview
        })
    }
    catch(err){
        return res.status(404).json({
            success: false,
            message: "failed to rate and review the course",
            error: err.message
        })
    }
}

exports.getAverageRatings = async(req, res) => {
    try{
        // fetch the data
        const {courseId} = req.body;

        // find all the ratings related to the course and find the average ratings
        const ratings = await ReviewAndRatings.aggregate(
            {
                $match : {
                    courseId : new mongoose.Types.ObjectId(courseId) 
                }
            },
            {
                $group: {
                    _id: null,
                    averageRatings : {$avg : "$rating"},
                }
            }
        )

        // return response
        if(ratings.length > 0){
            return res.status(200).json({
                success: true,
                averageRatings : ratings[0].averageRatings
            })
        }

        // if no ratings
        return res.status(200).json({
            success: true,
            message: "No ratings given by the students yet",
            averageRatings : 0,
        })

    }
    catch(err){
        return res.status(404).json({
            success: false,
            message: "failed to calculate the average ratings of the course",
            error: err.message
        })
    }
}

// fetches all the reviews and ratings irrespective of the course
exports.getAllRatings = async(req,res) => {
    try{
        // get all the ratings and reviews and populate user and course
        const result = await ReviewAndRatings.find({}).sort({rating: "desc"})
                                                      .populate({
                                                        path: "user",
                                                        select: "firstName lastName email image" 
                                                      })
                                                      .populate({
                                                        path: "courseId",
                                                        select: "courseName" 
                                                      }).exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "fetched successfully",
            data : result,
        })
    }
    catch(err){
        return res.status(404).json({
            success: false,
            message: "failed to fetch the rating and review",
            error: err.message
        })
    }
}

exports.courseReviewAndRating = async(req, res) => {
    try{
        // fetch the courseId
        const {courseId} = req.body;

        // find all the ratings And Review related to the course
        const reviewAndRatings = await ReviewAndRatings.find({courseId : courseId})
                                                        .sort({rating: "desc"})
                                                        .populate({
                                                        path: "user",
                                                        select: "firstName lastName email image" 
                                                        })
        // return the response
        if(!reviewAndRatings){
            return res.status(404).json({
                success: false,
                message: "No review and Ratings given by the users",
            })
        }

        return res.status(200).json({
            success: true,
            message: "fetched successfully",
            data : reviewAndRatings,
        })
    }
    catch(err){
        return res.status(404).json({
            success: false,
            message: "failed to fetch the rating and review",
            error: err.message
        })
    }
}