const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender:{
        type: String,
        required: true,
        enum: ["Male", "Female","Other"]
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    about:{
        type: String,
        trim: true
    }

})

module.exports = mongoose.model("Profile", profileSchema)