import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    course: []
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems(state, value){
            state.totalItems += value.payload.length;
        },
        addToCart(state, value){
            // first check if the item is already present or not
            // then add it to the cart
            state.course.push(value.payload);
        },
        removeFromCart(state, value){
            state.course.pop(course.filter((item)=> item !== value.payload));
        },
        resetCart(state){
            state.course = [];
        }
    }
});

export const {setTotalItems, addToCart, removeFromCart, resetCart} = cartSlice. actions;
export default cartSlice.reducer;