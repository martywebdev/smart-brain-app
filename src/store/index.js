import { configureStore } from '@reduxjs/toolkit';
import faceDetectionReducer from './faceDetectionSlice';
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    faceDetection: faceDetectionReducer,
    auth: authReducer
  }
});
