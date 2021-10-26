import { createSlice } from '@reduxjs/toolkit';
import jwtService from '../../services/jwtService';
import { setUser } from '../user/userSlice';

export interface LoginState {
  success: boolean;
  error: {
    message?: string;
  };
}

export const submitLogin =
  ({ email, password }: any, history: any) =>
  async (dispatch: any) => {
    return jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUser(user));
        dispatch(loginSuccess(user));
        history.push('./vehicle');
      })
      .catch((error) => {
        dispatch(loginError(error.error));
      });
  };

const initialState: LoginState = {
  success: false,
  error: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.error = {};
    },
    loginError: (state, action) => {
      state.success = false;
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
