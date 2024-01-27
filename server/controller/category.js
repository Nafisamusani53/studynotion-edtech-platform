const Category = require('../models/Category')

exports.category = async(req,res)=>{
    try{
        const {categoryName, categoryDescription} = req.body;

        if(!categoryName || !categoryDescription){
            return res.status(404).json({
                success: false,
                message: "Please fill the details properly"
            })
        }

        // if that category already existed
        const category = await Category.findOne({categoryName: categoryName});
        if(category){
            return res.status(401).json({
                success: false,
                data: category._id,
                message: "Category already existed"
            })
        }

        //create entry in DB
        const newCategory = await Category.create({categoryName, categoryDescription});
        
        //return response 
        res.status(200).json({
            success: true,
            data: newCategory._id,
            message: "Category created"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to create Category",
            error: err.message
        })
    }
}

// get all Category
exports.getAllCategory = async(req,res)=>{
    try{
        const category = await Category.find({},
            {categoryName: true, categoryDescription: true});

        return res.status(200).json({
            success: true,
            data: category,
            message: "All Category fetched"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to fetch the data",
            error: err.message
        })
    }
}

