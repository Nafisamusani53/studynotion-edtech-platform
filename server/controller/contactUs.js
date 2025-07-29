const {mailSender} = require("../utils/mailSender")
const {contactUsEmail} = require("../mail/templates/contactUsEmail")

exports.contactUs = async(req, res)=> {
    try{
        const {firstName, lastName, email, code, contactNumber, message} = req.body;
        if(!firstName && !lastName && !email && !code && !contactNumber && !message) {
            res.status(404).json({
                success : false,
                message: "Value Missing"
            })
        }

        const result = await mailSender(email, "Your Data Send Successfully", contactUsEmail(email, firstName, lastName, message, contactNumber, code))

        return res.status(200).json({
            success: true,
            data: result,
            message: "Email send successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to send the mail"
        })
    }
}