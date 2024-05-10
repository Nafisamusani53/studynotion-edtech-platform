const Course = require('../models/Course')
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const { deleteFile } = require('../utils/deleteFIle')
require("dotenv").config();

exports.createSection = async(req, res) => {
    try{
        // fetch data
        const{sectionName, courseId} = req.body
        
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: true,
                message: "Missing properties"
            })
        }

        // create section
        const section = await Section.create({sectionName})

        // push sectionId into course model
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push : {
                    courseContent: section._id
                }
            }, {new: true})
            .populate({               /* this is nested populate*/
                path: 'courseContent',
                populate : {
                    path : 'subSection'
                }
            }).exec()
        // I have used nested populate to populate section in which i have to populate
        // subsection
        
        // return response
        return res.status(200).json({
            success: true,
            message: "Section created",
            data:updatedCourse
        })

    }
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to create a section",
            error: err.message
        })
    }
}

// updated section
exports.updateSection = async(req, res) => {
    console.log("inside UpdateSection")
    
    try{
        // fetch Data
        const{sectionName, sectionId, courseId} = req.body
        console.log("section", req.body);

        //  validate Data
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // updated Section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            sectionName: sectionName
        },{new : true}).populate("subSection").exec();
        // no need to update Id of section in Course as the ID of section remains same
        // only it's content has changed

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        // return response
        return res.status(200).json({
            success: true,
            data: course,
            message: "Section updated"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to create a section",
            error: err.message
        })
    }
}

// delete Section
// in future there wil be lot to change in this controller like
// delete sectionId from course model
// delete all the subsection if there are

// there can be one way if the section has SubSection id in it
// tell the user to delete the subsection first then come

// OR

// perform mutliple delete operation cloudinary and subSection to delete multiple documents
exports.deleteSection = async(req, res) => {
    try{
        // fetch course id from req body
        const {courseId,sectionId} = req.body;

        // validate the data
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing properties"
            })
        }

        // now find the section by id
        const section = await Section.findById(sectionId)

        // need to delete files from cloudinary
        section.subSection.forEach(async(subSection)=> {
            await deleteFile(subSection.videoUrl, process.env.FOLDER_NAME)
        })

        // or you can make the user to delete all the subsection first

        // delete all subSection
        await SubSection.deleteMany({_id: {$in: section.subSection}});
        // delete a section
        await Section.findByIdAndDelete(sectionId);

        // update course ID
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $pull : {
                    courseContent:section._id
                }
            },{new: true})
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )
            .populate("category")
            .populate("reviewAndRatings")
            .exec();
        

        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted",
            data: updatedCourse
        })
    }
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to delete a section",
            error: err.message
        })
    }
}

