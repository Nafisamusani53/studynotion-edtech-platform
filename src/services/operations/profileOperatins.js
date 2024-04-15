import { apiConnector } from "../apiConnector";
import { profile } from "../apis";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { setLoading } from "../../slices/authSlice";
import { logout } from "./authOperations";


export const updatePhoto = (file, token, user) => {
    return async(dispatch)=> {
        console.log(file)
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        let formData = new FormData();
        formData.append('image', file, file.name);
        const authToken = `Bearer ${token}`

        const headers = {
            
            'Authorization': authToken,
        }

        try{
            const result = await apiConnector("POST", profile.IMAGE, formData, headers)
            console.log("result",result)
            if(!result.data.success){
                throw new Error(result.data.message)
            }


            dispatch(setUser({...user, image : result.data.data}))
            toast.success("Profile Picture Updated Successfully")
        }
        catch(err){
            
            toast.error("Failed to updated Profile picture ")
            console.log("Error")
            console.log(err.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export const getUserDetails = (token, navigate) => {
    return async(dispatch)=>{
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        
        try{
            const headers = {
                'Authorization': `Bearer ${token}`,
            }
            const data = null;
            const result = await apiConnector("GET", profile.USER_DETAILS, data, headers)
            console.log(result)

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            dispatch(setUser(result.data.user))
            toast.success("User Details fetched successfully")
        }
        catch(error){
            dispatch(logout(navigate))
            toast.error("Failed to fetch the user details")
            console.log("Error")
            console.error(error.message);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const updateProfile =(token, data) => {
    return async(dispatch) => {
        console.log("data", data)
        dispatch(setLoading(true))
        const toastId = toast.loading("Loading...")
        console.log("outside try")
        try{

            const headers = {
                'Authorization': `Bearer ${token}`,
            }

            console.log("header done")

            const result = await apiConnector("POST", profile.UPDATE_PROFILE, data, headers);
            console.log("api call done")
            console.log(result);

            if(!result.data.success){
                throw new Error(result.data.message)
            }


            dispatch(setUser(result.data.updatedUser))
            toast.success("Profile updated successfully")
        }
        catch(error){
            toast.error("Unable to update profile")
            console.log("Unable to update the profile")
            console.error(error.message);
    
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
    
}

export const changePassword = (token, data,navigate) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")
        try{

            const headers = {
                'Authorization': `Bearer ${token}`,
            }

            const result = await apiConnector("POST", profile.CHANGE_PASSWORD, data, headers)
            console.log(result)

            if(!result.data.success){
                throw new Error(result.data.message)
            }

            toast.success("Password changed successfully")
            dispatch(logout(navigate));

        }
        catch(error){
            toast.error("Unable to change password")
            console.log("Unable to change password")
            console.error(error.message);

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
}