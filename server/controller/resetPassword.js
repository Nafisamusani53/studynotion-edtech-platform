const User = require('../models/User');
const { mailSender } = require('../utils/mailSender');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async(req,res) => {
    try{
        //get email from req body
        const email = req.body.email

        if(!email){
            return req.status(401).json({
                success : false,
                message: "email not found"
            })
        }

        //check user for this email, email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        //generate token
        const token = crypto.randomUUID()

        const update = await User.findOneAndUpdate({email: email}, {
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000,
        },{new: true})

        const url = `https://localhost:3000/update-password/${token}`

        await mailSender(email, 'Reset Password Link', `Your link for email verification is ${url}. Please click this url to reset your password.`)

        return res.status(200).json({
            success: true,
            message: "Email sent successfully, Please Check Your Email To Continue Further"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.resetPassword = async(req,res) => {
    try{
        const {password, confirmPass, token} = req.body;

        if(password !== confirmPass){
            return res.status(401).json({
                success: false,
                message: "Password and Confirm Password does not match"
            })
        }

        // find user through token
        const existingUser = await User.findOne({token: token})

        if(!existingUser.token){
            return res.status(401).json({
                success: false,
                message: "Token not present or Invalid token"
            })
        }

        if(Date.now() > existingUser.resetPasswordExpires){
            return res.status(401).json({
                success: false,
                message: "Link expired"
            })
        }
        //hash password
        const hashPassword = await bcrypt(password, 10);

        const user = await User.findOneAndUpdate({token: token},{
            password: hashPassword
        },{new:true})

        res.status(200).json({
            success: true,
            message: "Password Updated successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
