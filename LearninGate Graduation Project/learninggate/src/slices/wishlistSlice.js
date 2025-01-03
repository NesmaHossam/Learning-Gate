import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  totalWishlist: localStorage.getItem("totalWishlist")
    ? JSON.parse(localStorage.getItem("totalWishlist"))
    : 0,
  totalWishlistItems: localStorage.getItem("totalWishlistItems")
    ? JSON.parse(localStorage.getItem("totalWishlistItems"))
    : 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const course = action.payload;
      const index = state.wishlist.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the wishlist, show an error toast
        toast.error("This course is already in your wishlist.");
        return;
      }

      // If the course is not in the wishlist, add it to the wishlist
      state.wishlist.push(course);
      // Update the total quantity and price
      state.totalWishlistItems++;
      state.totalWishlist += course.price;
      // Update localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      localStorage.setItem("totalWishlist", JSON.stringify(state.totalWishlist));
      localStorage.setItem("totalWishlistItems", JSON.stringify(state.totalWishlistItems));
      // Show success toast
      toast.success("Course has been added to your wishlist.");
    },
    removeFromWishlist: (state, action) => {
      const courseId = action.payload;
      const index = state.wishlist.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found in the wishlist, remove it
        state.totalWishlistItems--;
        state.totalWishlist -= state.wishlist[index].price;
        state.wishlist.splice(index, 1);
        // Update localStorage
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        localStorage.setItem("totalWishlist", JSON.stringify(state.totalWishlist));
        localStorage.setItem("totalWishlistItems", JSON.stringify(state.totalWishlistItems));
        // Show success toast
        toast.success("Course has been removed from your wishlist.");
      }
    },
    resetWishlist: (state) => {
      // Reset wishlist state and localStorage
      state.wishlist = [];
      state.totalWishlist = 0;
      state.totalWishlistItems = 0;
      localStorage.removeItem("wishlist");
      localStorage.removeItem("totalWishlist");
      localStorage.removeItem("totalWishlistItems");
      // Show success toast
      toast.success("Your wishlist has been reset.");
    },
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
