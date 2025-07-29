const express = require("express")
const router = express.Router()
const { auth, isInstructor, isStudent } = require("../middleware/auth")
const {
    deleteAccount,
    updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
  changePassword,
} = require("../controller/profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.post("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.post("/changePassword", auth, changePassword),
// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses)
router.post("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router