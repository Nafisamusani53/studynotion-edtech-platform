const Course = require('../models/Course')
const Profile = require('../models/Profile')
const User = require('../models/User')
const { deleteFile } = require("../utils/deleteFIle")
const { imageUploader } = require("../utils/imageUploader")

// we have already created profile at the time of sign up
// so we only to updates the profile

exports.updateProfile = async (req, res) => {
    try {
        // fetch data
        const { dateOfBirth = "", about = "", gender, contactNo = "" } = req.body
        const id = req.user.id

        // validate data
        if (!gender || !id) {
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }

        // find profile from user id
        const user = await User.findById(id);
        const profile = await Profile.findById(user.profile);

        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        if (contactNo !== "") {
            profile.contactNo = contactNo;
        }
        profile.gender = gender;

        // update profile
        await profile.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
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
        const userProfile = await User.findOne({ _id: userId }, { profile: true })
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
            userProfile
        })
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to fetch Profile",
            error: err.message
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        // fetch the id
        const userId = req.user.id

        // fetch the image
        const { image } = req.file;

        // find the user
        const user = await User.findById({ userId }, { image: true });

        // delete it from the cloudinary
        const deleted = await deleteFile(user.image);

        // now upload the file to cloudinary
        const uploadImage = await imageUploader(image, process.env.FOLDER_NAME, 1000,
            1000)

        // Now update the user
        const updateProfile = await User.findByIdAndUpdate({ userId },
            { image: uploadImage.secure_url },
            { new: true })

        return res.status(200).json({
            success: true,
            message: "Profile image updated successfully",
            data: updateProfile.image
        })


    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to update Profile image",
            error: err.message
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