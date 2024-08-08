import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiURL =  import.meta.env.VITE_BACKEND_URL;

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password } = credentials;
      const response = await fetch(`${apiURL}/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();
      
      // Check if response has statusCode of 200
      if (response.ok && result.statusCode === 200) {
        return result.data; // Return the user data from the response
      } else {
        return rejectWithValue(result.message || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { email, password, name } = credentials;
      const response = await fetch(`${apiURL}/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const result = await response.json();
      
      // Check if response has statusCode of 201
      if (response.ok && result.statusCode === 201) {
        return result.data; // Return the user data from the response
      } else {
        return rejectWithValue(result.message || 'Registration failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
        status: 'idle',
    },
    reducers: {
       signOut: (state) => {
          state.user = ''
       }
    },
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload; 
        })
        .addCase(register.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; 
        });
    },
})

export const {signOut} = authSlice.actions

export default authSlice.reducer