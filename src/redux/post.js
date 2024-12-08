// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postAll: [], // Store all posts
};

const postSlice = createSlice({
  name: "postInfo",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.postAll = action.payload.postData; // Directly set postAll to the payload (array of posts)
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
