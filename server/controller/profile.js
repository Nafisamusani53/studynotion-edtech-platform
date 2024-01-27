const Course = require('../models/Course')
const Profile = require('../models/Profile')
const User = require('../models/User')

// we have already created profile at the time of sign up
// so we only to updates the profile

exports.updateProfile = async(req, res) => {
    try{
        // fetch data
        const {dateOfBirth="", about="", gender, contactNo = ""} = req.body
        const id = req.user.id

        // validate data
        if(!gender || !id){
            return res.status(400).json({
                success: false,
                message: "Value missing"
            })
        }

        // find profile from user id
        const user = await User.findById(id);
        const profile = await Profile.findById(user.profile);

        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        if(contactNo !== ""){
            profile.contactNo = contactNo;
        }
        profile.gender = gender;

        // update profile
        await profile.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
        })
    }catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to update a Profile",
            error: err.message
        })
    }
}

// delete account
// todo :- schedule this delete request
exports.deleteAccount = async(req,res)=>{
    try{
        // fetch the id
        const id = req.user.id

        // validate id
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }

        // delete profile
        await Profile.findByIdAndDelete(user.profile)

        // remove user id from every course-[will do it later]
        // for (const courseId of user.courses) {
        //     await Course.findByIdAndUpdate(
        //       courseId,
        //       { $pull: { studentsEnroled: id } },
        //       { new: true }
        //     )
        //   }

        // delete the user
        await User.findByIdAndDelete(id)

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile deleted successfully",
            updatedSection
        })
    }
    catch(err){
        res.status(500).json({
            success: true,
            message: "Failed to delete Profile",
            error: err.message
        })
    }
}