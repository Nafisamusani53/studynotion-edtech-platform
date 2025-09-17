import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import courseSlice from "../slices/courseSlice";
import categorySlice from "../slices/categorySlice";
import viewCourseSlice from "../slices/viewCourseSlice"

const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
    course: courseSlice,
    category: categorySlice,
    viewCourse : viewCourseSlice,
})
export default rootReducer;