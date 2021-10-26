import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
  },
  extraReducers: {},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
