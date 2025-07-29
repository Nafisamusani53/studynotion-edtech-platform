const SubSection = require('../models/SubSection')
const Section = require('../models/Section');
const { deleteFile } = require('../utils/deleteFIle');
const { imageUploader } = require('../utils/imageUploader');


exports.createSubSection = async(req, res)=> {
    try{
        // fetch data from
        const {sectionId, title, description} = req.body

        // fetch video from files
        const video = req.files.videoUrl

        // do data validation
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }

        // upload video in the cloudinary
        const videoUrl = await imageUploader(video, process.env.FOLDER_NAME);

        // now create a subsection
        const subSection = await SubSection.create({
            title,
            description,
            duration: `${videoUrl.duration}`,
            videoUrl: videoUrl.secure_url
        })

        // push sebsection id to the section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push :{
                    subSection : subSection._id
                }
            },{new: true}).populate('subSection');

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub Section created successfully",
            data: updatedSection
        })
    }
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to create a Sub Section",
            error: err.message
        })
    }
}

// upadate SubSection
exports.updateSubSection = async(req, res) => {
    try{
        // fetch data
        const {title, description, subSectionId,sectionId} = req.body;

        // validate data
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }
        let subSection = await SubSection.findById(subSectionId);

        if(title !== undefined) {
            subSection.title = title;
        }

        if(description !== undefined) {
            subSection.description = description;
        }


        if(req.files && req.files.video !== undefined) {
            // delete the prev video if there
            if(subSection.videoUrl){
                await deleteFile(subSection.videoUrl, process.env.FOLDER_NAME)
            }
            
            const video = req.files.video;
            const uploadDetails = await imageUploader(
                video,
                process.env.FOLDER_NAME,
            )
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.duration = `${uploadDetails.duration}`
        }
        
        // update subSection
        const updateSubSection= await subSection.save();
        
        const section = await Section.findById(sectionId).populate("subSection").exec();
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub Section updated successfully",
            data: section
        })
    }
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to update a Sub Section",
            error: err.message
        })
    }
}

// delete sub section
// will do it later as need to see how to work with deletion of files in cloudinary
exports.deleteSubSection = async(req, res) => {
    try{
        // fetch data
        const {subSectionId, sectionId} = req.body

        // validate data
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }

        // fetch the document
        const subSection = await SubSection.findById(subSectionId)

        // delete file on cloudinary
        await deleteFile(subSection.videoUrl, process.env.FOLDER_NAME) 

        // delete SubSection
        await SubSection.findByIdAndDelete(subSectionId);

        // update it on Section
        const upadatedSection = await Section.findByIdAndUpdate(sectionId, {
            $pull : {
                subSection : subSectionId
            }
        }, {new: true}).populate("subSection").exec()

        // return response
        return res.status(200).json({
            success: true,
            message: "Sub Section updated successfully",
            data:upadatedSection
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to delete a Sub Section",
            error: err.message
        }) 
    }
}