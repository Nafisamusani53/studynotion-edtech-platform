const mongoose = require("mongoose")

const reviewAndRatingSchema = new mongoose.Schema({
    body:{
        type: String,
        maxLen: 50,
        required: true,
    },
    rating:{
        type:Number,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model("ReviewAndRatings" , reviewAndRatingSchema);