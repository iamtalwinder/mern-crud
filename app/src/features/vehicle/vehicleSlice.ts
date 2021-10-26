import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from '../../services/jwtService';

export interface Vehicle {
  _id: string;
  year: number;
  make: string;
  model: string;
}

export interface VehicleState {
  vehicles: Vehicle[];
  success: boolean;
  error?: {
    message?: string;
  };
}

export const getVehicles: any = () => async (dispatch: any) => {
  try {
    const response = await axios.get('/api/v1/vehicle', {
      headers: jwtService.getAuthHeaders(),
    });
    const data = await response.data;

    dispatch(setVehicles(data));
  } catch (error: any) {
    dispatch(setError(error.response.data));
  }
};

export const removeVehicle: any =
  (vehicleId: string) => async (dispatch: any) => {
    try {
      const response = await axios.delete(`/api/v1/vehicle/${vehicleId}`, {
        headers: jwtService.getAuthHeaders(),
      });
      const data: any = await response.data;

      dispatch(deleteVehicle(data._id));
    } catch (error: any) {
      dispatch(setError(error.response.data));
    }
  };

export const updateVehicle: any =
  (vehicleId: string, vehicleData: any) => async (dispatch: any) => {
    try {
      const response = await axios.patch(
        `/api/v1/vehicle/${vehicleId}`,
        vehicleData,
        {
          headers: jwtService.getAuthHeaders(),
        }
      );
      const data: any = await response.data;
      dispatch(deleteVehicle(data._id));
      dispatch(pushVehicle(data));
    } catch (error: any) {
      dispatch(setError(error.response.data));
    }
  };

export const addVehicle: any = (vehicleData: any) => async (dispatch: any) => {
  try {
    const response = await axios.post('/api/v1/vehicle', vehicleData, {
      headers: jwtService.getAuthHeaders(),
    });

    const data: any = await response.data;
    dispatch(pushVehicle(data));
  } catch (error: any) {
    dispatch(setError(error.response.data));
  }
};

const initialState: VehicleState = {
  vehicles: [],
  error: {},
  success: false,
};

const vehicleSlice: any = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
      state.error = {};
      state.success = true;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.success = false;
    },

    pushVehicle: (state, action) => {
      state.vehicles.push(action.payload);
      state.error = {};
      state.success = true;
    },

    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(
        (vehicle) => vehicle._id !== action.payload
      );
      state.error = {};
      state.success = true;
    },
  },
  extraReducers: {},
});

export const {
  setVehicles,
  setError,
  pushVehicle,
  deleteVehicle,
  replaceVehicle,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
