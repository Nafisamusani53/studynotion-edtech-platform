const Category = require('../models/Category')
const User = require('../models/User')
const Course = require('../models/Course')


// need to check fos this code again
// create course
// need to add tags while creating the course - PENDING
exports.createCourse = async(req,res) => {
    try{
        const {courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag,
            status,
            instructions} = req.body
        const thumbnail = req.files.thumbnail

        if(!courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag){
            return res.status(404).json({
                success : false,
                message: "Fill the details properly",
            })
        }

        if(!status || status === undefined) {
            status = "Draft";
        }

        //TODO: add pending and approval of status based on admin approval
        
        const userId = req.user._id

        //check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });

        // Verify that userId and instructorDetails._id are same or different
        if(userId !== instructorDetails._id){
            return res.status(401).json({
                success : false,
                message: "UnAuthorized Access",
            })
        }
        console.log("Instructor Details: " , instructorDetails);

        if(!instructorDetails) {
            return res.status(404).json({
                success: false,
                Message: 'Instructor Details Not Found',
            });
        }

        //check given Category is valid or not
        const categoryDetails = await Category.findById({category})
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        //Upload thumbnail Image to Cloudinary
        const image = await imageUploader(thumbnail, process.env.FOLDER_NAME, 50, 80)
        const courseNew = await Course.create({
            courseName: courseName,
            courseDescription: courseDescription,
            instructor: userId,
            whatYouWillLearn: whatYouWillLearn,
            price:price,
            tag,
            thumbnail: image.secure_url,
            category: categoryDetails._id,
            status,
            instructions,
        })

        //add the new Course to the user schema of instructor
        await User.findByIdAndUpdate(userId, 
            {
                $push : {
                    courses : courseNew._id,
                }
            },{new : true}
        )
        
        //Add the new course to the categories
        const updatedCategory = await Category.findByIdAndUpdate({category},
            { $push: {course : courseNew._id}},
            {new: true}
        )

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: courseNew
        })
    }
    catch(err){
        res.status(500).json({
            success :  false,
            message: "Failed to create course",
            error : err.message
        })
    }
}

// get all course
exports.getAllDetails = async(req,res) => {
    try{
        const allCourses = await Course.find({}, {
            courseName : true,
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
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to fetch the courses",
            error: err.message
        })
    }
}
