const User = require('../models/User');
const { mailSender } = require('../utils/mailSender');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async(req,res) => {
    try{
        const email = req.body.email

        if(!email){
            return req.status(401).json({
                success : false,
                message: "email not found"
            })
        }

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        const token = crypto.randomUUID()

        const update = await User.findOneAndUpdate({email: email}, {
            token: token,
            resetPasswordExpires: Date.now() + 5*60*1000,
        },{new: true})

        const url = `https://localhost:3000/update-password/${token}`

        await mailSender(email, 'Reset Password Link', `Password Reset Link : ${token}`)

        return res.status(200).json({
            success: true,
            message: "reset password sent successfully"
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

        if(Date.now() > user.resetPasswordExpires){
            return res.status(401).json({
                success: false,
                message: "Link expired"
            })
        }

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
