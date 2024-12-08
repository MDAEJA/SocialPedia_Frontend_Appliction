// src/redux/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postShow: false,
  userProfile: false
};

const createPostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostShow: (state) => {
      state.postShow = true;
    },
    setPostShowFalse : (state) => {
        state.postShow = false;
    },
    setUserProfile :(state) => {
      state.userProfile = true
    },
    SetUserProfileFalse : (state) => {
      state.userProfile = false
    }

  },
});

export const { setPostShow,setPostShowFalse,setUserProfile,SetUserProfileFalse} = createPostSlice.actions;
export default createPostSlice.reducer;
