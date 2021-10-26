import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';
import signupReducer from '../features/signup/signupSlice';
import vehicleReducer from '../features/vehicle/vehicleSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    signup: signupReducer,
    vehicle: vehicleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
