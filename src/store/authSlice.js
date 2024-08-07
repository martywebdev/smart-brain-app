import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { dispatch, rejectWithValue}) => {
        try {
            if (credentials.email === "martywebdevelopment@gmail.com" && credentials.password === "password") {
              const user = JSON.parse(localStorage.getItem('user'));
              if (user) {
                return user;
              } else {
                // In case the user is not found in localStorage
                return rejectWithValue('User not found in localStorage');
              }
            } else {
              return rejectWithValue('Invalid credentials');
            }
          } catch (error) {
            return rejectWithValue(error.message);
          }
    }
  );

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
          state.error = action.payload; // This will contain the error message passed to rejectWithValue
        });
    },
})

export const {signOut} = authSlice.actions

export default authSlice.reducer