const Category = require('../models/Category')
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory = async(req,res)=>{
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

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate:  [
            { path: "reviewAndRatings" },
            {
              path: "instructor",
              select: "firstName lastName", // Select only firstName and lastName
            },
          ],
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      // if (selectedCategory.course.length === 0) {
      //   console.log("No courses found for the selected category.")
      //   return res.status(404).json({
      //     success: false,
      //     message: "No courses found for the selected category.",
      //   })
      // }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
      .populate({
        path: "course",
        match: { status: "Published" },
        populate:  [
          { path: "reviewAndRatings" },
          {
            path: "instructor",
            select: "firstName lastName", // Select only firstName and lastName
          },
        ],
      })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate:  [
          { path: "reviewAndRatings" },
          {
            path: "instructor",
            select: "firstName lastName", // Select only firstName and lastName
          },
        ],
      })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }