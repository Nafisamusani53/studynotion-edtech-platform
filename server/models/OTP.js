const mongoose = require('mongoose')
const { mailSender } = require('../utils/mailSender')
const {otpTemplate} = require('../mail/templates/emailVerificationTemplate')

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
      expires: 5*60 //The document will be automatically deleted after 5-minutes of its creation
    }
})

//async function -> to send emails
async function sendVerificationMail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification code from StudyNotion", otpTemplate(otp));

        
    }
    catch(err){
        console.error(err.message)
    }
}

otpSchema.pre('save', async function(next){

     //only send an email when a new document is created 
    if(this.isNew) {
        await sendVerificationMail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema)