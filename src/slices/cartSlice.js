import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    course: localStorage.getItem("course") ?  JSON.parse(localStorage.getItem("course") ) : [],
    price: localStorage.getItem("price") ?  JSON.parse(localStorage.getItem("price") ) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, value){
            // first check if the item is already present or not
            const courseId = value.payload._id;
            const index = state.course.findIndex((item) => item._id === courseId)

            if(index >= 0){
                // course already present
                toast.error("Course already present");
                return;
            }
            // then add it to the cart
            state.course.push(value.payload);
            state.totalItems ++;
            state.price += courseId.price;

            // storing into localStorage;
            localStorage.setItem("course", JSON.stringify(state.course));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItems("price", JSON.stringify(state.price));

            toast.success("Course added to cart");
        },
        removeFromCart(state, value){
            const courseId = value.payload._id;
            const index = state.course.findIndex((item) => item._id === courseId)

            if(index >= 0){
                // course found
                state.totalItems--;
                state.price -= state.course[index].price;
                state.course.splice(index, 1);

                // storing into localStorage;
                localStorage.setItem("course", JSON.stringify(state.course));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                localStorage.setItems("price", JSON.stringify(state.price));

                toast.success("Course removed from cart");
            }
        },
        resetCart(state){
            state.course = [];
            state.totalItems = 0;
            state.price = 0;

            localStorage.setItem("course", JSON.stringify(state.course));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            localStorage.setItems("price", JSON.stringify(state.price));

        }
    }
});

export const {addToCart, removeFromCart, resetCart} = cartSlice. actions;
export default cartSlice.reducer;