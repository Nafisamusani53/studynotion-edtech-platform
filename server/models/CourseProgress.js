const mongoose = require("mongoose")

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Course"
    },
    completedVideos:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection"
    }],
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
})

module.exports = mongoose.model("CourseProgress", courseProgressSchema)