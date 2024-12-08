// src/redux/friendSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFriends: [], // Store all friends
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    
    setFriends: (state, action) => {
      state.allFriends = action.payload.friends; // Set all friends from an array
    },
    
  },
});

export const { addFriend, setFriends, removeFriend } = friendSlice.actions;
export default friendSlice.reducer;
