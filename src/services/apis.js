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
}

export const profile = {
    IMAGE : BASE_URL + "/profile/updateDisplayPicture",
    USER_DETAILS : BASE_URL + "/profile/getUserDetails",
    UPDATE_PROFILE : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD : BASE_URL + "/profile/changePassword",

}