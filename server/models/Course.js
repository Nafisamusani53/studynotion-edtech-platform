const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLen: 50,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    Instructor:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    whatYouWillLearn:{
        type: String,
        required: true,
        trim: true,
    },
    price:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    CourseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required:true,
    }],
    tags:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tags",
        required: true,
    },
    reviewAndRatings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewAndRatings",
    }],
    totalRatings:{
        type: Number,
        default: 0,
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        
    }]
})

module.exports = mongoose.model("Course", courseSchema)