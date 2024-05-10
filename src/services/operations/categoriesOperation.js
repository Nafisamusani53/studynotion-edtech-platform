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