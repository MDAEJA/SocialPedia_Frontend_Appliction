// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./mode";
import userReducer from "./user";
import postReduce from './createPost';
import postAllReducer from './post';
import userInfoReducer from './userInfo'
import friendReducer from './friend'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user:userReducer,
    post : postReduce,
    postInfo : postAllReducer,
    userInfo : userInfoReducer,
    friend : friendReducer,
  },
});
