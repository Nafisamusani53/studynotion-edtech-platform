import {auth} from "../apis"
import { apiConnector } from '../apiConnector'
import toast from 'react-hot-toast'
import { setLoading, setToken } from '../../slices/authSlice'
import { setUser } from '../../slices/profileSlice'


export const sendOTP = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...")
        try{
            console.log(email)
            const result = await apiConnector("POST", auth.SEND_OTP, {email, checkUserPresent: true,});
            console.log(result);

            if(!result.data.success){
                throw new Error(result.data.message)
            }
            console.log(result.data);
                toast.success("OTP sent successfully");
                navigate("/verify-email");
        }
        catch(error){
            console.log("Error while sending otp");
            console.log(error)
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const signup = (data, otp1, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const info = {...data};
            const otp = parseInt(otp1);
            info.otp = otp;
            console.log("info")
            console.log(info)
            const result = await apiConnector("POST", auth.SIGNUP, info);
            console.log(result)

            if(!result.data.success){
                throw new Error(result.data.message)
            }
            console.log(result.data.data)
                toast.success("Account created successfully")
                navigate("/login");
        }
        catch(error){
            toast.error("Failed to create account")
            console.log("Error in axios")
            console.error(error)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const login = (data, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const result = await apiConnector("POST", auth.LOGIN, data);
            console.log(result)

            if(result.data.success){
                toast.success("Loged In Successfully")
                dispatch(setToken(result.data.token))
                dispatch(setUser(result.data.user))
                const userImage = result.data?.user?.image
        ? result.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.user.firstName} ${result.data.user.lastName}`
        dispatch(setUser({ ...result.data.user, image: userImage }))
                localStorage.setItem("token", JSON.stringify(result.data.token))
                navigate("/dashboard/profile");
            }
            
        }
        catch(error){
            toast.error("Failed to Login In")
            console.log("Error in axios")
            console.error(error)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const logout = (navigate) => {
    return (dispatch) => {
        localStorage.removeItem("token");
        dispatch(setToken(null))
        dispatch(setUser(null))
        toast.success("Logout Successfully")
        navigate("/")
    }
  }
