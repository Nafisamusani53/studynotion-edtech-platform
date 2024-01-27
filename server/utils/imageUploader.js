const cloudinary = require('cloudinary').v2
exports.imageUploader = async(file, folder, hieght, quality) => {
    try{
        const options = {folder};
        if(hieght){
            options.height = height
        }
        if(quality){
            options.quality = quality
        }

        options.resourse_type = "auto"
        return await cloudinary.v2.uploader(file.tempFilePath, options)
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to upload media",
            error: err.message
        })
    }
}