import toast from "react-hot-toast";
import { setCategories } from "../../slices/categorySlice";
import { apiConnector } from "../apiConnector"; 
import { categories } from "../apis";

export const getAllCategories = () => {
    return async(dispatch) => {
        try{
            const result = await apiConnector("get", categories.GET_ALL_CATEGORY)
            toast.success("fetched the data")
            dispatch(setCategories(result.data.data));
            
        }
        catch(error){
            console.error("Error config:", error.config);
            toast.error("Error while fetching categories");
        }
    }
}

export const getCategoryPageDetails = async(data) => {
    if(!data?.categoryId){
        return;
    }
    const toastId = toast.loading("Loading...");
    let result;
    try{
        result = await apiConnector("POST", categories.GET_CATEGORY_PAGE_DETAILS, data);

        if(!result?.data?.success){
            throw new Error(result.data.message);
        }
    }
    catch(error){
        toast.error("Failed to fetch the related course")
    }
    toast.dismiss(toastId);
    return result?.data?.data;
}