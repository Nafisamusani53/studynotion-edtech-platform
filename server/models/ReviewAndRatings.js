const mongoose = require("mongoose")

const reviewAndRatingSchema = new mongoose.Schema({
    review:{
        type: String,
        required: true,
    },
    rating:{
        type:Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }
})

module.exports = mongoose.model("ReviewAndRatings" , reviewAndRatingSchema);