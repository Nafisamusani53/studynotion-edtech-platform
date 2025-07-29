const Category = require('../models/Category')
const User = require('../models/User')
const Course = require('../models/Course')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const { imageUploader } = require('../utils/imageUploader')
const { deleteFile } = require('../utils/deleteFIle')
const { secToDuration } = require('../utils/secsToDuration')


// need to check fos this code again
// create course
// need to add tags while creating the course - PENDING
exports.createCourse = async (req, res) => {
    try {
        const { courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            instructions } = req.body
        const thumbnail = req.files.thumbnail
        let { status } = req.body;


        if (!courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag ||
            !instructions) {
            return res.status(404).json({
                success: false,
                message: "Fill the details properly",
            })
        }

        if (!status || status === undefined) {
            status = "Draft";
        }


        //TODO: add pending and approval of status based on admin approval




        const userId = req.user.id

        //check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            role: "Instructor",
        });

        // Verify that userId and instructorDetails._id are same or different
        if (!instructorDetails) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Access OR Instructor Details Not Found",
            })
        }

        //check given Category is valid or not
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        let newPrice = parseInt(price);

        //Upload thumbnail Image to Cloudinary
        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME)
        const courseNew = await Course.create({
            courseName: courseName,
            courseDescription: courseDescription,
            instructor: userId,
            whatYouWillLearn: whatYouWillLearn,
            price: newPrice,
            tag,
            thumbnail: image.secure_url,
            category: categoryDetails._id,
            status,
            instructions
        })
        //add the new Course to the user schema of instructor
        await User.findByIdAndUpdate(userId,
            {
                $push: {
                    courses: courseNew._id,
                }
            }, { new: true }
        )

        //Add the new course to the categories
        const updatedCategory = await Category.findByIdAndUpdate(category,
            { $push: { course: courseNew._id } },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: courseNew
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message
        })
    }
}

// get all course
exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: true,
            courseDescription: true,
            price: true,
            thumbnail: true,
            instructor: true,
            reviewAndRatings: true,
            studentsEnrolled: true,
        }).populate("instructor").exec()

        return res.status(200).json({
            success: true,
            message: "Successfully all courses are fetched",
            data: allCourses
        })
    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to fetch the courses",
            error: err.message
        })
    }
}
exports.getFullCourseDetails = async (req, res) => {
    try {
        // fetch courseId
        const { courseId } = req.body;

        // validate id
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // find the course and populate everything
        const course = await Course.findById(courseId).
            populate(
                {
                    path: "instructor",
                    select: "firstName lastName email image",
                }
            )
            .populate({
                path: "courseContent", // Corrected path here
                populate: {
                    path: "subSection"
                }
            })
            .populate("category")
            .populate("reviewAndRatings").exec();

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not Found"
            })
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Detailed fetched successfully",
            data: course,
        })

    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "Failed to fetch the data",
            error: err.message
        })
    }
}

exports.editCourse = async (req, res) => {
    try {
        const { courseId, courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            instructions } = req.body
        const thumbnail = req.files.thumbnail
        let { status } = req.body;

        if (!courseId ||
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag ||
            !instructions) {
            return res.status(404).json({
                success: false,
                message: "Fill the details properly",
            })
        }

        if (!status || status === undefined) {
            status = "Draft";
        }


        //TODO: add pending and approval of status based on admin approval




        const userId = req.user.id

        //check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            role: "Instructor",
        });

        // Verify that userId and instructorDetails._id are same or different
        if (!instructorDetails) {
            return res.status(401).json({
                success: false,
                message: "UnAuthorized Access OR Instructor Details Not Found",
            })
        }

        // check if course exist
        const courseExist = await Course.findById(courseId);
        if (!courseExist) {
            return res.status(404).json({
                success: false,
                message: "Course does not exist"
            })
        }

        //check given Category is valid or not
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }


        let newPrice = parseInt(price);

        // delete previous image
        const deleted = await deleteFile(courseExist.thumbnail, process.env.FOLDER_NAME);

        //Upload thumbnail Image to Cloudinary

        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME)

        const courseNew = await Course.findByIdAndUpdate(courseId, {
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn,
            price: newPrice,
            tag,
            thumbnail: image.secure_url,
            category: categoryDetails._id,
            status,
            instructions
        }, { new: true }).populate({
            path: "courseContent", // Corrected path here
            populate: {
                path: "subSection"
            }
        }).populate("category")
        .populate("reviewAndRatings")
        .exec();

        // check if category has changed or not
        if (courseExist.category !== categoryDetails._id) {
            // if changed
            const removeCourse = await Category.findByIdAndUpdate(courseExist.category,
                { $pull: { course: courseNew._id } },
                { new: true }
            )

            const updatedCategory = await Category.findByIdAndUpdate(category,
                { $push: { course: courseNew._id } },
                { new: true }
            )
        }

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: courseNew
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        let result = await Course.find({ instructor: userId }).populate({
            path: "courseContent", // Corrected path here
            populate: {
                path: "subSection"
            }
        }).exec();

        let response = []
        result.forEach((course) => {

            course = course.toObject();
            
            let totalDurationInSeconds = 0
            course.courseContent.forEach((content) => {
                content.subSection.forEach((subSection) => {
                    const timeDurationInSeconds = parseInt(subSection.duration)
                    totalDurationInSeconds += timeDurationInSeconds
                })
            })
            course.duration = secToDuration(totalDurationInSeconds)
            response.push(course)
        })


        return res.status(200).json({
            success: true,
            data: response,
            message: "Instructor course fetched successfully"
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to fetch the course"
        })
    }
}

exports.deleteCourse = async(req, res) => {
    try{

        const {courseId} = req.body;
        const userId = req.user.id;

        // validate the data;
        if(!courseId){
            return res.status(401).json({
                success: false,
                message: "Value missing"
            })
        }

        // check user exist or not
        const user = await User.findById(userId);
        if(!user){
            return res.status(403).json({
                success : false,
                message: "User doesnot exist"
            })
        }

        // check if that course exisat or not
        const courseExist = await Course.findById(courseId);
        if(!courseExist){
            return res.status(403).json({
                success: false,
                message: "Course does not exist"
            })
        }

        // delete the thumbnail from cloudinary
        await deleteFile(courseExist.thumbnail, process.env.FOLDER_NAME);

        // now fetch all sections related to course
        const sections = await Section.find({_id : {$in: courseExist.courseContent}})

        sections.forEach(async(section)=> {
            const subSections = await SubSection.find({_id: {$in : section.subSection}})
            subSections.forEach(async(subSection)=> {
                await deleteFile(subSection.videoUrl, process.env.FOLDER_NAME)
            })
            const deletedsubSection = await SubSection.deleteMany({_id: {$in : section.subSection}})
        })
        const deleteSections = await Section.deleteMany({_id: {$in: courseExist.courseContent}})

        const deleteCourse = await Course.deleteOne({_id: courseExist._id});

        // update the category
        const updateCategory = await Category.findByIdAndUpdate(courseExist.category , {
            $pull : {
                course: courseExist._id
            }
        },{new: true})

        // Update th user
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull : {courses : courseExist._id}
        },{new : true})

        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
            data: {Course: deleteCourse, Section: deleteSections}
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to delete the course",
            error: error.message
        })
    }
}

exports.publishCourse = async(req, res)=>{
    try{
        // fetch the data
        const {courseId} = req.body;

        // validate the data
        if(!courseId){
            return res.status(401).json({
                success: false,
                message: "Value missing"
            })
        }

        // Change the status
        const result = await Course.findByIdAndUpdate(courseId, {
            status : "Published"
        },{new: true}).populate({
            path: "courseContent", // Corrected path here
            populate: {
                path: "subSection"
            }
        }).populate("category")
        .populate("reviewAndRatings")
        .exec();

        return res.status(200).json({
            success: true,
            message: "Course published successfully",
            data: result
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to publish the course",
            error: error.message
        })
    }
}