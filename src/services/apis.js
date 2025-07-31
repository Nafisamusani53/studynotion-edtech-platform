const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    GET_ALL_CATEGORY: BASE_URL + "/course/getAllCategory",
    CREATE_CATEOGORY: BASE_URL + "/course/createCategory",
    GET_CATEGORY_PAGE_DETAILS: BASE_URL + "/course/getCategoryPageDetails",
}

export const auth = {
    LOGIN : BASE_URL + "/auth/login",
    SIGNUP : BASE_URL + "/auth/signup",
    SEND_OTP : BASE_URL + "/auth/sendOTP",
    RESET_PASS_TOKEN : BASE_URL + "/auth/reset-password-token",
    RESET_PASSWORD: BASE_URL + "/auth/reset-password",
}

export const profile = {
    IMAGE : BASE_URL + "/profile/updateDisplayPicture",
    USER_DETAILS : BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD : BASE_URL + "/profile/changePassword",
    GET_ENROLLED_COURSES: BASE_URL + "/profile/getEnrolledCourses"

}
export const contactUs = {
    CONTACT_US_API : BASE_URL + "/reach/contact",
};

export const course = {
    CREATE_COURSE : BASE_URL +  "/course/createCourse",
    EDIT_COURSE : BASE_URL +  "/course/editCourse",
    CREATE_SECTION : BASE_URL + "/course/addSection",
    INSTRUCTOR_COURSE : BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE : BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS : BASE_URL + "/course/getFullCourseDetails",
    UPDATE_SECTION : BASE_URL +  "/course/updateSection",
    DELETE_SECTION : BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION : BASE_URL + "/course/deleteSubSection",
    CREATE_SUBSECTION : BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION : BASE_URL + "/course/updateSubSection",
    PUBLISH_COURSE : BASE_URL + "/course/publishCourse",
    COURSE_DETAILS : BASE_URL + "/course/getCourseDetails",
   
}

export const payment = {
  COURSE_PAYMENT: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL: BASE_URL + "/payment/sendPaymentSuccessEmail",
}