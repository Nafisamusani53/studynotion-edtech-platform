// Authentication
const jwt = require('jsonwebtoken')
console.log("middleware")
exports.auth = (req,res, next) => {
    try{
        console.log("hello")
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token;
        console.log("cookies")
        console.log(token)
        if(!token){
            console.log("no token")
            return res.status(401).json({
                success: false,
                message : "Invalid user or token Missing"
            })
        }

        try{
            console.log("try block in auth")
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("token decoded") 
        req.user = decode
        console.log(decode)
        console.log("auth called")
        next();
        }
        catch(error){
            console.log(error.message)
            return res.status(403).json({
                success: false,
                message: error.message
            })
        }
        
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// isStudent
exports.isStudent = async(req,res, next)=>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for student only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res, next)=>{
    try{
        if(req.user.role != "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res, next)=>{
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin only"
            })
        }
        next()
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}