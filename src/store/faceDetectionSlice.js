import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Fetch face detection data from Clarifai API
export const fetchFaceDetection = createAsyncThunk(
  'faceDetection/fetchFaceDetection',
  async (image, {rejectWithValue} ) => {
    try {
      const response = await fetch(`https://api.clarifai.com/v2/models/${import.meta.env.VITE_MODEL_ID}/versions/${import.meta.env.VITE_MODEL_VERSION_ID}/outputs`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Key ${import.meta.env.VITE_PAT}`
        },
        body: JSON.stringify({
          user_app_id: {
            user_id: import.meta.env.VITE_USER_ID,
            app_id: import.meta.env.VITE_APP_ID
          },
          inputs: [
            {
              data: {
                image: image
              }
            }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data.outputs[0].data.regions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const faceDetectionSlice = createSlice({
  name: 'faceDetection',
  initialState: {
    imageUrl: '',
    regions: [],
    status: 'idle',
    error: null
  },
  reducers: {
    clearRegions: (state) => {
      state.regions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaceDetection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFaceDetection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.regions = action.payload;
      })
      .addCase(fetchFaceDetection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { clearRegions  } = faceDetectionSlice.actions;

export default faceDetectionSlice.reducer;
