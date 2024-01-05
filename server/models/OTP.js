const mongoose = require('mongoose')
const { mailSender } = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        required: true,
    },
    createdAt:{
      type: Date,
      default: Date.now(),
      expires: 5*60 
    }
})

async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification code from StudyNotion", otp);

        console.log("Mail send successfully" , mailResponse)
    }
    catch(err){
        console.log("Error while sending mail")
        console.error(err.message)
    }
}

otpSchema.pre('save', async function(next){
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema)