const Course = require('../models/Course')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { deleteFile } = require("../utils/deleteFIle")
const { imageUploader } = require("../utils/imageUploader")
const {passwordUpdated} = require('../mail/templates/passwordUpdate')
const bcrypt = require('bcrypt')
const {mailSender}  = require('../utils/mailSender')
const mongoose = require("mongoose")

// we have already created profile at the time of sign up
// so we only to updates the profile

exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const { firstName, lastName, dateOfBirth , about , gender, contactNo  } = req.body
        const id = req.user.id

        // validate data
        if (!firstName || !lastName || !gender || !dateOfBirth || !about || !contactNo || !id) {
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }

        let newcontactNo = parseFloat(contactNo, 10);

        const session = await mongoose.startSession();
        session.startTransaction();

        // find profile from user id
        const user = await User.findById(id);
        const profile = await Profile.findByIdAndUpdate(user.profile, 
            {dateOfBirth,
            about,
            contactNo : newcontactNo,
            gender
        },{new: true , session});

        const updatedUser = await User.findByIdAndUpdate(id , {
            firstName,
            lastName
        }, {new: true , session}).populate("profile")
        

        await session.commitTransaction()
        session.endSession();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUser,
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to update a Profile",
            error: err.message
        })
    }
}

// delete account
// todo :- schedule this delete request
exports.deleteAccount = async (req, res) => {
    try {
        // fetch the id
        const id = req.user.id

        // validate id
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete(user.profile)

        // remove user id from every course-[will do it later]
        // for (const courseId of user.courses) {
        //     await Course.findByIdAndUpdate(
        //       courseId,
        //       { $pull: { studentsEnroled: id } },
        //       { new: true }
        //     )
        //   }

        // delete the user
        await User.findByIdAndDelete(id)

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
            updatedSection
        })
    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to delete Profile",
            error: err.message
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        // fetch the id
        const userId = req.user.id

        // find the user and populate the profile
        const userProfile = await User.findOne({ _id: userId })
            .populate("profile")
            .exec()

        if (!userProfile) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user:userProfile
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to fetch Profile",
            error: err.message
        })
    }
}

exports.updateDisplayPicture = async(req, res) => {
    try {
        // fetch the id
        const userId = req.user.id

        // fetch the image
        const { image } = req.files;

        // find the user
        const user = await User.findById(userId , { image: true });

        // delete it from the cloudinary
        const deleted = await deleteFile(user.image, process.env.FOLDER_NAME);                                                                       

        // now upload the file to cloudinary
        const uploadImage = await imageUploader(image, process.env.FOLDER_NAME, 1000,
            1000)

        // Now update the user
        const updateProfile = await User.findByIdAndUpdate(userId ,
            { image: uploadImage.secure_url },
            { new: true })

        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            data: updateProfile.image
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: "Failed to update Profile image",
            error: err.message
        })
    }
}

exports.changePassword = async(req, res) => {
    try{
        //Get user data from req.user
        const id = req.user.id;

        // fetch data from request
        const {currentPassword, newPassword} = req.body;
        
        // validate data
        if(!currentPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: "Please fill the details properly"
            })
        }

        // check if pass and confirmpass matches or not

        // find user
        const user = await User.findById(id);
        
        // compare old and new password
        if(await bcrypt.compare(currentPassword, user.password)){
            // password matched

            // hash the new password
            const hashPassword = await bcrypt.hash(newPassword ,10)

            // update the password with new one
            const updatedUser = await  User.findByIdAndUpdate(id, {
                password : hashPassword
            },{new: true})
            
            // send email
            try {
                const emailResponse = await mailSender(
                    updatedUser.email,
                    `Password Updated Successfully for ${updatedUser.firstName} ${updatedUser.lastName}`,
                    passwordUpdated(
                        updatedUser.email,
                        updatedUser.firstName,
                    )
                )
            }
            catch (error) {
                //if there's an error sending the email, log the error and return a 500 (Internal Server Error) error
                return res.status(500).json({
                    success: false,
                    message: 'Error Occurred While Sending Email',
                    error: error.message,
                });
            }
            return res.status(200).json({
                success:true,
                message : "Password Updated"
            })
            
        }
        //current password does not match, return a 401 (unauthorized) error
        return res.status(401).json({
            success: false,
            message: "Invalid Password"
        })
        
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec()
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                )
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // find course with instructor in it

        const courses = await Course.find({ instructor: userId });

        if(!courses){
            return res.status(200).json({
                success: false,
                message: "No courses Yet created"
            })
        }

        // Now count for all the course, its number of students enrolled, and revenue it generated

        const courseDetails = courses.map((course) => {
            const studentsEnrolled = course.studentsEnrolled.length;
            const revenue = studentsEnrolled * course.price;

            const courseStats = {
                courseId: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                studentsEnrolled,
                revenue,
            }

            return courseStats
        })

        return res.status(200).json({
            success: true,
            data: courseDetails,
        })
    }
    catch (err) {
        return res.status(500).json({
            success : false,
            message: "Unable to calculate Statistics",
            error: err.message,
        })
    }
}