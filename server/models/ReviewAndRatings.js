const mongoose = require("mongoose")

const reviewAndRatingSchema = new mongoose.Schema({
    reviews:{
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
})

module.exports = mongoose.model("ReviewAndRatings" , reviewAndRatingSchema);