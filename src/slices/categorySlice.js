import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    categories : [],
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories(state, value){
            state.categories= value.payload;
        }
    }
})

export const{setCategories} = categorySlice.actions;
export default categorySlice.reducer;