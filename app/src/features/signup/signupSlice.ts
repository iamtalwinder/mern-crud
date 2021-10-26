import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../../services/jwtService';
import { setUser } from '../user/userSlice';

export interface SignupState {
  success: boolean;
  error: {
    message?: string;
  };
}

export const submitSignup =
  (data: any, history: any) => async (dispatch: any) => {
    return jwtService
      .createUser(data)
      .then((user) => {
        dispatch(setUser(user));
        dispatch(signupSuccess(user));
        history.push('./vehicle');
      })
      .catch((error) => {
        dispatch(signupError(error));
      });
  };

const initialState: SignupState = {
  success: false,
  error: {},
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupSuccess: (state, action) => {
      state.success = true;
      state.error = {};
    },
    signupError: (state, action) => {
      state.success = false;
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const { signupSuccess, signupError } = signupSlice.actions;

export default signupSlice.reducer;
