import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: "user",
  token : "",
  _id : "",
  picturePath : ''
 
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.userName = action.payload.name;
      state.token = action.payload.token;
      state._id = action.payload.id;
      state.picturePath = action.payload.picture
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLogin  } = userSlice.actions

export default userSlice.reducer 