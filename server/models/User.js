const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Student", "Instructor"]
    },
    contactNo:{
        type: Number,
        required: true,
        trim: true
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }],
    image:{
        type: String,
        default: "",
        required: true,
    },
    token:{
        type: String,
    },
    resetPasswordExpires:{
        type: Date,
    }
})

module.exports = mongoose.model("User", userSchema)