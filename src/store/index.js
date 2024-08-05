import { configureStore } from '@reduxjs/toolkit';
import faceDetectionReducer from './faceDetectionSlice';

export const store = configureStore({
  reducer: {
    faceDetection: faceDetectionReducer
  }
});
