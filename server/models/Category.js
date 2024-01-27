const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName: {
        type:String,
        required: true,
        trim :true,
    },
    categoryDescription:{
        type: String,
        required: true,
    },
    course:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }]
})

module.exports = mongoose.model('Category', categorySchema)