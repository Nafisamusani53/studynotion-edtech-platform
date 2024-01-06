const bcrypt = require('bcrypt')
const User = require('../models/User');
const hwt = require('jsonwebtoken');
const otp = require('../models/OTP');
const OTP = require('../models/OTP');
import { generateKey, hotp } from "otp-io";
import { hmac, randomBytes } from "otp-io/crypto";
require('dotenv').config();
// send OTP

let otpCounter = 0;
exports.sendOTP = async(req, res) => {
    try{
        const email = req.body.email;

        if(!email){
            return res.status(401).json({
                success: false,
                message : "Email not found"
            })
        }

        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(401).json({
                success : false,
                message: "User already existed , OTP verfication"
            })
        }

        const key = generateKey(randomBytes, /* bytes: */ 20); // Generate a key for HOTP
        const code = hotp(hmac, { secret: key, counter: otpCounter, digits: 6 });
        otpCounter++;

        const OTP = otp.create({
            email : email,
            otp: code,
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// signup
exports.signUp = async(req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            contactNo,
            password, 
            confirmPassword,
            otp,
            role
        } = req.body

        if(!firstName || !lastName || !email || !contactNo || !password || !confirmPassword
            || !otp){

            return res.status(404).json({
                success : false,
                message: "Fill the detail properly"
            })
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and ConfirmPassword dose not match"
            })
        }

        const existingUser = await User.findOne({email:  email});

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User already exist"
            })
        }

        const checkOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        const additionalDetails = {

        }
        if(checkOTP.length === 0){
            return res.status(401).json({
                success: false,
                message: "OTP not found"
            })
        }
        else if(otp !== checkOTP){
            return res.status(401).json({
                success: false,
                message: "OTP does not match"
            })
        }
        const hashPassword = await bcrypt.hash(password ,10)

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null
        })
        let user = await User.create({
            firstName: trim(firstName),
            lastName: trim(lastName),
            email: trim(email),
            contactNo,
            password: hashPassword, 
            role,
            profile: profileDetails,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        user.password = undefined
        user.contactNo = undefined

        res.status(200).json({
            success: true,
            data : user,
            message : "Account created successfully"
        })
    }
    
    catch(err){

    }
}

// login
exports.logIn = async(req,res) => {
    try{
        const {email, pass} = req.body;

        // email or password not entered
        if(!email || !pass){
            return res.status(404).json({
                success : false,
                message: "Email or Password missing, fill the detail properly"
            })
        }

        // check if the email exist or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        // Now match the password
        if(await bcrypt.compare(pass, user.password)){
            const payload = {
                email: user.email,
                role: user.role,
                id : user._id
            }
            const token = await jwt.sign(payload, process.env.SECRET, {
                expiresIn: '2h'
            })

            user = user.toObject()
            user.token = token
            user.password = undefined

            const options = {
                expires : Date.now() + 1*24*60*60*1000,
                httpOnly: true,
            }
            res.cookies("token", token, options).status(200).json({
                token,
                user,
                message: "LoggedIn successfully,"
            })
        }
        else{
            return res.status(401).josn({
                success: false,
                message: "Incorrect password or email"
            })
        }

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.changePassword = async(req, res) => {
    try{
        const {email, oldpassword, password, confirmPassword} = req.body;
        
        if(!email || !oldpassword || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Please fill the details properly"
            })
        }
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and ConfirmPassword dose not match"
            })
        }
        const user = await User.findOne({email:  email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        
        if(await bcrypt.compare(oldpassword, user.password)){
            const hashPassword = await bcrypt.hash(password ,10)

            await User.findOneAndUpdate({email: email}, {
                password : hashPassword
            },{new: true})
            
            return res.status(200).json({
                success:true,
                message : "Password Updated"
            })
            
        }
        return res.status(401).json({
            success: false,
            message: "Invalid Password"
        })
        
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}