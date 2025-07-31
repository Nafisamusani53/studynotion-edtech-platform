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
            const result = await apiConnector("POST", auth.SEND_OTP, {email});
            if(!result.data.success){
                throw new Error(result.data.message)
            }
                toast.success("OTP sent successfully");
                navigate("/verify-email");
        }
        catch(error){
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const signup = (data, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            // const info = {...data};
            // const otp = parseInt(otp1);
            // data.otp = otp;
            const result = await apiConnector("POST", auth.SIGNUP, data);

            if(!result.data.success){
                throw new Error(result.data.message)
            }
                toast.success("Account created successfully")
                navigate("/login");
        }
        catch(error){
            toast.error("Failed to create account")
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

  export function getPasswordResetToken(email , setEmailSent) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", auth.RESET_PASS_TOKEN, {email,})


      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await apiConnector("POST", auth.RESET_PASSWORD, {password, confirmPassword, token});



      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login")
    }
    catch(error) {
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}
