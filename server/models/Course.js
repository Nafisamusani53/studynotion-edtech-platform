const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{
        type: String,
        required: true,
        maxLen: 50,
        trim: true
    },
    courseDescription:{
        type: String,
        required: true,
        trim: true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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
    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    tag:{
        type: [String],
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    },
    reviewAndRatings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewAndRatings",
    }],
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }],
    instructions:{
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
},{timestamps: true})

module.exports = mongoose.model("Course", courseSchema)