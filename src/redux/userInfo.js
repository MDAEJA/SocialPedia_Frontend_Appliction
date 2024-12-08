// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {}, // Store all posts
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; // Directly set postAll to the payload (array of posts)
    },
  },
});

export const { setUserData } = userInfoSlice.actions;
export default userInfoSlice.reducer;
